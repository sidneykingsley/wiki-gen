<template>
  <div class="loading">
    <div id="canvas"></div>
    <div class="text">Generating<span>...</span></div>
    <div class="sub-text">This might take a while. Please stay on the tab.</div>
  </div>
</template>

<script>
import P5 from 'p5'

export default {
  props: ['delay', 'userDoc'],
  data() {
    return {
      results: false,
      timer: null,
      reactionTime: 0,
    }
  },
  mounted() {
    let themeValue = 0
    console.log(this)
    if (!this.userDoc.theme) {
      themeValue = 0
    } else {
      if (this.userDoc.theme == 'darkMode') {
        themeValue = 255
      } else {
        themeValue = 0
      }
    }
    const spacing = -15
    const rectW = 2.5
    const rectH = 10
    var rotateVal = 0

    const script = (p5) => {
      p5.setup = () => {
        p5.createCanvas(50, 50)

        p5.rectMode(p5.CENTER)
      }
      p5.draw = () => {
        p5.textSize(32)
        p5.angleMode(p5.DEGREES)
        p5.clear()
        p5.translate(50 / 2, 50 / 2)
        p5.noStroke()
        p5.rotate(rotateVal)
        p5.fill(themeValue, themeValue, themeValue, 255)
        p5.rect(0, spacing, rectW, rectH, 10, 10, 10, 10)
        if (p5.frameCount % 5 === 0) {
          rotateVal += 30
        }
        for (var i = 2; i < 13; i++) {
          p5.rotate(-30)
          p5.fill(themeValue, themeValue, themeValue, 255 - 21.5 * i)
          p5.rect(0, spacing, rectW, rectH, 10, 10, 10, 10)
        }
      }
    }
    setTimeout(() => {
      this.$emit('end')
    }, this.delay)
    const p5canvas = new P5(script, 'canvas')
  },
}
</script>

<style scoped>
.loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.loading .text {
  padding-top: 15px;
}
.loading .sub-text {
  padding-top: 7.5px;
  color: var(--off-primary);
  font-size: 13.5px;
  background: linear-gradient(
    to right,
    var(--off-primary) 0,
    var(--primary-bold) 10%,
    var(--off-primary) 20%
  );
  background-position: 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: generating-shine 30s infinite linear;
  animation-fill-mode: forwards;
  -webkit-text-size-adjust: none;
}
</style>
