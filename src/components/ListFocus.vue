<template>
  <div>
    <div
      class="article-container"
      v-if="article"
      :class="{ 'active-modal': tryDelete }"
    >
      <div class="article-icons">
        <div class="icon-container" v-if="!isMobile">
          <ArrowExpand
            @click="handleExpand"
            v-if="!props.expanded"
            class="icon"
          />
          <ArrowCollapse
            @click="handleExpand"
            v-if="props.expanded"
            class="icon"
          />
        </div>
        <div class="icon-container">
          <Close @click="handleClose" class="icon" />
        </div>
      </div>
      <div class="article">
        <h1>{{ article.title }}</h1>
        <div v-html="article.text" class="gen-text"></div>
        <div class="details">
          <p>Author: {{ article.firstName }} {{ article.secondName }}</p>
          <p>
            {{
              article.createdAt.toDate().toLocaleTimeString('en-GB', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
            &nbsp;|&nbsp;
            {{ article.createdAt.toDate().toLocaleDateString('en-GB') }}
          </p>
          <a
            class="delete"
            @click="deleteClicked"
            v-if="props.userId == article.uid"
          >
            Delete article
          </a>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="tryDelete">
        <div class="modal-overlay" @click="tryDelete = false"></div>
        <div class="modal-container">
          <div class="modal">
            <div class="icon-container">
              <Close
                class="icon"
                @click="tryDelete = false"
                title="Close modal"
              />
            </div>
            <form>
              <h3>Are you sure you want to permanently delete your article?</h3>
              <p>Article title: {{ article.title }}</p>
              <div class="buttons">
                <button
                  class="cancel"
                  @click="tryDelete = false"
                  title="Cancel delete"
                >
                  Cancel
                </button>
                <button
                  class="delete"
                  @click="handleDelete"
                  title="Delete article"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Close from 'vue3-material-design-icons/Close.vue'
import ArrowExpand from 'vue3-material-design-icons/ArrowExpand.vue'
import ArrowCollapse from 'vue3-material-design-icons/ArrowCollapse.vue'
import Delete from 'vue3-material-design-icons/Delete.vue'
import DeleteOutline from 'vue3-material-design-icons/DeleteOutline.vue'
import getArticle from '@/composables/getArticle'
import useDelete from '@/composables/useDelete'

export default {
  components: { Close, ArrowExpand, ArrowCollapse, Delete, DeleteOutline },
  props: ['article', 'expanded', 'userId', 'isMobile'],
  emits: ['close', 'expand', 'deleted'],
  setup(props, context) {
    const { article, articleError, loadArticle } = getArticle(props.article)
    loadArticle()
    if (props.isMobile) {
      console.log(props.isMobile)
      context.emit('expand')
    }
    const tryDelete = ref(false)
    const deleteClicked = () => {
      if (!props.expanded) {
        context.emit('expand')
      }
      tryDelete.value = true
    }
    const handleDelete = () => {
      useDelete(props.article)
      context.emit('expand')
      context.emit('close')
    }
    const handleClose = () => {
      context.emit('close')
    }
    const handleExpand = () => {
      context.emit('expand')
    }
    return {
      props,
      article,
      handleClose,
      handleExpand,
      tryDelete,
      deleteClicked,
      handleDelete,
    }
  },
}
</script>

<style scoped>
.article-container {
  background: var(--off-bg2);
}
.article-icons {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}
.icon-container {
  margin: 5px 2px;
}
.icon-container:hover {
  opacity: 0.5;
  transition: 0.3s ease;
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
.article .details p {
  color: var(--off-primary);
  font-size: 14px;
}
.article .details a {
  color: var(--off-primary);
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

.modal .buttons {
  display: flex;
}
.modal button {
  margin: 20px 7.5px 10px 7.5px;
}
</style>
