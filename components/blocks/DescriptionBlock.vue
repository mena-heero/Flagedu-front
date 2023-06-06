<template>
  <div>
    <div
      class="desc"
      :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'"
      v-html="renderLocaleField(data, 'desc', $i18n.locale)"
    ></div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { renderLocaleField } from "../../utils/utils";

@Component({
  name: "DescriptionBlock",
  components: {},
})
export default class DescriptionBlock extends Vue {
  @Prop() data;
  renderLocaleField = renderLocaleField;

  mounted() {}
}
</script>

<style lang="scss" scoped>
.desc {
  font-size: 18px;
}
</style>
