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
}
