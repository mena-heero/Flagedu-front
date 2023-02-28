<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <nuxt-link to="/companies">{{ data.title }}</nuxt-link>
      </div>
      <div class="company-wrapper">
        <div
          v-for="(company, idx) in data.companies"
          :key="'company_' + idx"
          class="items"
        >
          <single-company :data="company" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import SingleCompany from "../SingleCompany";

@Component({
  name: "CompanyBlock",
  components: { SingleCompany },
})
export default class CompanyBlock extends Vue {
  @Prop() data;

  get HOST() {
    return this.$config.HOST;
  }
}
</script>

<style scoped lang="scss">
.company-block-container {
  background-color: $bg-primary;
  min-height: 500px;
  width: 100%;
  .company-container {
    width: 80%;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 0 auto;
    min-height: 500px;
    .title {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      a {
        width: 100%;
        text-align: right;
        font-size: 36px;
        font-weight: 700;
        color: $linked-font-color;
      }
    }
  }
}
.company-wrapper {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
</style>
