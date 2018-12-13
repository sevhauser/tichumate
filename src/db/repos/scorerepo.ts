import { BaseRepo } from './baserepo';
import { Score, Call } from '../entity';
import { repos } from '../repos';
import { db } from '../';

export class ScoreRepo extends BaseRepo<Score> {
  constructor() {
    super(db, db.table('scores'));
  }

  public newEntity(): Score {
    return new Score();
  }

  public async getAllFromRound(roundId: number): Promise<Score[]> {
    const scores = await this.table.where({ roundId }).toArray();
    const results = new Array<Score>();
    scores.forEach((dataElement) => {
      results.push(this.newHydratedEntity(dataElement));
    });
    for (const result of results) {
      if (result.id !== undefined) {
        const calls = await repos.calls.getAllFromScore(result.id);
        result.setCalls(calls);
      }
    }
    return results;
  }

  public async get(scoreId: number): Promise<Score> {
    const score = await super.get(scoreId);
    score.setCalls(await repos.calls.getAllFromScore(scoreId));
    return score;
  }

  public async update(score: Score): Promise<Score> {
    const updatedCalls = new Array<Call>();
    for (const call of score.calls) {
      if (call.success !== 0) {
        if (call.id) {
          const updatedCall = await repos.calls.update(call);
          updatedCalls.push(updatedCall);
        } else {
          const newcall = await repos.calls.create(call);
          updatedCalls.push(newcall);
        }
      } else {
        if (call.id) {
          await repos.calls.delete(call.id);
        }
      }
    }
    score.calls = updatedCalls;
    score.updatePoints();
    const updatedScore = await super.update(score);
    return updatedScore;
  }

  public async create(score: Score): Promise<Score> {
    const newScore = await super.create(score);
    const newCalls = new Array<Call>();
    for (const call of newScore.calls) {
      if (call.success !== 0) {
        if (newScore.id) {
          call.scoreId = newScore.id;
        }
        const newCall = await repos.calls.create(call);
        newCalls.push(newCall);
      }
    }
    newScore.calls = newCalls;
    return newScore;
  }

  public async deleteFromRound(roundId: number): Promise<void> {
    const scores = await this.table.where({ roundId }).toArray();
    for (const score of scores) {
      if (score.id) {
        await repos.calls.deleteFromScore(score.id);
      }
    }
    await this.table.where({ roundId }).delete();
  }
}
