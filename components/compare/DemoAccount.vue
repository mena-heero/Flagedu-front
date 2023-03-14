<template>
  <div class="company-content">
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company1">
        <div class="title">Demo Account</div>
        <div class="bool-data">
          {{ companyDetail.company1.demo_account == true ? "Yes" : "No" }}
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company2">
        <div class="title">Demo Account</div>
        <div class="bool-data">
          {{ companyDetail.company2.demo_account == true ? "Yes" : "No" }}
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company3">
        <div class="title">Demo Account</div>
        <div class="bool-data">
          {{ companyDetail.company3.demo_account == true ? "Yes" : "No" }}
        </div>
      </div>
    </div>
    <div class="company-content-item">
      <div class="overall-score" v-if="companyDetail.company4">
        <div class="title">Demo Account</div>
        <div class="bool-data">
          {{ companyDetail.company4.demo_account == true ? "Yes" : "No" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Watch, Prop } from "nuxt-property-decorator";
import { namespaced } from "~/utils/utils";
import {} from "../../utils/store/action.names";
import {} from "../../utils/store/getter.names";
import {} from "../../utils/store/namespace.names";

@Component({
  name: "DemoAccount",
  components: {},
})
export default class DemoAccount extends Vue {
  @Prop() companyDetail;

  get HOST() {
    return this.$config.HOST;
  }
}
</script>

<style scoped lang="scss">
.company-content-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  margin-top: 15px;
  align-items: center;
  .overall-score {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 2px;
    .title {
      font-size: 13px;
      font-weight: 600;
      text-align: center;
    }
    .bool-data {
      text-align: center;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
</style>
