import { dataProperty, BaseEntity } from './baseentity';
import { IPlayer } from '../tichudb';

export class Player extends BaseEntity implements IPlayer {
  @dataProperty()
  public emoji: string = '';

  @dataProperty()
  public name: string = '';

  public tester: string = '';
}
