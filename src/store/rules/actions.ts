import { ActionTree } from 'vuex';
import { RootState } from '../types';
import { repos } from '@/db/repos';
import { RulesState, RULES_LOADED } from './types';
import { Rule } from '@/db/entity';


export const actions: ActionTree<RulesState, RootState> = {
  async loadRules({ commit }): Promise<any> {
    const players: Rule[] = await repos.rules.getAll();
    commit(RULES_LOADED, players);
  },
};
