<template>
  <div class="list">
    <div v-for="playlist in playlists" :key="playlist.id">
      <div class="single">
        <h3>{{ playlist.title }}</h3>
        <p>{{ playlist.firstName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['playlists'],
}
</script>

<style scoped>
.list {
  padding: 10px 20px;
}
.single {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 10px;
  background: var(--background);
  margin: 16px 0;
  transition: all ease 0.2s;
  border: solid 1px var(--off-bg1);
  /* flex-direction: column;
  justify-content: center;
  align-items: flex-start; */
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.single h3 {
  font-size: 22px;
  font-weight: 200;
}
.single p {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.song-number {
  margin-left: auto;
}
</style>
