<template>
  <div class="preview" :class="{ 'active-modal': trySave }">
    <div class="icons">
      <SaveIcon title="Save article" @click="trySave = true" />
    </div>
    <div class="article">
      <h3>Your article:</h3>
      <p v-html="props.text"></p>
    </div>
  </div>
  <transition name="fade">
    <div v-if="trySave">
      <div class="modal-overlay" @click="trySave = false"></div>
      <div class="modal">
        <div class="icon-container">
          <Close class="icon" @click="trySave = false" />
        </div>
        <form @submit.prevent="useSave">
          <h3>Give your article a title</h3>
          <input type="text" placeholder="Title" v-model="title" v-focus />
          <button>Save</button>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import Close from 'vue3-material-design-icons/Close.vue'
import SaveIcon from 'vue3-material-design-icons/ContentSave.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { timestamp } from '@/firebase/config'
import saveArticle from '@/composables/saveArticle'
export default {
  components: { SaveIcon, Close },
  props: ['text', 'userDoc'],
  setup(props) {
    const router = useRouter()
    const { articleError, addArticle } = saveArticle('articles')
    const trySave = ref(false)
    const title = ref(null)
    const useSave = () => {
      addArticle({
        uid: props.userDoc.id,
        firstName: props.userDoc.firstName,
        secondName: props.userDoc.secondName,
        title: title.value,
        text: props.text,
        createdAt: timestamp(),
      }).catch(() => {
        console.error(articleError.value)
      })
      router.push({ name: 'Home' })
    }
    return { props, useSave, trySave, title }
  },
}
</script>

<style scoped>
.preview {
  margin: 100px;
  z-index: 0;
}
.active-modal {
  filter: blur(3px);
  transition: 0.3s ease;
}
.icons {
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
}
.article {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}
.article p,
.article h3 {
  padding-top: 10px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg-shadow);
  z-index: 3;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
  padding: 20px;
  border-radius: 20px;
  background: var(--background);
  box-shadow: var(--bg-shadow) 0px 5px 15px;
}
.modal form {
  padding: 0px 20px 10px 20px;
}
.modal button {
  margin: 10px 0px 10px 5px;
  width: 90px;
}
.other {
  background: var(--disabled);
}
.other:hover {
  background: var(--disabled-hover);
}
.icon-container {
  display: flex;
  justify-content: flex-end;
}
.icon:hover {
  opacity: 0.5;
  transition: 0.3s ease;
}
</style>
