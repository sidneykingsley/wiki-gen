<template>
  <div class="mobile-footer">
    <nav>
      <h2>WikiGen</h2>
      <div class="links-container">
        <div class="links">
          <router-link :to="{ name: 'Welcome' }">Generation Demo</router-link>
        </div>
        <div class="links">
          <router-link :to="{ name: 'About' }">About WikiGen</router-link>
          <div class="sub-links">
            <router-link :to="{ name: 'About' }">
              ML Technologies
            </router-link>
            <router-link :to="{ name: 'About' }">Data Collection</router-link>
          </div>
        </div>
        <div class="links">
          <router-link :to="{ name: 'Login' }">Your Account</router-link>
          <div class="sub-links">
            <router-link :to="{ name: 'Signup' }"
              >Create an Account</router-link
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.mobile-footer {
  border-top: 1px solid var(--secondary);
  max-width: 100%;
  background: var(--nav-bg);
}
.mobile-footer nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 20px;
  text-align: center;
}
.mobile-footer nav h2 {
  font-size: 22px;
  padding: 0 0 5px;
  margin: 0 0 7px;
  color: var(--off-primary);
  border-bottom: 1px solid var(--off-primary);
  max-width: 100px;
}
.links-container {
  /* display: flex;
  flex-direction: row;
  justify-content: space-around;
  text-align: center; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.links {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 5px;
}
.links a {
  font-size: 14px;
  color: var(--links);
  padding: 5px 0 7px;
}
.links a:hover {
  text-decoration: underline;
}
.sub-links {
  display: flex;
  flex-direction: column;
}
.sub-links a {
  font-size: 12px;
  color: var(--links);
  border: none;
  padding: 0 0 5px 0;
}
</style>
