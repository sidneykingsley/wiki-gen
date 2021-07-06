<template>
  <div class="form-container">
    <div class="mobile-form">
      <Chat
        @submit="useSubmit"
        :type="qType"
        :error="qError"
        :key="qKey"
        v-if="!submit"
      />
      <div class="modal" v-if="submit && props.userDoc">
        <div class="address">
          <h2>
            <span style="text-transform: capitalize">
              Ok {{ props.userDoc.firstName }}.
            </span>
            Click generate when you're ready.
          </h2>
        </div>
        <div class="advice">
          <p>
            Please stay on the loading page while your article is generated.
          </p>
        </div>
        <button @click="useGenerate">Generate</button>
      </div>
    </div>
  </div>
</template>

<script>
import Chat from '@/components/Chat.vue'
import { ref } from '@vue/reactivity'
import checkData from '@/assets/check.json'
import calculateRiasec from '@/composables/calculateRiasec'
import getUser from '@/composables/getUser'
export default {
  components: { Chat },
  props: ['userDoc'],
  emits: ['results'],
  setup(props, context) {
    const { user } = getUser()
    const qKey = ref(0)
    const qType = ref(0)
    const qError = ref(false)
    var riasecWeights = []
    const riasecCode = ref(null)
    const questions = ref([
      { type: 0, check1: 'p', check2: 't' },
      { type: 1, check1: 'i', check2: 'd' },
      { type: 2, check1: 's', check2: 'ns' },
      { type: 3, check1: 'c', check2: 'nc' },
    ])
    const submit = ref(true)
    const useSubmit = (a, type) => {
      var check1 = questions.value[qType.value].check1
      var check2 = questions.value[qType.value].check2
      if (checkData[check1].includes(a)) {
        riasecWeights[type] = check1
        qType.value += 1
        qError.value = false
      } else if (checkData[check2].includes(a)) {
        riasecWeights[type] = check2
        qType.value += 1
        qError.value = false
      } else {
        qError.value = true
      }
      qKey.value += 1
      if (qType.value == 4) {
        riasecCode.value = calculateRiasec(riasecWeights)
        submit.value = true
      }
    }
    const useGenerate = () => {
      context.emit('results', riasecCode)
    }
    return { props, useSubmit, qType, qKey, qError, submit, useGenerate }
  },
}
</script>

<style scoped>
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
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #faf;
  padding: 40px;
  border-radius: 20px;
  background: var(--off-bg2);
  box-shadow: var(--bg-shadow) 0px 5px 15px;
  text-align: center;
}
.modal .address {
  max-width: 400px;
}
.modal .advice {
  max-width: 400px;
}
.modal h3 {
  padding: 5px;
}
.modal p {
  padding: 20px;
  color: var(--off-primary);
  font-size: 16px;
}
.modal button {
  margin: 10px 0 10px 0;
}
</style>
