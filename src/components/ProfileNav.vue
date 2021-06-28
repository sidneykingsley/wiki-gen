<template>
  <div class="sidebar-container">
    <div class="profile-sidebar">
      <a href="">My Details</a>
      <a href="">My Articles</a>
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

export default {
  setup(props, context) {
    const { logout, error, isPending } = useLogout()
    const router = useRouter()

    const handleClick = async () => {
      await logout()
      if (!error.value) {
        context.emit('profile')
        router.push({ name: 'Login' })
      }
    }

    return { isPending, handleClick }
  },
}
</script>

<style scoped>
.sidebar-container {
  background: #f6f6f6;
}
.profile-sidebar {
  margin-top: 67px;
  height: 100vh;
  white-space: nowrap;
  border-right: solid 1px #b0d6f5;
  border-image: linear-gradient(to top, rgba(255, 255, 255, 0), #b0d6f5) 27/1px;
  border-image-width: 0 1px 0 0;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
}
.profile-sidebar a {
  font-size: 14px;
  padding: 10px 30px;
  color: #0645ad;
}
.profile-sidebar a:hover {
  text-decoration: underline;
}
.logout {
  cursor: not-allowed;
  color: #999 !important;
}
.logout:hover {
  text-decoration: none !important;
}
</style>
