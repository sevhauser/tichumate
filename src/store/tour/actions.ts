import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { TourState, ADD_TOURVIEW, POP_TOURVIEW } from './types';
import { TourView } from '@/helpers/tour';


export const actions: ActionTree<TourState, RootState> = {
  addTourView({ commit }, view: TourView) {
    commit(ADD_TOURVIEW, view);
  },
  popTourView({ commit }) {
    commit(POP_TOURVIEW);
  },
};
