<template>
  <div>
    <div class="video-block">
      <div class="title">
        {{ renderLocaleField(data, "title", $i18n.locale) }}
      </div>
      <div class="video">
        <lite-youtube :videoid="data.youtube_video_id"></lite-youtube>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { renderLocaleField } from "../../utils/utils";

@Component({
  name: "VideoBlock",
  components: {},
})
export default class VideoBlock extends Vue {
  @Prop() data;
  renderLocaleField = renderLocaleField;

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
  text-align: center;
  font-size: 24px;
  font-weight: 600;
}
.video {
  height: 400px;
  width: 700px;
  @media (max-width: 1250px) {
  }
  @media (max-width: 950px) {
  }
  @media (max-width: 700px) {
    width: 100%;
    height: auto;
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 400px) {
  }
}
</style>
