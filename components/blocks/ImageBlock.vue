<template>
  <div>
    <div class="image">
      <img
        :src="HOST + renderLocaleImage(data, 'image', $i18n.locale)"
        :alt="data.image.original.alt"
      />
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { renderLocaleImage } from "../../utils/utils";

@Component({
  name: "ImageBlock",
  components: {},
})
export default class ImageBlock extends Vue {
  @Prop() data;

  renderLocaleImage = renderLocaleImage;

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
    width: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 8px;
  }
}
</style>
