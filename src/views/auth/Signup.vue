<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <h3>Sign up</h3>
      <div class="signup-name">
        <input
          type="text"
          placeholder="First name"
          v-model="firstName"
          class="first-name"
          v-focus
        />
        <input
          type="text"
          placeholder="Second name"
          v-model="secondName"
          style="text-transform: capitalize"
        />
      </div>
      <input type="email" placeholder="Email" v-model="email" />
      <input type="password" placeholder="Password" v-model="password" />
      <div class="error">{{ error }}</div>
      <button v-if="!isPending">Sign up</button>
      <button v-if="isPending" disabled>Loading</button>
      <p class="login-text">
        Already have an account?
        <router-link :to="{ name: 'Signup' }" class="signup-link">
          Log in here.
        </router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import useSignup from '@/composables/useSignup.js'
import { useRouter } from 'vue-router'
import addUserDoc from '@/composables/addUserDoc'

export default {
  setup() {
    const { error, signup, isPending } = useSignup()
    const { addUserDocError, addDoc } = addUserDoc('users')
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const firstName = ref('')
    const secondName = ref('')
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    const handleSubmit = async () => {
      firstName.value = capitalizeFirstLetter(firstName.value)
      secondName.value = capitalizeFirstLetter(secondName.value)
      const res = await signup(email.value, password.value)
      if (!error.value) {
        addDoc({
          uid: res.user.uid,
          firstName: firstName.value,
          secondName: secondName.value,
        })
        if (!addUserDocError.value) {
          router.push({ name: 'Home' })
        }
      }
    }

    return {
      email,
      password,
      firstName,
      secondName,
      error,
      isPending,
      handleSubmit,
    }
  },
}
</script>

<style scoped>
.login-text,
.login-link {
  color: grey;
  padding-top: 25px;
  font-size: 14px;
}
.login-link {
  text-decoration: underline;
}
.signup-name {
  display: flex;
}
.signup-name input {
  text-transform: capitalize;
  margin-bottom: 0px;
}
.signup-name .first-name {
  margin-right: 20px;
}
</style>
