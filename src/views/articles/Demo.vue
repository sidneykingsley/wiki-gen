<template>
  <div class="gen-push">
    <p>Generate your own Wikipedia page.</p>
    <button @click="handleGenerate" v-if="!isPending">
      Generate
    </button>
    <button @click="handleGenerate" v-else disabled>
      Loading
    </button>
  </div>
  <h1 class="section-heading">Demo Article</h1>
  <p class="tag-text">
    From WikiGen, the free AI crystal ball
  </p>
  <div class="gen-text" v-html="generatedText"></div>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser'
import runGenerate from '@/composables/runGenerate'
import trim from '@/composables/trim'
export default {
  setup() {
    const { user } = getUser()
    const { error, generateFun, isPending, resStr } = runGenerate()
    const generatedText = ref(null)
    const handleGenerate = async () => {
      generatedText.value = 'Loading...'
      const rndInt = Math.floor(Math.random() * 1000) + 1500
      const res = await generateFun(
        '(!!)Article(!/!)\n',
        '/models/old/wiki-o3/',
        rndInt
      )
      if (!error.value) {
        generatedText.value = trim(
          res.resStr,
          'Demo',
          'Person'
        ).trimmedText.value
      } else {
        console.error(error)
      }
    }
    return { handleGenerate, isPending, generatedText }
  },
}
</script>

<style scoped>
.gen-push {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
  height: 65px;
  justify-content: space-between;
  background: var(--off-bg2);
}
.section-heading {
  font-family: LL-d, 'Linux Libertine', 'Georgia', 'Times', serif;
  font-size: 32px;
  border-bottom: 1px solid #a2a9b1;
  line-height: 1.4;
  margin: 10px 30px 5px 30px;
}
.tag-text {
  line-height: 1.6;
  font-size: 13px;
  margin: 0px 30px 10px 30px;
  line-height: 1.5;
}
.gen-text {
  white-space: pre-wrap;
  margin: 0 30px;
  font-size: 15px;
  font-family: sans-serif;
  line-height: 1.6;
  padding-bottom: 50px;
}
.gen-text h2 {
  font-family: LL-d, 'Georgia', 'Times', serif;
  font-size: 24px;
  border-bottom: 1px solid #a2a9b1;
  margin-top: 15px;
  margin-bottom: -15px;
  text-transform: lowercase;
  line-height: 1.3;
}
.gen-text h2::first-letter {
  text-transform: uppercase;
}
.gen-text sup {
  color: #0645ad;
}
</style>
