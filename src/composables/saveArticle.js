import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const saveArticle = (collection) => {
  const articleError = ref(null)
  const articlePending = ref(false)

  // add a new document
  const addArticle = async (doc) => {
    articleError.value = null
    articlePending.value = true
    try {
      projectFirestore.collection(collection).add(doc)
      articlePending.value = false
    } catch (err) {
      console.error(err.message)
      articleError.value = 'could not send the message'
      articlePending.value = false
    }
  }

  return { articleError, addArticle, articlePending }
}

export default saveArticle
