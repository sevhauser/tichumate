<template>
  <div class="tour-view">
    <VueMarkdown v-if="language === 'de'">
### Spiele erstellen
Hier kannst du dein Spiel einrichten. Wähle für die Teams die Namen und füge ihnen Spieler hinzu.

Du kannst ebenfalls wählen was die Gewinnbedingungen sind. Das sind entweder Punktzahl (das erste Team mit der Punktzahl gewinnt), oder Differenz (das erste Team mit dem angegebenen Vorsprung gewinnt).

Diese Einstellungen können jederzeit geändert werden!
    </VueMarkdown>
    <VueMarkdown v-else>
### Creating Games
Here you can setup your game. Choose team names and assign its players.

You can also specify what the win conditions are. Its either score (the team to reach the score first wins), or difference (the team with the specified lead wins).

You can change these settings any time!
    </VueMarkdown>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'GameEditTourContent',
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
