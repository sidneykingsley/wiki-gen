import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const addUserDoc = (collection) => {
  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await projectFirestore
        .collection(collection)
        .doc(doc.uid)
        .set(doc)
      isPending.value = false
      return res
    } catch (err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }

  return { error, addDoc, isPending }
}

export default addUserDoc
