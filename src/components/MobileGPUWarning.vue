<template>
  <div class="gpu-warning-container">
    <div class="gpu-warning">
      <h3 class="warning">Warning for Mobile users:</h3>
      <p class="message">
        As you are browsing on a mobile device, please be aware that your
        phone's GPU will most likely not be able to handle the load required by
        this machine learning model. While you will get results, they will most
        likely be incoherent.
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.gpu-warning-container {
  position: relative;
  z-index: 9;
  background: var(--off-bg2);
  width: 100%;
}
.gpu-warning {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 15px 20px;
}
.gpu-warning .warning {
  font-size: 18px;
  padding-bottom: 3px;
}
.gpu-warning .message {
  font-size: 15px;
}
</style>
