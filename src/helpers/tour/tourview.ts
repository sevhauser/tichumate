export enum TourKeys {
  CHANGELOG = 'changelog',
  FIRST_TIME_INFO = 'firsttimeinfo',
  GAME_EDIT = 'gameedit',
  GAME_VIEW = 'gameview',
  ROUND_VIEW = 'roundview',
}

export interface TourViewValues {
  key: TourKeys;
  version: number;
  setSeenWithView?: TourKeys;
}

export class TourView implements TourViewValues {
  public key: TourKeys;
  public version: number;
  public setSeenWithView?: TourKeys;

  constructor(values: TourViewValues) {
    this.key = values.key;
    this.version = values.version;
    if (values.setSeenWithView) {
      this.setSeenWithView = values.setSeenWithView;
    }
  }
}
