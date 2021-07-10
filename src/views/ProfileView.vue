<template>
  <div class="profile" v-if="userDoc">
    <div class="icon">
      <AccountCircle :size="120" fillColor="var(--off-primary)" />
    </div>
    <div class="name">
      <h2>{{ userDoc.firstName }} {{ userDoc.secondName }}</h2>
      <div>{{ user.email }}</div>
    </div>
    <div class="details">
      <div class="theme">
        <label class="switch">
          <input
            type="checkbox"
            @click="toggleTheme"
            v-if="theme == 'darkMode'"
            checked
          />
          <input type="checkbox" @click="toggleTheme" v-else />
          <span class="slider round"></span>
        </label>
        <p v-if="theme != 'darkMode'">Light mode</p>
        <p v-else>Dark mode</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'
import { projectFirestore } from '../firebase/config'
import getUserDoc from '../composables/getUserDoc'
import AccountCircle from 'vue3-material-design-icons/AccountCircle.vue'
export default {
  components: { AccountCircle },
  setup() {
    const { user } = getUser()
    const theme = ref('lightMode')
    const { userDoc, error, load } = getUserDoc(user.value.uid)

    load().then(() => {
      theme.value = userDoc.value.theme
      document.documentElement.setAttribute('data-theme', userDoc.value.theme)
    })

    const toggleTheme = () => {
      theme.value = theme.value == 'darkMode' ? 'lightMode' : 'darkMode'
      var ref = projectFirestore.collection('users').doc(user.value.uid)
      document.documentElement.setAttribute('data-theme', theme.value)
      return ref
        .update({
          theme: theme.value,
        })
        .catch((error) => {
          console.error('Error updating document: ', error)
        })
    }
    return { user, userDoc, toggleTheme, theme }
  },
}
</script>

<style scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}
.profile div {
  padding-top: 10px;
}
.profile .name {
  text-align: center;
}
.profile .details {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.profile .details div {
  padding-top: 10px;
}
.profile .details .theme {
  padding-top: 15px;
  display: flex;
  width: 170px;
  justify-content: space-between;
  align-items: center;
}
</style>
