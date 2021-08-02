<template>
  <div class="chat-container">
    <h2 v-html="formQuestion"></h2>
    <p class="error" v-if="answerError">Please be more specific</p>
    <form @submit.prevent="handleSubmit">
      <input type="text" required v-model="answer" v-focus />
      <div class="submit" @mouseover="hover = true" @mouseleave="hover = false">
        <a @click="handleSubmit">
          <transition name="fade">
            <Send v-if="!hover" class="send-icon" />
          </transition>
          <transition name="fade">
            <SendOutline v-if="hover" class="send-icon" />
          </transition>
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Send from 'vue3-material-design-icons/Send.vue'
import SendOutline from 'vue3-material-design-icons/SendOutline.vue'
export default {
  components: { Send, SendOutline },
  props: ['type', 'error'],
  emits: ['submit'],
  directives: {
    focus: {
      mounted(el) {
        el.focus()
      },
    },
  },
  setup(props, context) {
    const hover = ref(false)
    const answerError = ref(props.error)
    const formQuestion = ref('')
    switch (props.type) {
      case 0:
        formQuestion.value =
          'Do you prefer working with <span>people</span> or with <span>things</span>?'
        break
      case 1:
        formQuestion.value =
          'Would you feel more comfortable being tasked with analysing <span>data</span> or coming up with unqiue <span>ideas</span>?'
        break
      case 2:
        formQuestion.value = 'Do you consider yourself a sociable person?'
        break
      case 3:
        formQuestion.value = 'Do you like having rules to follow?'
        break
      case 'err':
        answerError.value = true
        break
      default:
        formQuestion.value = 'Unknown question type.'
        break
    }
    const answer = ref('')
    const handleSubmit = () => {
      answer.value = answer.value.toLowerCase()
      context.emit('submit', answer.value, props.type)
    }
    return { handleSubmit, formQuestion, answer, answerError, hover }
  },
}
</script>

<style scoped>
.chat-container {
  max-width: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.chat-container a {
}
.chat-container h2 >>> span {
  text-decoration: underline;
}
.chat-container form {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-container form .submit {
  width: 50px;
  height: 25px;
}
.send-icon {
  position: absolute;
}
</style>
