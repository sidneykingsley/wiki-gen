<template>
  <DetailsForm
    @results="handleGenerate"
    v-if="!riasecCode"
    :userDoc="userDoc"
  />
  <LoadingScreen v-if="isGenerating" />
  <ArticlePreview
    :text="generatedText"
    :userDoc="userDoc"
    v-if="generatedText"
  />
</template>

<script>
import { ref } from '@vue/reactivity'
import DetailsForm from '@/components/DetailsForm.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import getUser from '@/composables/getUser'
import getUserDoc from '@/composables/getUserDoc'
import runGenerate from '@/composables/runGenerate'
import trim from '@/composables/trim'
export default {
  components: { DetailsForm, LoadingScreen, ArticlePreview },
  setup() {
    const { user } = getUser()
    const { userDoc, userDocError, load } = getUserDoc(user.value.uid)
    const { error, generateFun, isPending, resStr } = runGenerate()
    const generatedText = ref(null)
    const riasecCode = ref(null)
    const isGenerating = ref(false)
    load()
    const handleGenerate = async (code, length) => {
      //   riasecCode.value = code
      riasecCode.value = 'm2'
      // const rndInt = Math.floor(Math.random() * 1000) + 4500
      isGenerating.value = true
      const res = await generateFun(
        '(!!)Article(!/!)\n',
        '/models/wiki-' + riasecCode.value + '/',
        length
      )
      if (!error.value) {
        generatedText.value = trim(
          res.resStr,
          userDoc.value.firstName,
          userDoc.value.secondName
        ).trimmedText.value
        isGenerating.value = false
      } else {
        console.error(error)
      }
    }
    return {
      userDoc,
      handleGenerate,
      riasecCode,
      isGenerating,
      generatedText,
    }
  },
}
</script>

<style scoped></style>
