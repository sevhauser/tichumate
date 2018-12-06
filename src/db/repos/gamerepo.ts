import { BaseRepo } from './baserepo';
import { Game } from '../entity';
import { db } from '../';

export class GameRepo extends BaseRepo<Game> {
  constructor() {
    super(db, db.table('games'));
  }

  public newEntity(): Game {
    return new Game();
  }
}
