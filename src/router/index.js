import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Demo from '../views/articles/Demo.vue'
import Generate from '../views/articles/Generate.vue'
import ProfileView from '../views/ProfileView.vue'
import MyArticles from '../views/MyArticles.vue'
import About from '../views/About.vue'

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

const authPresent = (to, from, next) => {
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
    beforeEnter: authPresent,
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
    beforeEnter: authPresent,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: authPresent,
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
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
  {
    path: '/articles',
    name: 'MyArticles',
    component: MyArticles,
    beforeEnter: requireAuth,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
