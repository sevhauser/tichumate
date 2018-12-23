import { MutationTree } from 'vuex';
import { PlayersState, PLAYERS_LOADED, ADD_PLAYER, UPDATE_PLAYER, REMOVE_PLAYER } from './types';
import { Player } from '@/db/entity';

export const mutations: MutationTree<PlayersState> = {
    [PLAYERS_LOADED](state, payload: Player[]) {
        state.players = payload;
    },
    [ADD_PLAYER](state, payload: Player) {
        state.players.push(payload);
    },
    [UPDATE_PLAYER](state, payload: Player) {
        const player = state.players.find((value) => value.id === payload.id);
        if (player !== undefined) {
            Object.assign(player, payload);
        }
    },
    [REMOVE_PLAYER](state, payload: number) {
        const index = state.players.findIndex((el) => el.id === payload);
        if (index >= 0) {
            state.players.splice(index, 1);
        }
    },
};
