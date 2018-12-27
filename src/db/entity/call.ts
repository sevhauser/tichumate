import { dataProperty, BaseEntity } from './baseentity';
import { ICall } from '../tichudb';

export class Call extends BaseEntity implements ICall {
  @dataProperty()
  public id?: number;

  @dataProperty()
  public scoreId: number = 0;

  @dataProperty()
  public playerId: number = 0;

  @dataProperty()
  public tichuId: number;

  @dataProperty()
  public success: number;

  @dataProperty()
  public value: number = 0;

  constructor(tichuId: number = 0, success: number = 0, value: number = 0, playerId: number = 0) {
    super();
    this.tichuId = tichuId;
    this.success = success;
    this.value = value;
    this.playerId = playerId;
  }

  public getValue(): number {
    return this.success * this.value;
  }
}
