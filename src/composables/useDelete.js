import { projectFirestore } from '../firebase/config'

const useDelete = async (id) => {
  console.log(id)
  try {
    await projectFirestore
      .collection('articles')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document ' + id + ' deleted')
      })
  } catch (error) {
    console.error('Error removing document: ', error)
  }
}

export default useDelete
