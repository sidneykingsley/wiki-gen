<template>
  <div class="list">
    <div v-for="article in articles" :key="article.id">
      <div class="single" @click="handleClick(article.id)">
        <div
          class="square home-square"
          :class="{ owned: article.uid == props.userId }"
        >
          <FileDocument :size="50" fillColor="var(--off-primary)" />
        </div>
        <div class="title">
          <h3>{{ article.title }}</h3>
          <p>{{ article.firstName }}</p>
        </div>
        <p>{{ article.createdAt.toDate().toLocaleDateString('en-GB') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FileDocument from 'vue3-material-design-icons/FileDocument.vue'
import FileDocumentOutline from 'vue3-material-design-icons/FileDocumentOutline.vue'
export default {
  props: ['articles', 'userId'],
  emits: ['focused'],
  components: { FileDocument, FileDocumentOutline },
  setup(props, context) {
    const handleClick = (id) => {
      context.emit('focused', id)
    }

    return { handleClick, props }
  },
}
</script>

<style scoped>
.list {
  padding: 10px 20px;
}
.single {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: var(--off-bg2);
  margin: 16px 10px;
  transition: all ease 0.2s;
  border: solid 1px var(--background);
  padding-right: 20px;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.3s;
}
.single .square {
  height: 80px;
  width: 100px;
  background: var(--off-bg3);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.owned {
  background: var(--secondary) !important;
}
.single .title {
  width: 100%;
  height: 100%;
  padding: 15px 20px;
}
.single h3 {
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 3px;
}
.single p {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}
</style>
