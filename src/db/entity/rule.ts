import { dataProperty, BaseEntity } from './baseentity';
import { IRule } from '../tichudb';

export class Rule extends BaseEntity implements IRule {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public key: string = '';

  @dataProperty()
  public lang: string = '';

  @dataProperty()
  public title: string = '';
}
