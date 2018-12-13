import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { GamesState, GAMES_LOADED, ADD_GAME, UPDATE_GAME } from './types';
import { Game } from '@/db/entity';
import { __await } from 'tslib';


export const actions: ActionTree<GamesState, RootState> = {
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
    await commit(ADD_GAME, game);
    return game;
  },
};
