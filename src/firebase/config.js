import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBaLXo-6H3iExWbgKb0r-sI62ArUKV9iwY',
  authDomain: 'wiki-gen-bb568.firebaseapp.com',
  projectId: 'wiki-gen-bb568',
  storageBucket: 'wiki-gen-bb568.appspot.com',
  messagingSenderId: '327735001864',
  appId: '1:327735001864:web:d5958655030606eb01a2bd',
}

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }
