<template>
  <nav>
    <div class="login-signup">
      <div
        :class="{
          'open-tab': tabState == 'Login',
          'closed-tab': tabState == 'Signup' || tabState == 'Other',
        }"
      >
        <router-link :to="{ name: 'Login' }" class="tab-link">
          Log in
        </router-link>
      </div>
      <div
        :class="{
          'closed-tab': tabState == 'Login' || tabState == 'Other',
          'open-tab': tabState == 'Signup',
        }"
      >
        <router-link :to="{ name: 'Signup' }" class="tab-link">
          Sign up
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const route = useRoute()
    const tabState = ref(null)

    watch(route, () => {
      if (route.name == 'Login') {
        tabState.value = 'Login'
      } else if (route.name == 'Signup') {
        tabState.value = 'Signup'
      } else {
        tabState.value = 'Other'
      }
    })

    return { tabState }
  },
}
</script>

<style scoped>
nav {
  background: var(--nav-bg);
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
  height: 65px;
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
.login-signup {
  margin-bottom: -2px;
  align-self: flex-end;
  display: flex;
  height: 40px;
  white-space: nowrap;
}
.open-tab {
  margin-left: -1px;
  margin-bottom: -1px;
  padding: 0 10px;
  display: flex;
  align-items: flex-end;
  border-left: solid 1px var(--secondary);
  border-right: solid 1px var(--secondary);
  border-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      var(--secondary)
    )
    1/1px;
  border-image-width: 0 1px 0 1px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    var(--background)
  );
}
.closed-tab {
  padding: 0 10px;
  margin-left: -1px;
  margin-bottom: -1px;
  display: flex;
  align-items: flex-end;
  border-left: solid 1px var(--secondary);
  border-right: solid 1px var(--secondary);
  border-image: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      var(--secondary)
    )
    1/1px;
  border-top: 0;
  border-bottom: solid 1px var(--secondary);
  border-image-width: 0 1px 1px 1px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(176, 214, 245, 0.5)
  );
}
.open-tab .tab-link,
.closed-tab .tab-link {
  padding-bottom: 7.5px;
  font-size: 14px;
  white-space: nowrap;
}
.closed-tab .tab-link {
  color: var(--links);
  padding-bottom: 7.5px;
}
</style>
