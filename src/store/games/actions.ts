import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { GamesState, GAMES_LOADED, ADD_GAME, UPDATE_GAME, DELETE_GAME } from './types';
import { Game, Round } from '@/db/entity';

export const actions: ActionTree<GamesState, RootState> = {
  // GAMES
  async newGame({}, type: string = 'classic'): Promise<Game> {
    return repos.games.newGame(type);
  },
  async getGame({}, gameId: number): Promise<Game> {
    return await repos.games.get(gameId);
  },
  async loadGames({ commit }): Promise<any> {
    const games: Game[] = await repos.games.getAll();
    commit(GAMES_LOADED, games);
  },
  async saveGame({ commit, dispatch, state }, game: Game): Promise<Game> {
    if (game.id === undefined) {
      return await dispatch('createGame', game);
    }
    const newGame = await repos.games.update(game);
    commit(UPDATE_GAME, newGame);
    return newGame;
  },
  async createGame({ commit, dispatch }, game: Game): Promise<Game> {
    const newGame = await repos.games.create(game);
    game.id = newGame.id;
    commit(ADD_GAME, game);
    return game;
  },
  async deleteGame({ commit }, gameId: number): Promise<void> {
    await repos.games.delete(gameId);
    commit(DELETE_GAME, gameId);
  },
  async recalculateGame({ dispatch }, gameId: number): Promise<void> {
    const game = await repos.games.recalculateGame(gameId);
    await dispatch('saveGame', game);
  },
  // ROUNDS
  newRound({}, game: Game): Round {
    const round = repos.rounds.newRound(game);
    return repos.rounds.newRound(game);
  },
  async createRound({ dispatch }, round: Round) {
    const newRound = await repos.rounds.create(round);
    await dispatch('recalculateGame', round.gameId);
    return newRound;
  },
  async saveRound({ dispatch }, round: Round) {
    let result = null;
    if (round.id) {
      result = await repos.rounds.update(round);
    } else {
      result = await dispatch('createRound', round);
    }
    await dispatch('recalculateGame', round.gameId);
    return result;
  },
  async getRound({}, roundId: number) {
    return await repos.rounds.get(roundId);
  },
  async getRounds({}, gameId: number) {
    return await repos.rounds.getAllFromGame(gameId);
  },
  async deleteRound({ dispatch }, roundId: number) {
    const round = await repos.rounds.get(roundId);
    if (round.id) {
      await repos.rounds.delete(roundId);
      await dispatch('recalculateGame', round.gameId);
    }
  },
};
