import { dataProperty, BaseEntity } from './baseentity';
import { IRound } from '../tichudb';
import { Game } from './game';
import { Score } from './score';

export class Round extends BaseEntity implements IRound {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public gameId: number = 0;

  @dataProperty()
  public scoreDistribution: number = 0;

  public game?: Game;

  public scores: Score[] = new Array<Score>();

  public setGame(game: Game) {
    this.game = game;
    if (game.id) {
      this.gameId = game.id;
    }
  }

  public getTeamScore(teamId: number): number {
    let result = 0;
    const score = this.scores.find((el) => el.teamId === teamId);
    if (score) {
      result = score.points;
    }
    return result;
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
