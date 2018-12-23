import { BaseRepo } from './baserepo';
import { Player } from '../entity';
import { db } from '../';
import { repos } from '.';

export class PlayerRepo extends BaseRepo<Player> {
  constructor() {
    super(db, db.table('players'));
  }

  public newEntity(): Player {
    return new Player();
  }

  public async delete(playerId: number): Promise<void> {
    await repos.teams.removePlayerFromTeams(playerId);
    await repos.calls.removePlayerFromCalls(playerId);
    await super.delete(playerId);
  }
}
