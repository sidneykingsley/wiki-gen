import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Demo from '../views/articles/Demo.vue'
import Generate from '../views/articles/Generate.vue'
import ProfileView from '../views/ProfileView.vue'

// route guard
import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const welcomeRedirect = (to, from, next) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: welcomeRedirect,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
    beforeEnter: requireAuth,
  },
  {
    path: '/generate',
    name: 'Generate',
    component: Generate,
    beforeEnter: requireAuth,
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView,
    beforeEnter: requireAuth,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
