<template>
  <div class="app-container">
    <Sidebar v-if="!user" />
    <ProfileNav @profile="showProfile" v-if="profileTog && user" />
    <div class="page-container">
      <div class="header">
        <WelcomeNav v-if="!user" />
        <Navbar @profile="showProfile" v-else />
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

export default {
  components: { Sidebar, ProfileNav, WelcomeNav, Navbar },
  setup() {
    const { user } = getUser()
    const profileTog = ref(false)
    const showProfile = () => {
      profileTog.value = !profileTog.value
    }
    return { user, showProfile, profileTog }
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
}
.header {
  flex: 0 1 auto;
}
.page-content {
  flex: 1 1 auto;
}
</style>
