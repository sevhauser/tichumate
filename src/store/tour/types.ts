import { TourView } from '@/helpers/tour';

export const ADD_TOURVIEW = 'ADD_TOURVIEW';
export const POP_TOURVIEW = 'POP_TOURVIEW';
export const CLEAR_TOURVIEWS = 'CLEAR_TOURVIEWS';

export interface TourState {
  views: TourView[];
}
