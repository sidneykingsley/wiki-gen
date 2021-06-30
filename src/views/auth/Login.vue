<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h3>Login</h3>
      <input type="email" placeholder="Email" v-model="email" v-focus />
      <input type="password" placeholder="Password" v-model="password" />
      <div class="error">{{ error }}</div>
      <button v-if="!isPending">Log in</button>
      <button v-if="isPending" disabled>Loading</button>
      <p class="signup-text">
        Don't have an account?
        <router-link :to="{ name: 'Signup' }" class="signup-link">
          Sign up here.
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { error, login, isPending } = useLogin()
    const router = useRouter()
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        console.log('User logged in.')
        router.push({ name: 'Home' })
      }
    }

    return { email, password, handleSubmit, error, isPending }
  },
}
</script>

<style scoped>
.signup-text,
.signup-link {
  color: grey;
  padding-top: 25px;
  font-size: 14px;
}
.signup-link {
  text-decoration: underline;
}
</style>
