<template>
  <nav>
    <div
      class="profile-icon"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <a @click="handleProfile">
        <transition name="fade">
          <AccountCircle
            fillColor="var(--primary)"
            v-if="!hover"
            class="acc-ico"
          />
        </transition>
        <transition name="fade">
          <AccountCircle
            fillColor="var(--secondary)"
            v-if="hover"
            class="acc-ico"
          />
        </transition>
      </a>
    </div>
    <router-link :to="{ name: 'Welcome' }" class="logo">
      <h1>WikiGen</h1>
    </router-link>
    <router-link :to="{ name: 'GenerateArticle' }">
      <button class="gen-btn">
        Generate
      </button>
    </router-link>
  </nav>
</template>

<script>
import { ref } from '@vue/reactivity'
import AccountCircle from 'vue3-material-design-icons/AccountCircle.vue'
export default {
  components: { AccountCircle },
  setup(props, context) {
    const handleProfile = () => context.emit('profile')
    const hover = ref(false)
    return { handleProfile, hover }
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
.logo :hover {
  background: linear-gradient(
    to right,
    var(--off-primary) 0,
    var(--primary-bold) 10%,
    var(--off-primary) 20%
  );
  background-position: 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 16s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
}
.profile-icon a:hover {
  color: var(--secondary);
  cursor: pointer;
}
.gen-btn {
  margin-right: 20px;
}
.profile-icon {
  height: 50px;
  width: 30px;
  margin-left: 20px;
}
.profile-icon a {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.acc-ico {
  position: absolute;
}
</style>
