<template>
  <div class="sidebar-container">
    <transition name="fade">
      <div class="profile-sidebar" v-if="userDoc">
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
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
import getUserDoc from '../composables/getUserDoc'

export default {
  props: ['user'],
  emits: ['profile', 'routeChanged'],
  setup(props, context) {
    const { userDoc, userDocError, load } = getUserDoc(props.user.uid)
    load()
    const { logout, error, isPending } = useLogout()
    const router = useRouter()
    const useNav = (dir) => {
      router.push({ name: dir })
      context.emit('routeChanged')
      context.emit('profile')
    }
    const handleLogOut = async () => {
      await logout()
      if (!error.value) {
        context.emit('profile')
        router.push({ name: 'Login' })
      }
    }
    return {
      isPending,
      handleLogOut,
      userDoc,
      useNav,
    }
  },
}
</script>

<style scoped>
.sidebar-container {
  background: var(--nav-bg);
  z-index: 4;
}
.profile-sidebar {
  margin-top: 67px;
  height: 80%;
  white-space: nowrap;
  border-right: solid 1px var(--secondary);
  border-image: linear-gradient(
      to top,
      rgba(255, 255, 255, 0),
      var(--secondary)
    )
    27/1px;
  border-image-width: 0 1px 0 0;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
.profile-sidebar a {
  font-size: 14px;
  padding: 7px 35px;
  color: var(--links);
}
.profile-sidebar a:hover {
  text-decoration: underline;
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

.theme {
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.theme p {
  font-size: 12px;
  padding-top: 10px;
}
</style>
