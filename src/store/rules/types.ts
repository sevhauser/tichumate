import { Rule } from '@/db/entity';

export const RULES_LOADED = 'RULES_LOADED';

export interface RulesState {
  rules: Rule[];
}
