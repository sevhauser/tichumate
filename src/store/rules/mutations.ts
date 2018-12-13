import { MutationTree } from 'vuex';
import { RulesState, RULES_LOADED } from './types';
import { Rule } from '@/db/entity';

export const mutations: MutationTree<RulesState> = {
    [RULES_LOADED](state, payload: Rule[]) {
        state.rules = payload;
    },
};
