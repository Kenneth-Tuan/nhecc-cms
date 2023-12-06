import { createApp } from 'vue'
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'virtual:uno.css'

const myApp = createApp(App)

myApp.use(Quasar, {
  plugins: {}, 
})

const pinia = createPinia()

myApp.use(pinia)

myApp.mount('#app') 