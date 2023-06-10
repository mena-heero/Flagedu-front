<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <nuxt-link to="/companies">{{
          renderLocaleField(data, "title", $i18n.locale)
        }}</nuxt-link>
      </div>
      <div class="company-wrapper">
        <div
          v-for="(company, idx) in data.company"
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
import { renderLocaleField } from "../../utils/utils";
import SingleCompany from "../SingleCompany";

@Component({
  name: "CompanyBlock",
  components: { SingleCompany },
})
export default class CompanyBlock extends Vue {
  @Prop() data;

  renderLocaleField = renderLocaleField;

  get HOST() {
    return this.$config.HOST;
  }
}
</script>

<style scoped lang="scss">
.company-block-container {
  // background-color: $bg-primary;
  min-height: 500px;
  width: 100%;
  .company-container {
    width: 80%;
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 0 auto;
    min-height: 500px;
    @media (max-width: 1250px) {
      width: 95%;
      padding-bottom: 30px;
      padding-top: 30px;
    }
    .title {
      display: flex;
      a {
        width: 100%;
        font-size: 36px;
        font-weight: 700;
        // color: $linked-font-color;
        @media (max-width: 1250px) {
          font-size: 30px;
        }
      }
    }
  }
}
.company-wrapper {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  @media (max-width: 1450px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1250px) {
    margin-top: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 950px) {
    margin-top: 30px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 700px) {
    margin-top: 30px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 500px) {
    gap: 10px;
  }
  @media (max-width: 400px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .items {
    @media (max-width: 400px) {
    }
  }
}
</style>
