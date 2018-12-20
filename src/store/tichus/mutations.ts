import { MutationTree } from 'vuex';
import { Tichu } from '@/db/entity';
import { TichusState, TICHUS_LOADED, ADD_TICHU, UPDATE_TICHU, DELETE_TICHU } from './types';

export const mutations: MutationTree<TichusState> = {
    [TICHUS_LOADED](state, payload: Tichu[]) {
        state.tichus = payload;
    },
    [ADD_TICHU](state, payload: Tichu) {
        state.tichus.push(payload);
    },
    [UPDATE_TICHU](state, payload: Tichu) {
        const tichu = state.tichus.find((value) => value.id === payload.id);
        if (tichu !== undefined) {
            Object.assign(tichu, payload);
        }
    },
    [DELETE_TICHU](state, payload: number) {
        const index = state.tichus.findIndex((val) => val.id === payload);
        if (index >= 0) {
            state.tichus.splice(index, 1);
        }
    },
};
