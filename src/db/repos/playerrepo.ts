import { BaseRepo } from './baserepo';
import { Player } from '../entity';
import { db } from '../';

export class PlayerRepo extends BaseRepo<Player> {
  constructor() {
    super(db, db.table('players'));
  }

  public newEntity(): Player {
    return new Player();
  }
}
