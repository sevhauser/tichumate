import { dataProperty, BaseEntity } from './baseentity';
import { ITeam } from '../tichudb';

export class Team extends BaseEntity implements ITeam {
  @dataProperty()
  public playerIds: number[] = [];

  @dataProperty()
  public name: string = '';
}
