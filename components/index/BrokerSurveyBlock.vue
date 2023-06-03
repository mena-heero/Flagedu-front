<template>
  <div class="broker-survey-container" :style="bgImage">
    <div class="content">
      <h1>{{ renderLocaleField(data, "title", $i18n.locale) }}</h1>
      <h5>{{ renderLocaleField(data, "subtitle", $i18n.locale) }}</h5>
      <nuxt-link :to="data.learn_more_button_link">
        {{ renderLocaleField(data, "learn_more_button_text", $i18n.locale) }}
      </nuxt-link>
    </div>
    <div class="survey-btn">
      <nuxt-link :to="data.survey_button_link">
        {{ renderLocaleField(data, "survey_button_text", $i18n.locale) }}
        <i class="bi bi-speedometer2 speedometer"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import { renderLocaleField } from "../../utils/utils";

@Component({
  name: "BrokerSurveyBlock",
  components: {},
})
export default class BrokerSurveyBlock extends Vue {
  @Prop() data;
  renderLocaleField = renderLocaleField;

  get HOST() {
    return this.$config.HOST;
  }

  get bgImage() {
    return {
      backgroundImage: `url(${this.HOST + this.data.image.original.src})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
  }
}
</script>

<style scoped lang="scss">
.broker-survey-container {
  margin-top: 50px;
  height: 640px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 500px) {
    margin-top: 30px;
  }
  .content {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    @media (max-width: 1250px) {
      width: 90%;
    }
    @media (max-width: 550px) {
      width: 95%;
    }
    h1 {
      color: $primary-color;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      line-height: 60px;
      @media (max-width: 1250px) {
        font-size: 34px;
      }
      @media (max-width: 500px) {
        line-height: 40px;
      }
      @media (max-width: 500px) {
        font-size: 20px;
        line-height: 30px;
      }
    }
    h5 {
      color: $primary-color;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      width: 60%;
      line-height: 32px;
      @media (max-width: 550px) {
        width: 90%;
      }
      @media (max-width: 500px) {
        line-height: 40px;
        line-height: 25px;
      }
    }
    a {
      height: 70px;
      width: 164px;
      background-color: $primary-btn-color;
      color: $primary-color;
      font-size: 18px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      @media (max-width: 1250px) {
        height: 50px;
        width: 120px;
        font-size: 14px;
      }
    }
  }
}
.survey-btn {
  position: absolute;
  bottom: 40px;
  right: 60px;
  @media (max-width: 550px) {
    bottom: 10px;
    right: 20px;
  }
  a {
    height: 64px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: $primary-btn-color;
    color: $primary-color;
    font-size: 18px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    @media (max-width: 1250px) {
      height: 50px;
      font-size: 14px;
    }
  }
}
.speedometer {
  font-size: 20px;
}
</style>
