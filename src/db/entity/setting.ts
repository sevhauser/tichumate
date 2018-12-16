import { dataProperty, BaseEntity } from './baseentity';
import { ISetting } from '../tichudb';

export enum SettingKey {
  VOID = '',
  LANG = 'lang',
}

export class Setting extends BaseEntity implements ISetting {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public lang: string = '';

  @dataProperty()
  public key: SettingKey = SettingKey.VOID;

  @dataProperty()
  public value: any = 0;
}
