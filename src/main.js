import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//IMPORT global styles
import './assets/main.css'

//IMPORT auth service
import { projectAuth } from './firebase/config'

//only mount app once after login
let app
projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .directive('focus', {
        mounted(el) {
          el.focus()
        },
      })
      .use(router)
      .mount('#app')
  }
})
