import { Module } from 'vuex';
import { actions } from './actions';
import { RoundsState } from './types';
import { RootState } from '../types';
import { Round } from '@/db/entity';

export const state: RoundsState = {
    rounds: new Array<Round>(),
};

const namespaced: boolean = true;

export const rounds: Module<RoundsState, RootState> = {
    namespaced,
    state,
    actions,
};
