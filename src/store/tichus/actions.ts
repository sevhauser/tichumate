import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { TichusState, TICHUS_LOADED } from './types';
import { Tichu } from '@/db/entity';


export const actions: ActionTree<TichusState, RootState> = {
  async loadTichus({ commit }): Promise<any> {
    const tichus: Tichu[] = await repos.tichus.getAll();
    commit(TICHUS_LOADED, tichus);
  },
};
