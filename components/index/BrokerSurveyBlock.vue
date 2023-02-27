<template>
  <div class="broker-survey-container" :style="bgImage">
    <div class="content">
      <h1>{{ data.title }}</h1>
      <h5>{{ data.subtitle }}</h5>
      <nuxt-link :to="data.learn_more_button_link">
        {{ data.learn_more_button_text }}
      </nuxt-link>
    </div>
    <div class="survey-btn">
      <nuxt-link :to="data.survey_button_link">
        {{ data.survey_button_text }}
        <i class="bi bi-speedometer2 speedometer"></i>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";

@Component({
  name: "BrokerSurveyBlock",
  components: {},
})
export default class BrokerSurveyBlock extends Vue {
  @Prop() data;

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
  .content {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    h1 {
      color: $primary-color;
      text-align: center;
      font-size: 40px;
      font-weight: 700;
      line-height: 60px;
    }
    h5 {
      color: $primary-color;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      width: 60%;
      line-height: 32px;
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
    }
  }
}
.survey-btn {
  position: absolute;
  bottom: 40px;
  right: 60px;
  a {
    height: 64px;
    width: 205px;
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
.speedometer {
  font-size: 20px;
}
</style>
