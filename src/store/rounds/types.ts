import { Round } from '@/db/entity';

export const ADD_ROUND = 'ADD_ROUND';
export const UPDATE_ROUND = 'UPDATE_ROUND';

export interface RoundsState {
  rounds: Round[];
}
