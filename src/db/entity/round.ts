import { dataProperty, BaseEntity } from './baseentity';
import { IRound } from '../tichudb';
import { Game } from './game';

export class Round extends BaseEntity implements IRound {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public gameId: number;

  constructor(game: Game) {
    super();
    if (game.id === undefined) {
      this.gameId = 0;
    } else {
      this.gameId = game.id;
    }
  }
}
