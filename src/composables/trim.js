import { ref } from '@vue/reactivity'
const trimmedText = ref(null)
const sqBra1 = /\[/g
const sqBra2 = /\]/g
const duplDel = /(\(\!\!\).*\(\!\/\!\))\n.*/g
const lastReg = /[^\w\s\]]?\s?.?([^\s]+)\s*$/g

const trim = (text, firstName, secondName) => {
  trimmedText.value = text
  trimmedText.value = trimmedText.value.replaceAll(
    'secondnameplaceholder',
    secondName
  )
  trimmedText.value = trimmedText.value.replaceAll(
    'firstnameplaceholder',
    firstName
  )
  trimmedText.value = trimmedText.value.replaceAll(sqBra1, '<sup>[')
  trimmedText.value = trimmedText.value.replaceAll(sqBra2, ']</sup>')
  trimmedText.value = trimmedText.value.replaceAll(duplDel, '')
  trimmedText.value = trimmedText.value.replaceAll(lastReg, '.')
  console.log(trimmedText)
  return { trimmedText }
}

export default trim
