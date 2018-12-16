import { MutationTree } from 'vuex';
import { GamesState, GAMES_LOADED, ADD_GAME, UPDATE_GAME, DELETE_GAME } from './types';
import { Game } from '@/db/entity';

export const mutations: MutationTree<GamesState> = {
    [GAMES_LOADED](state, payload: Game[]) {
        state.games = payload;
    },
    [ADD_GAME](state, payload: Game) {
        state.games.push(payload);
    },
    [UPDATE_GAME](state, payload: Game) {
        const game = state.games.find((value) => value.id === payload.id);
        if (game !== undefined) {
            Object.assign(game, payload);
        }
    },
    [DELETE_GAME](state, payload: number) {
        const index = state.games.findIndex((el) => el.id === payload);
        if (index >= 0) {
            state.games.splice(index, 1);
        }
    },
};
