<template>
  <div class="no-articles" v-if="articles.length == 0">
    <p>
      You haven't made any articles yet!
      <router-link :to="{ name: 'Generate' }">Generate one now?</router-link>
    </p>
  </div>
  <div class="list">
    <div v-for="article in articles" :key="article.id">
      <div class="single" @click="handleClick(article.id)">
        <div class="square">
          <div class="icon">
            <FileDocument :size="100" fillColor="var(--off-primary)" />
          </div>
        </div>
        <div class="details">
          <h3>{{ article.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileDocument from 'vue3-material-design-icons/FileDocument.vue'
import FileDocumentOutline from 'vue3-material-design-icons/FileDocumentOutline.vue'
export default {
  props: ['articles'],
  emits: ['focused'],
  components: { FileDocument, FileDocumentOutline },
  setup(props, context) {
    const handleClick = (id) => {
      context.emit('focused', id)
    }
    console.log(props.articles.length)
    return { handleClick }
  },
}
</script>

<style scoped>
.no-articles {
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.no-articles p {
  padding: 20px;
  text-align: center;
}
.no-articles a {
  font-weight: 600;
}
.no-articles a:hover {
  opacity: 0.5;
  transition: 0.3s ease;
}
.list {
  padding: 10px 20px;
  display: flex;
  flex-wrap: wrap;
}
.single {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* padding: 15px; */
  border-radius: 10px;
  background: var(--off-bg2);
  margin: 16px 10px;
  transition: all ease 0.2s;
  border: solid 1px var(--background);
  max-width: 200px;
  height: 250px;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.04);
  transition: all ease 0.3s;
}
.single .square {
  height: 100%;
  width: 100%;
  background: var(--secondary);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}
.single .square .date {
  width: 100%;
  height: 0px;
  display: flex;
  justify-content: flex-end;
}
.single .square .date p {
  padding-top: 5px;
  padding-right: 8px;
  font-size: 14px;
  font-weight: bold;
  color: var(--off-primary);
}
.single .icon {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.single .details {
  padding: 5px 15px 15px 15px;
}
.single .details h3 {
  font-size: 20px;
  font-weight: 400;
  padding-top: 5px;
}
.single .details p {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  text-align: right;
}
</style>
