import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authetication } from './plugins/authentication'
import PrimeVue from 'primevue/config';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App).use(vuetify)

app.use(createPinia())
app.use(PrimeVue);

authetication.install().then(()=>{
    app.use(router)
    app.mount('#app')
})
