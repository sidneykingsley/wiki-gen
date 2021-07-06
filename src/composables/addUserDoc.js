import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const addUserDoc = (collection) => {
  const addUserDocError = ref(null)
  const addUserDocPending = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    addUserDocError.value = null
    addUserDocPending.value = true
    try {
      projectFirestore
        .collection(collection)
        .doc(doc.uid)
        .set(doc)
      addUserDocPending.value = false
    } catch (err) {
      console.error(err.message)
      addUserDocError.value = 'could not send the message'
      addUserDocPending.value = false
    }
  }

  return { addUserDocError, addDoc, addUserDocPending }
}

export default addUserDoc
