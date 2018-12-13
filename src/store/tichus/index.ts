import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { TichusState } from './types';
import { RootState } from '../types';
import { Tichu } from '@/db/entity';

export const state: TichusState = {
    tichus: new Array<Tichu>(),
};

const namespaced: boolean = true;

export const tichus: Module<TichusState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
    getters,
};
