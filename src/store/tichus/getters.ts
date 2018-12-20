import { GetterTree } from 'vuex';
import { RootState } from '../types';
import { TichusState } from './types';

export const getters: GetterTree<TichusState, RootState> = {
    tichu(state) {
        return (id: number) => state.tichus.find((value) => value.id === id);
    },
    activeTichus(state) {
        return state.tichus.filter((el) => el.active);
    },
};
