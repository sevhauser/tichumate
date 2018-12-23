<template>
  <div class="tour-view">
    <template v-if="language === 'de'">
      <VueMarkdown>
### Die Rundenansicht
Hier kannst du die Resultate dieser Runde eingeben.

Mit dem Slider kannst du die Verteilung der Kartenpunkt eingeben. Mit den Knöpfen kannst du eingeben ob ein Tichu erfolgreich war - oder nicht.

**Zusätzliche Punkte**
Manche Tichu-Runden sind unglaublich. Dein Partner hat ein Tichu angesagt, es aber nicht geschafft. Du hast noch keine Karten gespielt und dich entschlossen selber ein Tichu anzusagen - und es geschafft!

Aber der Tichu-Input erlaubt nur Erfolg, oder Fail - nicht beides! Für diese Fälle kannst du die zusätzlichen Punkt im untersten Feld eingeben.
      </VueMarkdown>
    </template>
    <template v-else>
      <VueMarkdown>
### The Round View
Here you can enter the results for this round.

Use the slider to input the card points and the buttons below to set if a Tichu has been successful - or failed.

**Additional Points**
Sometimes a round of Tichu can be crazy. Your partner called a Tichu, but screwed up. You haven't played any cards and decided to call another Tichu - and made it!

But the Tichu input only allows for either win, or fail. For these cases you can enter additional points in the bottom field.
      </VueMarkdown>
    </template>
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';

export default {
  name: 'RoundTourContent',
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
