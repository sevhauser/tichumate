import { dataProperty, BaseEntity } from './baseentity';
import { IGame } from '../tichudb';
import { Team } from './team';
import { repos } from '../repos';

export class Game extends BaseEntity implements IGame {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public teamIds: number[] = new Array<number>();

  public teams: Team[] = new Array<Team>();

  @dataProperty()
  public date: number = Date.now();

  @dataProperty()
  public type: string = 'classic';

  @dataProperty()
  public winConditions: { [index: string]: any } = {
    type: 1,
    value: 1000,
  };
}
