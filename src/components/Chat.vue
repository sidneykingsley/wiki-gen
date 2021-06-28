<template>
  <h2 v-html="formQuestion"></h2>
  <p class="error" v-if="answerError">Please be more specific</p>
  <form @submit.prevent="handleSubmit" class="details-form">
    <input type="text" required v-model="answer" v-focus />
    <div class="submit">
      <button>
        <SendIcon :size="24" />
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import SendIcon from 'vue3-material-design-icons/Send.vue'
export default {
  components: { SendIcon },
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
    const answerError = ref(props.error)
    const formQuestion = ref('')
    switch (props.type) {
      case 'pt':
        formQuestion.value = 'People or things?'
        break
      case 'id':
        formQuestion.value = 'Ideas or data?'
        break
      case 's':
        formQuestion.value = 'Are you sociable?'
        break
      case 'c':
        formQuestion.value = 'Do you like rules?'
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
      context.emit('submit', answer.value, props.type)
    }
    return { handleSubmit, formQuestion, answer, answerError }
  },
}
</script>

<style scoped>
button {
  border: 0;
  border-radius: 0;
  background: none;
  color: none;
  font-family: inherit;
  white-space: nowrap;
  text-decoration: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
button:hover {
  border: 0;
  border-radius: 0;
  background: none;
  color: none;
  font-family: inherit;
  white-space: nowrap;
  text-decoration: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
</style>
