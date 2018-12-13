import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { GamesState } from './types';
import { RootState } from '../types';
import { Game } from '@/db/entity';

export const state: GamesState = {
    games: new Array<Game>(),
};

const namespaced: boolean = true;

export const games: Module<GamesState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
    getters,
};
