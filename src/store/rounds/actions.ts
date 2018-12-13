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
  async createRound({}, round: Round) {
    const newRound = await repos.rounds.create(round);
    return newRound;
  },
  async saveRound({ dispatch }, round: Round) {
    if (round.id) {
      return await repos.rounds.update(round);
    }
    return await dispatch('createRound', round);
  },
  async getRound({}, roundId: number) {
    return await repos.rounds.get(roundId);
  },
  async getRounds({}, gameId: number) {
    return await repos.rounds.getAllFromGame(gameId);
  },
  async deleteRound({}, roundId: number) {
    return await repos.rounds.delete(roundId);
  },
};
