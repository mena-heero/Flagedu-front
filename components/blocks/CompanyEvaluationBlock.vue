<template>
  <div>
    <div class="evaluation-block">
      <div class="title">{{ $t("company_evaluation.title") }}</div>
      <div class="subtitle">
        {{ $t("company_evaluation.overall_evaluation") }}:
        {{ pageData.overal_evaluation }} / 5
      </div>
      <div class="items">
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.regulation") }} ({{
              pageData.regulation_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.regulation_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.deposit_withdraw") }} ({{
              pageData.deposit_withdraw_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.deposit_withdraw_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.commission") }} ({{
              pageData.commissions_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.commissions_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.assets") }} ({{
              pageData.assets_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.assets_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.trading_platform") }} ({{
              pageData.trading_platform_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.trading_platform_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.research_development") }} ({{
              pageData.research_development_rating
            }}
            / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.research_development_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.customer_service") }} ({{
              pageData.customer_service_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.customer_service_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.mobile_app_trading") }} ({{
              pageData.mobile_app_trading_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.mobile_app_trading_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.learning") }} ({{
              pageData.learning_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.learning_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.experience_with_broker") }} ({{
              pageData.experience_with_broker_rating
            }}
            / 10)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.experience_with_broker_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.trading_tools") }} ({{
              pageData.trading_tools_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.trading_tools_rating"
              max="5"
            ></progress>
          </div>
        </div>
        <div class="item">
          <div class="title">
            {{ $t("company_evaluation.website") }} ({{
              pageData.website_rating
            }}
            / 5)
          </div>
          <div class="progress-bar">
            <progress
              id="file"
              :value="pageData.website_rating"
              max="5"
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
  width: 100% !important;
  font-size: 26px;
  font-weight: 600;
}
.subtitle {
  font-size: 18px;
  font-weight: 500;
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
