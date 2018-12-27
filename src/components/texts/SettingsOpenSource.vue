<template>
  <div class="settings-entry settings-entry--text">
    <template v-if="$i18n.locale === 'de'">
      <VueMarkdown :anchor-attributes="linkAttrs">
TichuMate wurde u.a. mit den folgenden Tools erstellt:

* [Vue](https://vuejs.org)
* [TypeScript](https://www.typescriptlang.org)
* [Dexie](https://dexie.org)
* [vue-1i8n](https://kazupon.github.io/vue-i18n/)
* [vue-chartjs](https://vue-chartjs.org) (verwendet [chart.js](https://chartjs.org/))
* [vue-markdown](https://github.com/miaolz123/vue-markdown)
    </VueMarkdown>
    </template>
    <template v-else>
    <VueMarkdown :anchor-attributes="linkAttrs">
TichuMate has been built with the following awesome tools:

* [Vue](https://vuejs.org)
* [TypeScript](https://www.typescriptlang.org)
* [Dexie](https://dexie.org)
* [vue-1i8n](https://kazupon.github.io/vue-i18n/)
* [vue-chartjs](https://vue-chartjs.org) (uses [chart.js](https://chartjs.org/))
* [vue-markdown](https://github.com/miaolz123/vue-markdown)
    </VueMarkdown>
  </template>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  name: 'SettingsOpenSource',
  data: () => ({
    linkAttrs: {
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
    },
  }),
  components: {
    VueMarkdown,
  },
};
</script>
