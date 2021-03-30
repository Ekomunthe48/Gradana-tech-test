<template>
    <div class="camera text-center card p-1 shadow-lg">
        <video ref="video" class="w-100 "/>
        <div class="d-flex justify-content-center mt-1 button">
            <button class="btn btn-primary ml-1"  v-if="isPlay" @click="closeVideo">Pause</button>
            <button class="btn btn-primary ml-1"  v-else @click="playVideo">Play</button>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      isPlay: true
    }
  },
  methods: {
    closeVideo: function () {
      this.$refs.video.pause()
      this.isPlay = false
    },
    playVideo: function () {
      this.$refs.video.play()
      this.isPlay = true
    }
  },
  mounted () {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        this.$refs.video.srcObject = mediaStream
        this.$refs.video.play()
      })
      .catch(error => console.error('getUserMedia() error:', error))
  }
}
</script>

<style scoped>
    .camera {
        width: 320px;
        height: 240px;
    }
    .button {
      z-index:10;
      position: absolute;
    }
</style>
