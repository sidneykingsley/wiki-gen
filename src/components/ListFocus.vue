<template>
  <div class="article-container">
    <div class="article-icons">
      <div class="expand-icon">
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
      <div class="close-icon">
        <Close @click="handleClose" v-if="!props.expanded" class="icon" />
      </div>
    </div>
    <div class="article" v-if="article">
      <h1>{{ article.title }}</h1>
      <div v-html="article.text" class="gen-text"></div>
      <div class="details">
        <p>Author: {{ article.firstName }} {{ article.secondName }}</p>
        <p>
          Date:
          {{ article.createdAt.toDate().toLocaleDateString('en-GB') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Close from 'vue3-material-design-icons/Close.vue'
import ArrowExpand from 'vue3-material-design-icons/ArrowExpand.vue'
import ArrowCollapse from 'vue3-material-design-icons/ArrowCollapse.vue'
import getArticle from '@/composables/getArticle'
export default {
  components: { Close, ArrowExpand, ArrowCollapse },
  props: ['article', 'expanded'],
  emits: ['close', 'expand'],
  setup(props, context) {
    const { article, articleError, loadArticle } = getArticle(props.article)
    loadArticle()
    const handleClose = () => {
      context.emit('close')
    }
    const handleExpand = () => {
      context.emit('expand')
    }
    return { props, article, handleClose, handleExpand }
  },
}
</script>

<style scoped>
.article-container {
  background: var(--off-bg2);
  height: 100%;
}
.article-icons {
  display: flex;
  justify-content: flex-end;
  padding: 5px;
}
.expand-icon,
.close-icon {
  margin: 5px 2px;
}
.expand-icon:hover,
.close-icon:hover {
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
</style>
