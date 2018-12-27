import { TourKeys, TourView, TourViewValues } from './tourview';
import Router, { Route } from 'vue-router';
import { Store } from 'vuex';
import { RootState } from '@/store/types';

export class TourManager {
  public storagePrefix: string;
  public storageStateKey: string;
  private router: Router;
  private store: Store<RootState>;
  public views: TourViewValues[] = [
    {
      key: TourKeys.FIRST_TIME_INFO,
      version: 1,
    },
    {
      key: TourKeys.CHANGELOG,
      version: 1,
      setSeenWithView: TourKeys.FIRST_TIME_INFO,
    },
    {
      key: TourKeys.GAME_EDIT,
      version: 1,
    },
    {
      key: TourKeys.GAME_VIEW,
      version: 1,
    },
    {
      key: TourKeys.ROUND_VIEW,
      version: 1,
    },
  ];
  private storageState: Map<TourKeys, number> = new Map<TourKeys, number>();
  private routeMappings: Map<string, TourKeys[]> = new Map<string, TourKeys[]>();

  constructor(storagePrefix: string, router: Router, store: Store<RootState>) {
    this.storagePrefix = storagePrefix;
    this.storageStateKey = `${storagePrefix}-values`;
    this.router = router;
    this.store = store;
    this.getStorageEntries();
    this.setupRouting();
  }

  public setRouteMappings(mappings: Map<string, TourKeys[]>) {
    this.routeMappings = mappings;
  }

  public getRouteMappings(): Map<string, TourKeys[]> {
    return this.routeMappings;
  }

  private setupRouting() {
    this.router.afterEach((to) => {
      this.handleRouteChange(to);
    });
  }

  private handleRouteChange(to: Route) {
    const views = this.getViewsFromRoute(to);
    for (const view of views) {
      this.store.dispatch('tour/addTourView', view);
    }
  }

  public getTourView(tourKey: TourKeys): TourView | null {
    const values = this.views.find((el) => el.key === tourKey);
    if (values) {
      let storageState = this.storageState.get(values.key);
      if (storageState === undefined) {
        this.storageState.set(tourKey, 0);
        this.saveStorageState();
        storageState = 0;
      }
      if (storageState !== undefined && storageState < values.version) {
        return new TourView(values);
      }
    }
    return null;
  }

  public setViewSeen(view: TourView) {
    const seenVersion = this.storageState.get(view.key);
    if (seenVersion !== undefined) {
      this.storageState.set(view.key, view.version);
      this.saveStorageState();
    }
  }

  public getViewsFromRoute(route: Route): TourView[] {
    const result = new Array<TourView>();
    const views = this.getViewsFromRoutePaths(route);
    if (views) {
      const tourKeys = views as TourKeys[];
      for (const key of tourKeys) {
        const view = this.getTourView(key);
        if (view !== null) {
          if (view.setSeenWithView) {
            const skipView = result.findIndex((el) => el.key === view.setSeenWithView);
            if (skipView >= 0) {
              this.setViewSeen(view);
              continue;
            }
          }
          result.push(view);
        }
      }
    }
    return result;
  }

  public getViewsFromRoutePaths(route: Route): TourKeys[] {
    const result = new Array<TourKeys>();
    for (const matched of route.matched) {
      const views = this.routeMappings.get(matched.path);
      if (views) {
        for (const key of views) {
          if (!result.includes(key)) {
            result.push(key);
          }
        }
      }
    }
    return result;
  }

  private getStorageEntries() {
    const value = localStorage.getItem(this.storageStateKey);
    if (value === null) {
      this.intializeStorageEntries();
    } else {
      this.storageState = new Map<TourKeys, number>(JSON.parse(value));
    }
  }

  private saveStorageState() {
    localStorage.setItem(this.storageStateKey, JSON.stringify([...this.storageState]));
  }

  private intializeStorageEntries() {
    this.views.forEach((el) => {
      this.storageState.set(el.key, 0);
    });
    this.saveStorageState();
  }
}
