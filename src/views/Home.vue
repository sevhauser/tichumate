<template>
  <div class="home view">
    <div class="app-bar-home">
      <div class="app-bar-home__top"></div>
      <div class="app-bar-home__tabs home-tabs">
          <router-link tag="div" class="home-tab" to="/players" active-class="active" replace>
            Players
          </router-link>
          <router-link tag="div" class="home-tab" to="/games" active-class="active" replace>
            Games
          </router-link>
          <router-link tag="div" class="home-tab" to="/customize" active-class="active" replace>
            Customize
          </router-link>
      </div>
    </div>
    <div class="home__content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import TichuIcon from '@/components/icons/TichuIcon.vue';
import IconClose from '@/components/icons/IconClose.vue';
import { Player } from '@/db/entity';
import { repos } from '@/db/repos';

export default {
  name: 'Home',
  data() {
    return {
      activeTab: 1,
      tabs: [
        { id: 'players', title: 'Players' },
        { id: 'games', title: 'Games' },
        { id: 'customize', title: 'Customize' },
      ],
    };
  },
  mounted() {
    if (this.$route.path === '/') {
      this.$router.replace('/games');
    }
  },
  components: {
    TichuIcon,
    IconClose,
  },
};

</script>
