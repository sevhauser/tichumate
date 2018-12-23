<template>
  <div class="tour-view">
    <div class="tour-view-img">
      <TichuMateText class="tour-view-img--logo" alt="TichuMate"/>
    </div>
    <VueMarkdown v-if="language === 'de'">
### Willkommen zu TichuMate!
TichuMate hilft dir deine Tichu-Spiele zu verwalten. Es ist kein simpler Tracker, sondern kann an deine Art Tichu zu spielen angepasst werden.

**Spieler**
Erstelle einen Spieler für jeden deiner Tichu-Freunde und sieh wann und wie gut sie gespielt haben.

**Spiele**
Verwalte deine Spiele. Spiele können so konfiguriert werden, wie du es willst.

**Anpassen**
Reichen dir das normale und das grosse Tichu nicht? Erstelle deine eigenen!

Falls es Probleme gibt, hat es in den Einstellungen mehr Informationen.

Viel Spass und gute Spiele!
    </VueMarkdown>
    <VueMarkdown v-else>
### Welcome to TichuMate!
TichuMate helps you keep track of your Tichu games. It's not just a simple tracker, but can be customized to fit the way you play Tichu.

**Players**
Create a player for each of your Tichu buddies, so you can see when and how well they played.

**Games**
Track your games. Games can be setup to work according to your rules.

**Customize**
If the regular and the grand tichu are not enough, create your own!

If you experience any problems, checkout the settings page.

Have fun and good games!
    </VueMarkdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';
import TichuMateText from '@/components/icons/TichuMateText.vue';

export default {
  name: 'FirstTimeTourView',
  computed: {
    language() {
      return this.$i18n.locale;
    },
  },
  components: {
    TichuMateText,
    VueMarkdown,
  },
};
</script>
