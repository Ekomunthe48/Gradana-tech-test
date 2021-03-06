import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMapbox from 'vue-mapbox'
import Mapbox from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

Vue.use(VueMapbox, { mapboxgl: Mapbox })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
