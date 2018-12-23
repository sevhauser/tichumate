<template>
  <div class="home view">
    <div class="app-bar-home">
      <div class="app-bar-home__top home-header">
        <TichuMateText class="home-header__logo" alt="TichuMate"/>
        <AppBarRow>
          <TichuIcon
            slot="right"
            class="clickable"
            viewBox="-2 -2 20 20"
            @click="loadSettings">
            <IconSettings/>
          </TichuIcon>
        </AppBarRow>
      </div>
      <div class="app-bar-home__tabs home-tabs">
          <router-link tag="div" class="home-tab" to="/players" active-class="active" replace>
            {{ $tc('player.player', 2)}}
          </router-link>
          <router-link tag="div" class="home-tab" to="/games" active-class="active" replace>
            {{ $tc('game.game', 2)}}
          </router-link>
          <router-link tag="div" class="home-tab" to="/customize" active-class="active" replace>
            {{ $t('customize.customize') }}
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
import TichuMateText from '@/components/icons/TichuMateText.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import AppBarRow from '@/components/ui/AppBarRow.vue';
import { Player } from '@/db/entity';
import { repos } from '@/db/repos';

export default {
  name: 'Home',
  data() {
    return {
      activeTab: 1,
      tabs: [
        { id: 'players', title: this.$tc('player.player', 2) },
        { id: 'games', title: this.$tc('game.game', 2) },
        { id: 'customize', title: this.$t('customize.customize') },
      ],
    };
  },
  methods: {
    loadSettings() {
      this.$router.push('/settings');
    },
  },
  components: {
    TichuIcon,
    IconClose,
    IconSettings,
    AppBarRow,
    TichuMateText,
  },
};

</script>
