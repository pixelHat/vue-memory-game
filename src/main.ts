import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { OModal } from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full-vars.css'


const app = createApp(App)
console.log(OModal)
app.component("OModal", OModal)
app.mount('#app')
