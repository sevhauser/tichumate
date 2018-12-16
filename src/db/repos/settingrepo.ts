import { BaseRepo } from './baserepo';
import { Setting } from '../entity';
import { db } from '../';

export class SettingRepo extends BaseRepo<Setting> {
  constructor() {
    super(db, db.table('settings'));
  }

  public async getByKey(key: string): Promise<Setting> {
    const result = await this.table.where({ key });
    if (await result.count() > 0) {
      const setting = await result.first();
      return this.newHydratedEntity(setting);
    }
    return new Setting();
  }

  public newEntity(): Setting {
    return new Setting();
  }
}
