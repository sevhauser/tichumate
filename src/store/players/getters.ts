import { GetterTree } from 'vuex';
import { PlayersState } from './types';
import { RootState } from '../types';

export const getters: GetterTree<PlayersState, RootState> = {
    player(state) {
        return (id: number) => state.players.find((value) => value.id === id);
    },
    players(state) {
        return state.players.sort((lhs, rhs) => {
            if (lhs.name.toLowerCase() === rhs.name.toLowerCase()) {
                return 0;
            }
            if (lhs.name.toLowerCase() < rhs.name.toLowerCase()) {
                return -1;
            }
            return 1;
        });
    },
};
