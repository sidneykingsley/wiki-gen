<template>
  <div class="app-container">
    <Sidebar v-if="!user && !isMobile" />
    <ProfileNav
      @profile="showProfile"
      @routeChanged="navState += 1"
      v-if="profileTog && user"
      :user="user"
    />
    <div class="page-container">
      <div class="header">
        <MobileWelcomeBar v-if="!user && isMobile" />
        <WelcomeNav v-if="!user" />
        <MobileNavbar
          @profile="showProfile"
          v-if="user && isMobile"
          :user="user"
        />
        <Navbar
          @profile="showProfile"
          v-if="user && !isMobile"
          :key="navState"
        />
      </div>
      <div class="page-content">
        <MobileGPUWarning v-if="isMobile" />
        <router-view />
        <MobileWelcomeFooter v-if="!user && isMobile" />
      </div>
    </div>
  </div>
</template>

<script>
import getUser from './composables/getUser'
import { ref } from '@vue/reactivity'
import Sidebar from './components/Sidebar.vue'
import ProfileNav from './components/ProfileNav.vue'
import MobileWelcomeBar from './components/MobileWelcomeBar.vue'
import WelcomeNav from './components/WelcomeNav.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import MobileGPUWarning from './components/MobileGPUWarning.vue'
import Navbar from './components/Navbar.vue'
import MobileWelcomeFooter from './components/MobileWelcomeFooter.vue'
import getUserDoc from './composables/getUserDoc'
import checkMobile from './composables/checkMobile'
export default {
  components: {
    Sidebar,
    ProfileNav,
    MobileWelcomeBar,
    WelcomeNav,
    MobileNavbar,
    Navbar,
    MobileWelcomeFooter,
    MobileGPUWarning,
  },
  setup() {
    const isMobile = ref(null)
    const { user } = getUser()
    const navState = ref(0)
    isMobile.value = checkMobile()
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
    return { user, showProfile, profileTog, navState, isMobile }
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
