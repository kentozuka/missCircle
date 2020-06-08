import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// tailwind
import './assets/css/main.css'

Vue.config.productionTip = false

// change this
axios.defaults.baseURL = process.env.baseURL + 'api' || 'http://127.0.0.1:5000/api'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
