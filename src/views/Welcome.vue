<template>
  <div class="home">
    <h2>Generate your future as a Wikipedia article.</h2>
    <router-link class="btn" :to="{ name: 'Login' }">
      Get started
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
}
</script>

<style scoped>
.home {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.home .btn {
  margin-top: 20px;
}
</style>
