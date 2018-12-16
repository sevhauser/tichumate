import { Game, Round } from '@/db/entity';

export const GAMES_LOADED = 'GAMES_LOADED';
export const ADD_GAME = 'ADD_GAME';
export const UPDATE_GAME = 'UPDATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';

export interface GamesState {
  games: Game[];
}
