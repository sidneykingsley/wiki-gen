import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getUserDoc = (id) => {
  const userDoc = ref(null)
  const userDocError = ref(null)

  const load = async () => {
    try {
      let res = await projectFirestore
        .collection('users')
        .doc(id)
        .get()

      if (!res.exists) {
        throw Error('That post does not exist')
      }
      userDoc.value = { ...res.data(), id: res.id }
    } catch (err) {
      userDocError.value = err.message
    }
  }

  return { userDoc, userDocError, load }
}

export default getUserDoc
