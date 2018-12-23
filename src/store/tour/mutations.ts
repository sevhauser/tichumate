import { MutationTree } from 'vuex';
import { TourState, ADD_TOURVIEW, POP_TOURVIEW, CLEAR_TOURVIEWS } from './types';
import { TourView } from '@/helpers/tour';

export const mutations: MutationTree<TourState> = {
    [ADD_TOURVIEW](state, payload: TourView) {
        const index = state.views.findIndex((el) => el.key === payload.key);
        if (index < 0) {
            state.views.push(payload);
        }
    },
    [POP_TOURVIEW](state, payload?: TourView) {
        if (state.views.length === 0 || (payload && state.views[0].key !== payload.key)) {
            return;
        }
        state.views.pop();
    },
    [CLEAR_TOURVIEWS](state) {
        state.views = new Array<TourView>();
    },
};
