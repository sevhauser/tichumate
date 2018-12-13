import { BaseRepo } from './baserepo';
import { Round, Game, Score } from '../entity';
import { db } from '../';
import { repos } from '.';

export class RoundRepo extends BaseRepo<Round> {
  constructor() {
    super(db, db.table('rounds'));
  }

  public newEntity(): Round {
    return new Round();
  }

  public async getAllFromGame(gameId: number): Promise<Round[]> {
    const rounds = await this.table.where({ gameId }).toArray();
    const results = new Array<Round>();
    rounds.forEach((dataElement) => {
      results.push(this.newHydratedEntity(dataElement));
    });
    for (const result of results) {
      if (result.id) {
        result.scores = await repos.scores.getAllFromRound(result.id);
      }
    }
    return results;
  }

  public newRound(game: Game, teamIds?: number[]): Round {
    const round = new Round();
    round.setGame(game);
    if (game.type === 'classic') {
      round.scores.push(new Score(game.teamIds[0]));
      round.scores.push(new Score(game.teamIds[1]));
    } else if (teamIds !== undefined) {
      for (const teamId of teamIds) {
        round.scores.push(new Score(teamId));
      }
    }
    return round;
  }

  public async create(round: Round): Promise<Round> {
    const newRound = await super.create(round);
    const newScores = new Array<Score>();
    if (newRound.id) {
      for (const score of round.scores) {
        score.roundId = newRound.id;
        const newScore = await repos.scores.create(score);
        newScores.push(newScore);
      }
    }
    newRound.scores = newScores;
    return newRound;
  }

  public async get(roundId: number): Promise<Round> {
    const round = await super.get(roundId);
    const game = await repos.games.get(round.gameId);
    round.setGame(game);
    const scores = await repos.scores.getAllFromRound(roundId);
    round.scores = scores;
    return round;
  }

  public async update(round: Round): Promise<Round> {
    if (round.id === undefined) {
      return await this.create(round);
    }
    const updatedRound = await super.update(round);
    const updatedScores = new Array<Score>();
    for (const score of round.scores) {
      const updatedScore = await repos.scores.update(score);
      updatedScores.push(updatedScore);
    }
    updatedRound.scores = updatedScores;
    return updatedRound;
  }

  public async delete(roundId: number): Promise<void> {
    await repos.scores.deleteFromRound(roundId);
    await super.delete(roundId);
  }

  public async deleteFromGame(gameId: number): Promise<void> {
    const rounds = await this.table.where({ gameId }).toArray();
    for (const round of rounds) {
      if (round.id) {
        await repos.scores.deleteFromRound(round.id);
      }
    }
    await this.table.where({ gameId }).delete();
  }
}
