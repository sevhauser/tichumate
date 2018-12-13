import { BaseRepo } from './baserepo';
import { Call } from '../entity';
import { db } from '../';

export class RoundRepo extends BaseRepo<Call> {
  constructor() {
    super(db, db.table('calls'));
  }

  public newEntity(tichuId: number, success: boolean = false): Call {
    return new Call(tichuId, success);
  }
}
