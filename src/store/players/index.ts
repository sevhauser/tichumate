import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { PlayersState } from './types';
import { RootState } from '../types';
import { Player } from '@/db/entity';

export const state: PlayersState = {
    players: new Array<Player>(),
};

const namespaced: boolean = true;

export const players: Module<PlayersState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
    getters,
};
