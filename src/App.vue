<template>
  <div class="app-container">
    <Sidebar v-if="!user" />
    <ProfileNav
      @profile="showProfile"
      @routeChanged="navState += 1"
      v-if="profileTog && user"
      :user="user"
    />
    <div class="page-container">
      <div class="header">
        <WelcomeNav v-if="!user" />
        <Navbar @profile="showProfile" v-else :key="navState" />
      </div>
      <div class="page-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import getUser from './composables/getUser'
import { ref } from '@vue/reactivity'
import Sidebar from './components/Sidebar.vue'
import ProfileNav from './components/ProfileNav.vue'
import WelcomeNav from './components/WelcomeNav.vue'
import Navbar from './components/Navbar.vue'
import getUserDoc from './composables/getUserDoc'
export default {
  components: { Sidebar, ProfileNav, WelcomeNav, Navbar },
  setup() {
    const { user } = getUser()
    const navState = ref(0)
    if (user.value) {
      const { userDoc, userDocError, load } = getUserDoc(user.value.uid)
      load()
        .then(() => {
          document.documentElement.setAttribute(
            'data-theme',
            userDoc.value.theme
          )
          return userDoc.value
        })
        .catch(() => {
          console.error(userDocError.value)
        })
    }
    const profileTog = ref(false)
    const showProfile = () => {
      profileTog.value = !profileTog.value
    }
    return { user, showProfile, profileTog, navState }
  },
}
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
}
.page-container {
  display: flex;
  flex-flow: column;
  width: 100%;
  height: 100%;
}
.header {
  flex: 0 1 auto;
  z-index: 9;
}
.page-content {
  flex: 1 1 auto;
  z-index: 3;
}
</style>
