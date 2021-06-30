<template>
  <div class="sidebar-container">
    <div class="profile-sidebar">
      <div class="dot-container">
        <span class="dot"></span>
      </div>
      <p class="user-msg">
        Hi,
        <span style="text-transform: capitalize">
          {{ props.details.firstName }}
        </span>
      </p>
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
  props: ['details'],
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

    return { isPending, handleClick, props }
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
  padding: 10px 35px;
  color: var(--links);
}
.profile-sidebar a:hover {
  text-decoration: underline;
}
.dot-container {
  margin: 0 auto;
}
.dot {
  height: 100px;
  width: 100px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 10px;
}
.user-msg {
  padding: 10px 5px 10px 5px;
  margin: 0px 30px 5px 30px;
  line-height: 28px;
  font-size: 20px;
  font-weight: 500;
  /* border-bottom: solid 1px var(--primary); */
  border-bottom: solid 1px var(--links);
}
.logout {
  cursor: not-allowed;
  color: #999 !important;
}
.logout:hover {
  text-decoration: none !important;
}
</style>
