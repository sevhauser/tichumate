import { BaseRepo } from './baserepo';
import { Round, Game, Score } from '../entity';
import { db } from '../';
import { repos } from '.';

export class RoundRepo extends BaseRepo<Round> {
  constructor() {
    super(db, db.table('rounds'));
  }

  public newEntity(game: Game): Round {
    return new Round(game);
  }

  public async getAllFromGame(gameId: number): Promise<Round[]> {
    const rounds = await this.table.where({ gameId }).toArray();
    const result = new Array<Round>();
    rounds.forEach((dataElement) => {
      result.push(this.newHydratedEntity(dataElement));
    });
    return result;
  }

  public newRound(game: Game, teamIds?: number[]): Round {
    const round = new Round(game);
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
}
