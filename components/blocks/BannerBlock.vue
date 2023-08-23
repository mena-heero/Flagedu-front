<template>
  <div>
    <a :href="data.link.link" target="_blank" class="image">
      <img
        :src="HOST + renderLocaleImage(data, 'image', $i18n.locale)"
        :alt="data.image.original.alt"
      />
    </a>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { renderLocaleImage } from "../../utils/utils";

@Component({
  name: "BannerBlock",
  components: {},
})
export default class BannerBlock extends Vue {
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
