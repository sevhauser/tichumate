import { dataProperty, BaseEntity } from './baseentity';
import { IScore } from '../tichudb';
import { Player, Tichu, Call } from '.';

export class Score extends BaseEntity implements IScore {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public roundId: number = 0;

  @dataProperty()
  public teamId: number = 0;

  @dataProperty()
  public penaltyPoints: number = 0;

  public calls: Call[] = new Array<Call>();

  @dataProperty()
  public points: number = 0;

  @dataProperty()
  public cardPoints: number = 50;

  @dataProperty()
  public win: number = 0;

  @dataProperty()
  public otherDoubleWin: boolean = false;

  constructor(teamId: number = 0) {
    super();
    this.teamId = teamId;
    this.updatePoints();
  }

  public set penalty(value: number) {
    this.penaltyPoints = value;
    this.updatePoints();
  }

  public get penalty(): number {
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

  public setCalls(calls: Call[]) {
    this.calls = calls;
    this.updatePoints();
  }

  public callState(tichuId: number) {
    const call = this.calls.find((element) => element.tichuId === tichuId);
    if (call) {
      return call.success;
    }
    return 0;
  }

  public callChange(tichuId: number, value: number, tichuValue: number) {
    const call = this.calls.find((element) => element.tichuId === tichuId);
    if (call) {
      call.success = value;
    } else {
      const newCall = new Call(tichuId, value, tichuValue);
      this.calls.push(newCall);
    }
    this.updatePoints();
  }

  public callPlayer(tichuId: number, playerId: number) {
    const call = this.calls.find((element) => element.tichuId === tichuId);
    if (call) {
      call.playerId = playerId;
    }
    this.updatePoints();
  }

  public callPlayerState(tichuId: number) {
    const call = this.calls.find((element) => element.tichuId === tichuId);
    if (call) {
      return call.playerId;
    }
    return 0;
  }

  public afterHydration() {
    this.updatePoints();
  }
}
