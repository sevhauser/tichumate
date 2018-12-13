import { BaseRepo } from './baserepo';
import { Tichu } from '../entity';
import { db } from '../';

export class TichuRepo extends BaseRepo<Tichu> {
  constructor() {
    super(db, db.table('tichus'));
  }

  public newEntity(): Tichu {
    return new Tichu();
  }
}
