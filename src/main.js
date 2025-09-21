import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/assets/css/tailwind.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faLink,
  faCode,
  faQuoteRight,
  faFileAlt,
  faDownload,
  faPhotoVideo,
  faToggleOn,
  faToggleOff,
  faBriefcase,
  faGraduationCap,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faLink,
  faCode,
  faQuoteRight,
  faFileAlt,
  faDownload,
  faPhotoVideo,
  faToggleOn,
  faToggleOff,
  faBriefcase,
  faGraduationCap,
  faUserGraduate,
)

const app = createApp(App)

app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
