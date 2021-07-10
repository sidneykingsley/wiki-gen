<template>
  <div class="home">
    <transition name="slide-fade">
      <div
        class="list-container"
        :class="{ noradius: !articleId }"
        v-if="!expanded"
      >
        <div v-if="error" class="error">Could not fetch the data.</div>
        <div v-if="documents">
          <MyArticlesList
            :articles="documents"
            @focused="handleFocus"
            :key="articleKey"
          />
        </div>
      </div>
    </transition>
    <div class="focus" v-if="articleId">
      <transition name="fade">
        <ListFocus
          :key="articleId"
          :article="articleId"
          :userId="user.uid"
          :expanded="expanded"
          @close="handleClose"
          @expand="handleExpand"
          @deleted="handleDelete"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import MyArticlesList from '../components/MyArticlesList.vue'
import ListFocus from '../components/ListFocus.vue'
import getCollection from '../composables/getCollection'
import { ref } from '@vue/reactivity'
import getUser from '../composables/getUser'

export default {
  name: 'Home',
  components: { MyArticlesList, ListFocus },
  setup() {
    const { user } = getUser()
    const { error, documents } = getCollection('articles', [
      'uid',
      '==',
      user.value.uid,
    ])
    console.log(documents)
    const articleKey = ref(0)
    const articleId = ref(null)
    const expanded = ref(false)
    const handleFocus = (id) => {
      articleId.value = id
    }
    const handleClose = () => {
      articleId.value = null
    }
    const handleExpand = () => {
      expanded.value = !expanded.value
    }
    const handleDelete = () => {
      console.log('Delete emitted function ran')
      articleKey.value += 1
    }
    return {
      user,
      error,
      documents,
      handleFocus,
      articleKey,
      articleId,
      handleClose,
      handleExpand,
      handleDelete,
      expanded,
    }
  },
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  background: var(--off-bg2);
}
.list-container {
  width: 100%;
  height: 100%;
  border-radius: 0 20px 0px 0;
  background: var(--background);
  box-shadow: var(--bg-shadow) 0px 5px 15px;
  z-index: 2;
}
.noradius {
  border-radius: 0;
  margin-right: 0;
}
.arrow-container {
  display: flex;
  align-items: center;
}
.arrow-left {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-right: 25px solid var(--off-bg2);
}
.focus {
  /* display: flex;
  justify-content: center;
  align-items: center;
  background: var(--off-bg2); */
  width: 100%;
  z-index: 1;
}
</style>
