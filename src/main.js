import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')