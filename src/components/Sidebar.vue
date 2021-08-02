<template>
  <div class="sidebar-container">
    <div class="sidebar">
      <router-link :to="{ name: 'Welcome' }" class="logo">
        <!-- <span class="dot"></span> -->
        <img src="images/logo.png" />
        <h1>WikiGen</h1>
        <h2>DAT611</h2>
      </router-link>
      <div class="links">
        <router-link :to="{ name: 'Welcome' }">Generation Demo</router-link>
        <router-link :to="{ name: 'About' }">About WikiGen</router-link>
        <div class="sub-links">
          <router-link :to="{ name: 'About' }">
            ML Technologies
          </router-link>
          <router-link :to="{ name: 'About' }">Data Collection</router-link>
        </div>
        <router-link :to="{ name: 'Login' }">Your Account</router-link>
        <div class="sub-links">
          <router-link :to="{ name: 'Signup' }">Create an Account</router-link>
        </div>
      </div>
    </div>
    <div class="sidebar-edge"></div>
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
        router.push({ name: 'Login' })
      }
    }

    return { isPending, handleClick, user }
  },
}
</script>

<style scoped>
.sidebar-container {
  background: var(--nav-bg);
  background: linear-gradient(to bottom, var(--nav-bg) 80%, var(--background));
  z-index: 9;
  display: flex;
}
.sidebar-edge {
  background: #000;
  width: 1px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0),
    var(--secondary) 70%
  );
  margin-top: 65px;
}
.sidebar {
  min-height: 90%;
  margin-top: 10px;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
}
.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.logo img {
  width: 100px;
  padding-bottom: 5px;
}
.logo h1 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  text-transform: capitalize;
  font-variant: small-caps;
  letter-spacing: 1px;
  font-size: 28px;
}
.logo h2 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  text-transform: capitalize;
  font-variant: small-caps;
  letter-spacing: 1px;
  font-size: 14px;
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
  margin: 20px 20px 0 20px;
  padding-top: 15px;
  border-top: 1px solid var(--primary);
}
.links a {
  font-size: 14px;
  padding: 5px 10px 10px 10px;
  color: var(--links);
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
  color: var(--links);
}
</style>
