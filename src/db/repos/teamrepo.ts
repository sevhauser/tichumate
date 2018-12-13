import { BaseRepo } from './baserepo';
import { Team } from '../entity';
import { db } from '../';

export class TeamRepo extends BaseRepo<Team> {
  constructor() {
    super(db, db.table('teams'));
  }

  public newEntity(): Team {
    return new Team();
  }

  public async getFromGame(gameId: number): Promise<Team[]> {
    const teams = await this.table.where({ gameId }).toArray();
    const result: Team[] = new Array<Team>();
    for (const team of teams) {
      result.push(this.newHydratedEntity(team));
    }
    return result;
  }
}
