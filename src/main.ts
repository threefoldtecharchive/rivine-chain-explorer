import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import vuetify from './plugins/vuetify' // path to vuetify export
import { createProvider } from './vue-apollo'
import '../public/styles.css'

Vue.use(VeeValidate, {
  events: ''
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  // tslint:disable-next-line
  vuetify,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')
