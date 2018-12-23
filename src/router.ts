import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Players from './views/Players.vue';
import Player from './views/Player.vue';
import Games from './views/Games.vue';
import Customize from './views/Customize.vue';
import Game from './views/Game.vue';
import Settings from './views/Settings.vue';
import GameEdit from './views/GameEdit.vue';
import GameStatistics from './views/GameStatistics.vue';
import Round from './views/Round.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'games',
          name: 'Games',
          component: Games,
        }, {
          path: 'players',
          name: 'Players',
          component: Players,
        }, {
          path: 'customize',
          name: 'Customize',
          component: Customize,
        },
      ],
    }, {
      path: '/game/new',
      name: 'New Game',
      props(route) {
        const props: { [index: string]: any } = { ...route.params };
        props.gameId = 0;
        return props;
      },
      component: GameEdit,
    }, {
      path: '/game/:gameId',
      name: 'Game',
      props(route) {
        const props: { [index: string]: any } = { ...route.params };
        props.gameId = parseInt(props.gameId, 10);
        return props;
      },
      component: Game,
    }, {
      path: '/game/:gameId/round/:roundId',
      name: 'Round',
      component: Round,
      props(route) {
        const props: { [index: string]: any } = { ...route.params };
        props.gameId = parseInt(props.gameId, 10);
        props.roundId = parseInt(props.roundId, 10);
        return props;
      },
    }, {
      path: '/game/:gameId/edit',
      name: 'Edit Game',
      props(route) {
        const props: { [index: string]: any } = { ...route.params };
        props.gameId = parseInt(props.gameId, 10);
        return props;
      },
      component: GameEdit,
    }, {
      path: '/game/:gameId/statistics',
      name: 'Statistics',
      props(route) {
        const props: { [index: string]: any } = { ...route.params };
        props.gameId = parseInt(props.gameId, 10);
        return props;
      },
      component: GameStatistics,
    }, {
      path: '/player/:playerId',
      name: 'Player',
      props(route) {
        const props: { [index: string]: any } = { ...route.params };
        props.playerId = parseInt(props.playerId, 10);
        return props;
      },
      component: Player,
    }, {
      path: '/settings',
      name: 'Settings',
      component: Settings,
    },
  ],
});
