<template>
  <div class="mobile-welcome-bar">
    <router-link :to="{ name: 'Welcome' }">
      <h1>WikiGen</h1>
    </router-link>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {}
</script>

<style scoped>
.mobile-welcome-bar {
  background: var(--nav-bg);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0 17px;
}
.mobile-welcome-bar h1 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  text-transform: capitalize;
  font-variant: small-caps;
  letter-spacing: 1px;
}
</style>
