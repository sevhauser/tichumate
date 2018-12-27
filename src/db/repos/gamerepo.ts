import { BaseRepo } from './baserepo';
import { Game, Team } from '../entity';
import { db } from '../';
import { repos } from '.';

export class GameRepo extends BaseRepo<Game> {
  constructor() {
    super(db, db.table('games'));
  }

  public newEntity(): Game {
    return new Game();
  }

  public newGame(type: string = 'classic'): Game {
    const game = new Game();
    if (type === 'classic') {
      game.teams.push(new Team());
      game.teams.push(new Team());
    }
    return game;
  }

  public async get(id: number): Promise<Game> {
    const game = await super.get(id);
    for (const teamId of game.teamIds) {
      game.teams.push(await repos.teams.get(teamId));
    }
    return game;
  }

  public async getAll(): Promise<Game[]> {
    const games = await super.getAll();
    for (const game of games) {
      for (const teamId of game.teamIds) {
        game.teams.push(await repos.teams.get(teamId));
      }
    }
    return games;
  }

  public async getFromPlayer(playerId: number): Promise<Game[]> {
    const result = new Array<Game>();
    const teams = await repos.teams.getFromPlayer(playerId);
    for (const team of teams) {
      if (team.id) {
        const games = await this.table.where('teamIds').equals(team.id).toArray();
        for (const gameValue of games) {
          if (gameValue.id) {
            result.push(await this.get(gameValue.id));
          }
        }
      }
    }
    return result;
  }

  public async update(game: Game, recalculate: boolean = true): Promise<Game> {
    if (game.teams.length > 0) {
      for (const team of game.teams) {
        const updatedTeam = await repos.teams.update(team);
        if (updatedTeam.id !== undefined && !game.teamIds.includes(updatedTeam.id)) {
          game.teamIds.push(updatedTeam.id);
        }
      }
    }
    let updatedGame = await super.update(game);
    if (updatedGame.id && recalculate) {
      updatedGame = await this.recalculateGame(updatedGame.id);
    }
    return updatedGame;
  }

  public async create(game: Game): Promise<Game> {
    for (const team of game.teams) {
      const newTeam = await repos.teams.create(team);
      if (newTeam.id !== undefined) {
        game.teamIds.push(newTeam.id);
      }
    }
    return await super.create(game);
  }

  public async delete(gameId: number): Promise<void> {
    await repos.rounds.deleteFromGame(gameId);
    await super.delete(gameId);
  }

  public async recalculateGame(gameId: number): Promise<Game> {
    const game = await this.get(gameId);
    const rounds = await repos.rounds.getAllFromGame(gameId);
    const teamScores: Array<{ teamId: number, score: number }> = [];
    for (const team of game.teams) {
      if (!team.id) {
        continue;
      }
      team.score = 0;
      for (const round of rounds) {
        team.score += round.getTeamPoints(team.id);
      }
      teamScores.push({
        teamId: team.id,
        score: team.score,
      });
    }
    // Check if there are winners
    const winners: number[] = [];
    if (game.winConditions.type === 1) {
      // Score
      const currentHighest = {
        teamIds: new Array<number>(),
        score: 0,
      };
      for (const score of teamScores) {
        if (score.score >= game.winConditions.value) {
          if (score.score > currentHighest.score) {
            currentHighest.teamIds = new Array<number>();
            currentHighest.teamIds.push(score.teamId);
            currentHighest.score = score.score;
          } else if (score.score === currentHighest.score) {
            currentHighest.teamIds.push(score.teamId);
          }
        }
      }
      if (currentHighest.teamIds.length > 0) {
        currentHighest.teamIds.forEach((teamId) => {
          winners.push(teamId);
        });
      }
    } else if (game.winConditions.type === 2) {
      // Difference
      for (const score of teamScores) {
        const isWinner = teamScores.every((val) => {
          if (val.teamId !== score.teamId) {
            return score.score - val.score >= game.winConditions.value;
          }
          return true;
        });
        if (isWinner) {
          winners.push(score.teamId);
        }
      }
    }
    // Update teams for winners
    for (const team of game.teams) {
      team.win = false;
      if (team.id && winners.includes(team.id)) {
        team.win = true;
      }
    }
    return await this.update(game, false);
  }
}
