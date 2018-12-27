<template>
  <div class="settings-entry settings-entry--text">
    <template v-if="$i18n.locale === 'de'">
      <VueMarkdown :anchor-attributes="linkAttrs">
Gemacht mit ❤ von [Severin Hauser](https://github.com/sevhauser).

Diese App ist open-source. Du kannst den Code anschauen - oder forken - auf [GitHub](https://github.com/sevhauser/tichumate).

Hast du einen Bug gefunden, oder hättest du gerne eine weitere Funktion, dann erstelle ein [Issue](https://github.com/sevhauser/tichumate/issues) auf GitHub, oder schreib mir eine [E-Mail](mailto:tiltedch@gmail.com).
      </VueMarkdown>
    </template>
    <template v-else>
    <VueMarkdown :anchor-attributes="linkAttrs">
Made with ❤ by [Severin Hauser](https://github.com/sevhauser).

This app is open source. You can view - or fork it - it on [GitHub](https://github.com/sevhauser/tichumate).

If there's a bug, or a feature you'd like, submit an [issue](https://github.com/sevhauser/tichumate/issues) on GitHub, or write me an [E-Mail](mailto:tiltedch@gmail.com).
    </VueMarkdown>
  </template>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';
export default {
  name: 'SettingsAbout',
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
