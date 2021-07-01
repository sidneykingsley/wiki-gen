<template>
  <div class="sidebar-container">
    <div class="profile-sidebar">
      <p class="user-msg" v-if="userDoc">
        Hi,
        <span style="text-transform: capitalize">
          {{ userDoc.firstName }}
        </span>
      </p>
      <a href="">View Articles</a>
      <a href="">Edit Profile</a>
      <a @click="handleClick" v-if="!isPending">
        Log out
      </a>
      <a @click="handleClick" class="logout" v-else>
        Pending..
      </a>
    </div>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '../composables/getUser'
import getDocument from '../composables/getDocument'

export default {
  setup(props, context) {
    const { user } = getUser()
    const { docError, document: userDoc } = getDocument('users', user.value.uid)
    console.log(userDoc)
    const { logout, error, isPending } = useLogout()
    const router = useRouter()
    console.log(props)

    const handleClick = async () => {
      await logout()
      if (!error.value) {
        context.emit('profile')
        router.push({ name: 'Login' })
      }
    }

    return { isPending, handleClick, userDoc }
  },
}
</script>

<style scoped>
.sidebar-container {
  background: var(--nav-bg);
}
.profile-sidebar {
  margin-top: 67px;
  height: 100vh;
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
  /* padding: 5px 5px 10px 5px;
  margin: 0px 30px 10px 30px; */
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
</style>
