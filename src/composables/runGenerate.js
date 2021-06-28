import { ref } from '@vue/reactivity'

const error = ref(null)
const isPending = ref(false)
const isLoaded = ref(false)
const resStr = ref(null)

const generateFun = async (seed, ref, len) => {
  error.value = null
  isPending.value = true
  const rnn = ml5.charRNN(ref, () => {
    console.log('Model loaded.')
    isLoaded.value = true
  })
  const res = await rnn.generate({
    seed: seed,
    length: len,
    temperature: 0.5,
  })
  console.log(res.sample)
  const resStr = res.sample
  error.value = null
  isPending.value = false
  return { error, resStr, isPending }
}

const runGenerate = () => {
  return { error, generateFun, isPending, resStr }
}

export default runGenerate
