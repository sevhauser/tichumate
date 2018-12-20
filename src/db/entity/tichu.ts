import { dataProperty, BaseEntity } from './baseentity';
import { ITichu } from '../tichudb';

export class Tichu extends BaseEntity implements ITichu {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public title: string = '';

  @dataProperty()
  public lang: string = '';

  @dataProperty()
  public value: number = 0;

  @dataProperty()
  public protected: boolean = false;

  @dataProperty()
  public active: boolean = true;
}
