import { MutationTree } from 'vuex';
import { Tichu } from '@/db/entity';
import { TichusState, TICHUS_LOADED } from './types';

export const mutations: MutationTree<TichusState> = {
    [TICHUS_LOADED](state, payload: Tichu[]) {
        state.tichus = payload;
    },
};
