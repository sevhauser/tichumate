import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { TourState } from './types';
import { RootState } from '../types';
import { TourView } from '@/helpers/tour';

export const state: TourState = {
    views: new Array<TourView>(),
};

const namespaced: boolean = true;

export const tour: Module<TourState, RootState> = {
    namespaced,
    state,
    actions,
    mutations,
    getters,
};
