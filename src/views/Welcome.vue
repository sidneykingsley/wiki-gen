<template>
  <div class="home">
    <div class="slogan-border">
      <div class="slogan">
        <h2>
          WikiGen uses AI to generate your fortune as a mock Wikipedia article.
        </h2>
        <div class="buttons">
          <router-link class="btn" :to="{ name: 'Login' }">
            Get started
          </router-link>
          <router-link class="btn" :to="{ name: 'Demo' }">
            Try the demo
          </router-link>
        </div>
      </div>
    </div>
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
  padding: 0 20px;
}
.slogan-border {
  background: linear-gradient(
    to bottom right,
    var(--secondary),
    rgba(255, 255, 255, 0) 70%
  );
  max-width: 600px;
  padding: 3px;
  margin-bottom: 50px;
}
.slogan {
  background: var(--background);
  padding: 50px;
}
.home h2 {
  padding-bottom: 5px;
}
.home .btn {
  margin: 15px 5px 0;
}
.home .buttons {
  margin-top: 5px;
}
.home .buttons :last-child {
  background: var(--disabled);
}
.home .buttons :last-child:hover {
  background: var(--disabled-hover);
}
</style>
