<template>
  <div>
    <VueTradingView :options="options" v-if="renderComponent" />
  </div>
</template>

<script>
import {
  Component,
  Vue,
  Getter,
  Action,
  Prop,
  Watch,
} from "nuxt-property-decorator";
import VueTradingView from "vue-trading-view";

@Component({
  name: "TradingViewChart",
  components: { VueTradingView },
})
export default class TradingViewChart extends Vue {
  @Prop() data;

  renderComponent = true;

  forceRerender() {
    this.renderComponent = false;

    this.$nextTick(() => {
      this.renderComponent = true;
    });
  }

  @Watch("data", { immediate: true })
  handleDataChange(val, oldVal) {
    this.options = {
      symbol: val,
      theme: "light",
      interval: 1,
      hide_top_toolbar: true,
      hide_legend: true,
      allow_symbol_change: false,
      style: 3,
    };
    this.forceRerender();
  }

  options = {};
}
</script>

<style scoped lang="scss">
::v-deep #vue-trading-view {
  div {
    height: 500px !important;
    width: 100% !important;
    @media (max-width: 1250px) {
      width: 100% !important;
      height: 400px !important;
      margin: none !important;
    }
    @media (max-width: 1076px) {
      width: 100% !important;
      height: 300px !important;
      margin: none !important;
    }
    @media (max-width: 960px) {
      width: 100% !important;
      height: 400px !important;
      margin: none !important;
    }
    @media (max-width: 700px) {
    }
    @media (max-width: 500px) {
    }
    @media (max-width: 400px) {
    }
  }
}
</style>
