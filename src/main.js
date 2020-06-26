import Vue from "vue";
import App from "./App.vue";
import VueCompositionApi from '@vue/composition-api';
// 引入ElementUI组件
import ElementUI from 'element-ui';
import 'element-ui/packages/theme-chalk/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';

import router from "./router";
import store from "./store";
// 使用rem代替px
// import "amfe-flexible";
// 注入
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
