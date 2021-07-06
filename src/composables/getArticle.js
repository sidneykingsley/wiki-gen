import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getArticle = (id) => {
  const article = ref(null)
  const articleError = ref(null)

  const loadArticle = async () => {
    try {
      let res = await projectFirestore
        .collection('articles')
        .doc(id)
        .get()

      if (!res.exists) {
        throw Error('That post does not exist')
      }
      article.value = { ...res.data(), id: res.id }
    } catch (err) {
      articleError.value = err.message
      console.error(err)
    }
  }

  return { article, articleError, loadArticle }
}

export default getArticle
