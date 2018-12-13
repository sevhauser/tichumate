import { dataProperty, BaseEntity } from './baseentity';
import { IScore } from '../tichudb';
import { Player, Tichu, Call } from '.';

export class Score extends BaseEntity implements IScore {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public roundId: number = 0;

  @dataProperty()
  public teamId: number;

  @dataProperty()
  public penaltyPoints: number = 0;

  @dataProperty()
  public calls: Call[] = new Array<Call>();

  @dataProperty()
  public points: number = 0;

  @dataProperty()
  public cardPoints: number = 50;

  @dataProperty()
  public win: number = 0;

  @dataProperty()
  public otherDoubleWin: boolean = false;

  public set penalty(value: number) {
    this.penaltyPoints = value;
    this.updatePoints();
  }

  public get penalty(): number{
    return this.penaltyPoints;
  }

  public setWin(value: number) {
    this.win = value;
    if (value > 0) {
      this.otherDoubleWin = false;
    }
    this.updatePoints();
  }

  public updatePoints() {
    let result = 0;
    if (this.win === 2) {
      result = 200;
    } else if (!this.otherDoubleWin) {
      result = this.cardPoints;
    } else {
      result = 0;
    }
    this.calls.forEach((element) => {
      result += element.getValue();
    });
    result += this.penaltyPoints;
    this.points = result;
  }

  public setCardPoints(value: number) {
    this.cardPoints = value;
    this.updatePoints();
  }

  constructor(teamId: number) {
    super();
    this.teamId = teamId;
    this.updatePoints();
  }
}
