import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { RoundsState } from './types';
import { Round, Game } from '@/db/entity';


export const actions: ActionTree<RoundsState, RootState> = {
  newRound({}, game: Game): Round {
    const round = repos.rounds.newRound(game);
    return repos.rounds.newRound(game);
  },
  async getRounds({}, gameId: number) {
    return await repos.rounds.getAllFromGame(gameId);
  },
};
