import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './locale';

import './registerServiceWorker';
import './style/main.scss';

import 'typeface-roboto-condensed';
import 'typeface-roboto-slab';

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');
