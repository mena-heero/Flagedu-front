<template>
  <div>
    <div class="evaluation-block">
      <div class="title">Company Evaluation</div>
      <div class="subtitle">
        Overall Evaluation: {{ pageData.overal_evaluation }} / 10
      </div>
      <div class="items">
        <div class="item">
          <div class="title">
            Regulation ({{ pageData.regulation_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.regulation_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Deposit / Withdraw ({{ pageData.deposit_withdraw_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.deposit_withdraw_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Commission ({{ pageData.commissions_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.commissions_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">Assets ({{ pageData.assets_rating }} / 10)</div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.assets_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Trading Platform ({{ pageData.trading_platform_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.trading_platform_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Research & Development ({{ pageData.research_development_rating }} /
            10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.research_development_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Customer Service ({{ pageData.customer_service_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.customer_service_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Mobile App Trading ({{ pageData.mobile_app_trading_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.mobile_app_trading_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Learning ({{ pageData.learning_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.learning_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Experience With Broker ({{ pageData.experience_with_broker_rating }}
            / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.experience_with_broker_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            Trading Tools ({{ pageData.trading_tools_rating }} / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.trading_tools_rating"
              max="10"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">Website ({{ pageData.website_rating }} / 10)</div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.website_rating"
              max="10"
            ></progress>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
  name: "CompanyEvaluationBlock",
  components: {},
})
export default class CompanyEvaluationBlock extends Vue {
  @Prop() pageData;

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.evaluation-block {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}
.title {
  width: 100%;
  font-size: 26px;
  font-weight: 600;
  text-align: right;
}
.subtitle {
  font-size: 18px;
  font-weight: 500;
  text-align: right;
}
.items {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  @media (max-width: 850px) {
    grid-template-columns: 1fr 1fr;
  }
}
.item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title {
    font-size: 14px;
    font-weight: 600;
    @media (max-width: 500px) {
      font-size: 12px;
    }
    @media (max-width: 400px) {
      font-size: 10px;
    }
  }
  .progress-bar {
    progress {
      width: 90%;
      height: 18px;
    }
  }
}
</style>
