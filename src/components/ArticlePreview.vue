<template>
  <div class="preview-container">
    <div class="preview" :class="{ 'active-modal': trySave }">
      <div class="icons">
        <div class="save-container">
          <Save
            title="Save article"
            @click="trySave = true"
            fillColor="var(--background)"
          />
          <p class="save-label">Save article</p>
        </div>
      </div>
      <div class="article">
        <h1>Generated Article:</h1>
        <p v-html="props.text" class="gen-text"></p>
        <div class="details">
          <a class="delete" @click="handleDiscard">
            Discard article
          </a>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="trySave">
        <div class="modal-overlay" @click="trySave = false"></div>
        <div class="modal-container">
          <div class="modal">
            <div class="icon-container">
              <Close class="icon" @click="trySave = false" />
            </div>
            <form @submit.prevent="handleSave">
              <h3>Give your article a title</h3>
              <input
                type="text"
                placeholder="Title"
                v-model="title"
                v-focus
                maxlength="30"
              />
              <button>Save</button>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Close from 'vue3-material-design-icons/Close.vue'
import Save from 'vue3-material-design-icons/ContentSave.vue'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { timestamp } from '@/firebase/config'
import saveArticle from '@/composables/saveArticle'
export default {
  components: { Save, Close },
  props: ['text', 'userDoc'],
  setup(props) {
    const router = useRouter()
    const { articleError, addArticle } = saveArticle('articles')
    const trySave = ref(false)
    const title = ref(null)
    const handleSave = () => {
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
    const handleDiscard = () => {
      router.push({ name: 'Home' })
    }
    return { props, handleSave, trySave, title, handleDiscard }
  },
}
</script>

<style scoped>
.preview-container {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
}
.preview {
  max-width: 900px;
  padding: 30px;
  z-index: 0;
  background: var(--contrast1);
  color: var(--contrast2);
  box-shadow: var(--bg-shadow) 0px 5px 15px;
}
.preview .icons {
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  padding-bottom: 10px;
}
.icons .save-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.preview .save-label {
  color: var(--contrast2);
  font-size: 14px;
}
.preview .article >>> p,
.preview .article >>> h1,
.preview .article >>> h2 {
  color: var(--contrast2);
}
.article >>> sup {
  color: var(--links);
}

.article {
  padding: 0px 30px 30px 30px;
  display: flex;
  flex-direction: column;
}
.article h1 {
  font-family: LL-d, 'Linux Libertine', 'Georgia', 'Times', serif;
  font-size: 32px;
  border-bottom: 1px solid #a2a9b1;
  line-height: 1.4;
  margin: 10px 0 5px 0;
}
.article .gen-text {
  white-space: pre-wrap;
  font-size: 15px;
  font-family: sans-serif;
  line-height: 1.6;
  padding-bottom: 50px;
}
.article .gen-text >>> h2 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  font-size: 24px;
  border-bottom: 1px solid #a2a9b1;
  margin-top: 15px;
  margin-bottom: -15px;
  text-transform: lowercase;
  line-height: 1.3;
}
.article .gen-text >>> h2::first-letter {
  text-transform: uppercase;
}
.article .gen-text >>> sup {
  color: var(--links);
}
.article .details {
  text-align: center;
  line-height: 22px;
}
.article .details p,
.article .details a {
  color: var(--contrast2);
  font-size: 14px;
}
.article .details .delete {
  margin-top: 5px;
  color: var(--warning);
}
.article .details .delete:hover {
  text-decoration: underline;
  cursor: pointer;
}
.article .details .hint {
  margin-top: 5px;
}
.article .details .hint:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
