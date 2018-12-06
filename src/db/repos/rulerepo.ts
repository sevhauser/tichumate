import { BaseRepo } from './baserepo';
import { Rule } from '../entity';
import { db } from '../';

export class RuleRepo extends BaseRepo<Rule> {
  constructor() {
    super(db, db.table('rules'));
  }

  public newEntity(): Rule {
    return new Rule();
  }
}
