import { dataProperty, BaseEntity } from './baseentity';
import { IGame } from '../tichudb';

export class Game extends BaseEntity implements IGame {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public teamIds: number[] = [];

  @dataProperty()
  public date: number = Date.now();

  @dataProperty()
  public winConditions: { [index: string]: any } = {
    type: 1,
    value: 1000,
  };
}
