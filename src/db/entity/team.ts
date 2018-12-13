import { dataProperty, BaseEntity } from './baseentity';
import { ITeam } from '../tichudb';
import { Player } from '.';

export class Team extends BaseEntity implements ITeam {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public playerIds: number[] = new Array<number>();

  @dataProperty()
  public name: string = '';

  @dataProperty()
  public score: number = 0;

  @dataProperty()
  public win: boolean = false;
}
