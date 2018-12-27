<template>
  <div class="tour-view">
    <template v-if="language === 'de'">
      <VueMarkdown>
### Die Spielansicht
Hier siehst du aktuellen Stand deines Spiels.

Der Plus-Knopf fügt eine neue Runde hinzu.

Du kannst Runden bearbeiten und löschen in dem du sie nach links, bzw. rechts schiebst.
      </VueMarkdown>
      <div class="tour-view-inline-img">
        <img src="@/components/tour/images/gameslideround.gif" alt="Sliding round entries">
      </div>
      <VueMarkdown>
Willst du die Spiel-Einstellungen ändern? Klick das Optionen-Icon oben rechts.

Willst du Graphen sehen? Klick das Statistik-Icon oben rechts.
      </VueMarkdown>
    </template>
    <template v-else>
      <VueMarkdown>
### The Game View
Here you see the current standings of your game.

Add a new round by clicking the plus button on the bottom.

You can edit, or delete any round by swiping the round left or right.
      </VueMarkdown>
      <div class="tour-view-inline-img">
        <img src="@/components/tour/images/gameslideround.gif" alt="Sliding round entries">
      </div>
      <VueMarkdown>
Want to change the games settings? Click the options icon in the top-right corner.

Want to see some graphs? Click the statistics icon in the top-right corner.
      </VueMarkdown>
    </template>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'GameTourContent',
  computed: {
    language() {
      return this.$i18n.locale;
    },
  },
  components: {
    VueMarkdown,
  },
};
</script>
