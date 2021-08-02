<template>
  <nav>
    <div class="profile-icon-container">
      <div class="icon">
        <a @click="isProfileNav = !isProfileNav">
          <transition name="fade">
            <AccountCircle
              v-if="!isProfileNav"
              class="acc-icon"
              title="Open navigation"
            />
          </transition>
          <transition name="fade">
            <CloseCircle
              v-if="isProfileNav"
              class="acc-icon"
              title="Close navigation"
            />
          </transition>
        </a>
      </div>
    </div>
    <router-link :to="{ name: 'Welcome' }" class="logo">
      <h1>WikiGen</h1>
    </router-link>
    <router-link :to="{ name: 'Generate' }">
      <button class="gen-btn">
        New
      </button>
    </router-link>
  </nav>
  <transition name="fade">
    <div class="mobile-profile-nav" v-if="isProfileNav && userDoc">
      <p class="user-msg">
        Hi,
        <span style="text-transform: capitalize">
          {{ userDoc.firstName }}
        </span>
      </p>
      <a @click="useNav('Home')">Home</a>
      <a @click="useNav('MyArticles')">My Articles</a>
      <a @click="useNav('ProfileView')">Edit Profile</a>
      <a @click="handleLogOut" v-if="!isPending">
        Log out
      </a>
      <a v-if="isPending" style="color:var(--off-primary)">
        Logging out..
      </a>
    </div>
  </transition>
</template>

<script>
import { ref } from '@vue/reactivity'
import AccountCircle from 'vue3-material-design-icons/AccountCircle.vue'
import AccountCircleOutline from 'vue3-material-design-icons/AccountCircleOutline.vue'
import CloseCircle from 'vue3-material-design-icons/CloseCircle.vue'
import CloseCircleOutline from 'vue3-material-design-icons/CloseCircleOutline.vue'
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
import getUserDoc from '../composables/getUserDoc'

export default {
  components: {
    AccountCircle,
    AccountCircleOutline,
    CloseCircle,
    CloseCircleOutline,
  },
  props: ['user'],
  emits: ['profile', 'routeChanged'],
  setup(props, context) {
    const isProfileNav = ref(false)
    const { userDoc, userDocError, load } = getUserDoc(props.user.uid)
    load()
    const { logout, error, isPending } = useLogout()
    const router = useRouter()
    const useNav = (dir) => {
      isProfileNav.value = false
      router.push({ name: dir })
    }
    const handleLogOut = async () => {
      await logout()
      if (!error.value) {
        context.emit('profile')
        router.push({ name: 'Login' })
      }
    }
    return { isProfileNav, context, isPending, handleLogOut, userDoc, useNav }
  },
}
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 65px;
  background: var(--nav-bg);
  border-bottom: solid 1px var(--secondary);
  border-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      var(--secondary)
    )
    27/1px;
  border-top: 0;
  border-left: 0;
  border-bottom: solid;
  border-right: 0;
  border-image-width: 0 0 1px 0;
}
.logo {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.logo h1 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  text-transform: capitalize;
  font-variant: small-caps;
  letter-spacing: 1px;
}
.gen-btn {
  margin-right: 20px;
}
.profile-icon-container .icon {
  height: 25px;
  width: 25px;
}
.acc-icon {
  position: absolute;
  margin-left: 20px;
}

.mobile-profile-nav {
  padding: 0 10px 30px 10px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  background: var(--off-bg2);
  z-index: 9;
}

.user-msg {
  padding: 5px 5px 7px 0px;
  margin: 20px 30px 10px 30px;
  line-height: 28px;
  font-size: 20px;
  font-weight: 600;
  border-bottom: solid 1px var(--links);
  border-bottom: solid 2px var(--primary);
}
.logout {
  cursor: not-allowed;
  color: #999 !important;
}
.logout:hover {
  text-decoration: none !important;
}
.mobile-profile-nav a {
  font-size: 14px;
  padding: 7px 35px;
  color: var(--links);
}
.mobile-profile-nav a:hover {
  text-decoration: underline;
}
</style>
