<template>
  <div class="form-container">
    <div class="mobile-form">
      <Chat @submit="useSubmit" :type="qType" :error="qError" :key="qKey" />
    </div>
  </div>
</template>

<script>
import Chat from '@/components/Chat.vue'
import { ref } from '@vue/reactivity'
import checkData from '@/assets/check.json'
import calculateRiasec from '@/composables/calculateRiasec'
export default {
  components: { Chat },
  setup() {
    const riasecWeights = ref({})
    const qError = ref(false)
    const qType = ref('pt')
    const qKey = ref(0)
    const riasecCode = ref(null)
    const useSubmit = (a, type) => {
      switch (qType.value) {
        case 'pt':
          if (checkData.p.includes(a)) {
            riasecWeights.value[type] = 'p'
          } else if (checkData.t.includes(a)) {
            riasecWeights.value[type] = 't'
          } else {
            qType.value = 'pt'
            qError.value = true
            qKey.value += 1
            break
          }
          qType.value = 'id'
          qKey.value += 1
          qError.value = false
          break
        case 'id':
          if (checkData.i.includes(a)) {
            riasecWeights.value[type] = 'i'
          } else if (checkData.d.includes(a)) {
            riasecWeights.value[type] = 'd'
          } else {
            qType.value = 'id'
            qError.value = true
            qKey.value += 1
            break
          }
          qType.value = 's'
          qKey.value += 1
          qError.value = false
          break
        case 's':
          if (checkData.s.includes(a)) {
            riasecWeights.value[type] = 's'
          } else if (checkData.ns.includes(a)) {
            riasecWeights.value[type] = 'ns'
          } else {
            qType.value = 's'
            qError.value = true
            qKey.value += 1
            break
          }
          qType.value = 'c'
          qKey.value += 1
          qError.value = false
          break
        case 'c':
          if (checkData.c.includes(a)) {
            riasecWeights.value[type] = 'c'
          } else if (checkData.nc.includes(a)) {
            riasecWeights.value[type] = 'nc'
          } else {
            qType.value = 'c'
            qError.value = true
            qKey.value += 1
            break
          }
          riasecCode.value = calculateRiasec(riasecWeights.value)
          console.log(riasecCode.value.code)
          break
        default:
          break
      }
    }
    return { useSubmit, qType, qKey, qError, riasecWeights }
  },
}
</script>

<style>
.mobile-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.mobile-form form {
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mobile-form form .submit {
  padding-left: 20px;
}
</style>
