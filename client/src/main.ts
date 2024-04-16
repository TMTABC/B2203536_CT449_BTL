import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { authetication } from './plugins/authentication'
import PrimeVue from 'primevue/config';

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'

const app = createApp(App)

app.use(createPinia())
app.use(PrimeVue);

authetication.install().then(()=>{
    app.use(router)
    app.mount('#app')
})
