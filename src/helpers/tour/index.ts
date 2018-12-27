import { TourManager } from './tourmanager';
import { TourKeys } from './tourview';
import router from '@/router';
import store from '@/store';

const tourMappings = new Map<string, TourKeys[]>();
tourMappings.set('/games', [
  TourKeys.FIRST_TIME_INFO,
  TourKeys.CHANGELOG,
]);

tourMappings.set('/game/new', [
  TourKeys.GAME_EDIT,
]);
tourMappings.set('/game/:gameId', [
  TourKeys.GAME_VIEW,
]);
tourMappings.set('/game/:gameId/round/:roundId', [
  TourKeys.ROUND_VIEW,
]);

const tourManager = new TourManager('tichumateTour', router, store);
tourManager.setRouteMappings(tourMappings);

export * from './tourview';
export * from './tourmanager';
export {
  tourManager,
};
