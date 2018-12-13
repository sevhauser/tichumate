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

  public async update(game: Game): Promise<Game> {
    if (game.teams.length > 0) {
      for (const team of game.teams) {
        const updatedTeam = await repos.teams.update(team);
        if (updatedTeam.id !== undefined && !game.teamIds.includes(updatedTeam.id)) {
          game.teamIds.push(updatedTeam.id);
        }
      }
    }
    return super.update(game);
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
}
