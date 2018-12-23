import { BaseRepo } from './baserepo';
import { Call } from '../entity';
import { db } from '../';

export class CallRepo extends BaseRepo<Call> {
  constructor() {
    super(db, db.table('calls'));
  }

  public newEntity(tichuId: number, success: number = 0): Call {
    return new Call(tichuId, success);
  }

  public async getAllFromScore(scoreId: number): Promise<Call[]> {
    const calls = await this.table.where({ scoreId }).toArray();
    const result = new Array<Call>();
    calls.forEach((dataElement) => {
      result.push(this.newHydratedEntity(dataElement));
    });
    return result;
  }

  public async deleteFromScore(scoreId: number): Promise<void> {
    await this.table.where({scoreId}).delete();
  }

  public async removePlayerFromCalls(playerId: number) {
    const calls = await this.table.where({ playerId }).toArray();
    for (const callValue of calls) {
      if (callValue.id) {
        const call = await this.get(callValue.id);
        call.playerId = 0;
        await this.update(call);
      }
    }
  }
}
