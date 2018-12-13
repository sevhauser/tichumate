import { Tichu } from '@/db/entity';

export const TICHUS_LOADED = 'TICHUS_LOADED';
export const ADD_TICHU = 'ADD_TICHU';
export const UPDATE_TICHU = 'UPDATE_TICHU';

export interface TichusState {
  tichus: Tichu[];
}
