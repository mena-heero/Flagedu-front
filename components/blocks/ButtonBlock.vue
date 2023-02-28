<template>
  <div>
    <div class="button">
      <a :href="data.link.link">{{ data.label }}</a>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "ButtonBlock",
  components: {},
})
export default class ButtonBlock extends Vue {
  @Prop() data;

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  a {
    height: 64px;
    min-width: 205px;
    background-color: $primary-btn-color;
    color: $primary-color;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
  }
}
</style>
