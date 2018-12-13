import { Player } from '@/db/entity';

export const PLAYERS_LOADED = 'PLAYERS_LOADED';
export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_PLAYER = 'UPDATE_PLAYER';

export interface PlayersState {
  players: Player[];
}
