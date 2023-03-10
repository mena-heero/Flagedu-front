<template>
  <div>
    <div class="video-block">
      <div class="title">{{ data.title }}</div>
      <div class="video">
        <lite-youtube :videoid="data.youtube_video_id"></lite-youtube>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "VideoBlock",
  components: {},
})
export default class VideoBlock extends Vue {
  @Prop() data;

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.video-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
  margin-bottom: 30px;
}
.title {
  font-size: 24px;
  font-weight: 600;
}
.video {
  height: 400px;
  width: 700px;
}
</style>
