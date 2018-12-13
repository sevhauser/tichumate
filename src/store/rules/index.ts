import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { RulesState } from './types';
import { RootState } from '../types';
import { Rule } from '@/db/entity';

export const state: RulesState = {
    rules: new Array<Rule>(),
};

const namespaced: boolean = true;

export const rules: Module<RulesState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
    getters,
};
