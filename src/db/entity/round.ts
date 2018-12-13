import { dataProperty, BaseEntity } from './baseentity';
import { IRound } from '../tichudb';
import { Game } from './game';
import { Score } from './score';

export class Round extends BaseEntity implements IRound {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public gameId: number = 0;

  public game: Game;

  public scores: Score[] = new Array<Score>();

  constructor(game: Game) {
    super();
    this.game = game;
    if (game.id !== undefined) {
      this.gameId = game.id;
    }
  }

  public setWin(index: number, value: number) {
    this.scores.forEach((element, elIndex) => {
      if (elIndex !== index) {
        element.setWin(0);
        element.otherDoubleWin = (value === 2);
      } else {
        element.setWin(value);
      }
      element.updatePoints();
    });
  }
}
