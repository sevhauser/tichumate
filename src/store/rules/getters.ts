import { GetterTree } from 'vuex';
import { RulesState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<RulesState, RootState> = {
    rule(state) {
        return (id: number) => state.rules.find((value) => value.id === id);
    },
};
