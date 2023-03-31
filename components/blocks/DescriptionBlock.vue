<template>
  <div>
    <div class="desc" dir="rtl" v-html="data.desc"></div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "DescriptionBlock",
  components: {},
})
export default class DescriptionBlock extends Vue {
  @Prop() data;

  mounted() {}
}
</script>

<style lang="scss" scoped>
.desc {
  font-size: 18px;
}
</style>
