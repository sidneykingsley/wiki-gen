<template>
  <div class="form-container" :class="{ 'active-modal': submit }">
    <div class="details-form">
      <Chat @submit="handleSubmit" :type="qType" :error="qError" :key="qKey" />
    </div>
  </div>
  <div class="modal-container" v-if="submit && props.userDoc">
    <div class="modal">
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
      <div class="range">
        <label>Article length:</label>
        <div class="range-slider">
          <p class="minus">-</p>
          <input type="range" min="1000" max="7500" v-model="length" required />
          <p class="plus">+</p>
        </div>
        <p class="length">{{ length }} characters</p>
      </div>
      <button @click="handleGenerate">Generate</button>
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
  props: ['userDoc'],
  emits: ['results'],
  setup(props, context) {
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
    const length = ref(4250)
    const handleSubmit = (a, type) => {
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
    const handleGenerate = () => {
      context.emit('results', riasecCode.value, length.value)
    }
    return {
      props,
      handleSubmit,
      qType,
      qKey,
      qError,
      submit,
      length,
      handleGenerate,
    }
  },
}
</script>

<style scoped>
.details-form {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px;
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
.modal .range {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.modal .range-slider {
  width: 100%;
  display: flex;
}
.modal .range label {
  padding: 5px;
}
.modal .range p {
  padding: 5px;
  margin: 0;
  align-self: center;
}
.modal .range-slider p.minus {
  margin: 0 5px 0 0;
}
.modal .range-slider p.plus {
  margin: 0 0 0 5px;
}
.modal button {
  margin: 30px 0 5px 0;
}
</style>
