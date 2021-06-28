<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <router-link :to="{ name: 'Welcome' }" class="logo">
        <span class="dot"></span>
        <h1>WikiGen</h1>
      </router-link>
      <div class="links">
        <a href="">About WikiGen</a>
        <div class="sub-links">
          <a href="">Technologies</a>
          <a href="">Data Collection</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { logout, error, isPending } = useLogout()
    const { user } = getUser()
    const router = useRouter()

    const handleClick = async () => {
      await logout()
      if (!error.value) {
        console.log('User logged out.')
        router.push({ name: 'Login' })
      }
    }

    return { isPending, handleClick, user }
  },
}
</script>

<style scoped>
.sidebar-container {
  background: #f6f6f6;
}
.sidebar {
  min-height: 90%;
  margin-top: 50px;
  white-space: nowrap;
  border-right: solid 1px #b0d6f5;
  border-image: linear-gradient(to top, rgba(255, 255, 255, 0), #b0d6f5) 27/1px;
  border-image-width: 0 1px 0 0;
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo h1 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  text-transform: capitalize;
  font-variant: small-caps;
  letter-spacing: 1px;
  font-size: 26px;
}
.logo .dot {
  height: 100px;
  width: 100px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 10px;
}
.links {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.links a {
  font-size: 14px;
  padding: 10px 30px;
  color: #0645ad;
}
.links a:hover {
  text-decoration: underline;
}
.sub-links {
  display: flex;
  flex-direction: column;
  padding-left: 10px;
}
.sub-links a {
  font-size: 12px;
  padding-top: 0;
  padding-bottom: 10px;
  color: #0645ad;
}
</style>
