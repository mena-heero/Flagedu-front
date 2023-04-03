<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="news-wrapper">
        <div class="image">
          <img
            :src="HOST + data.image.original.src"
            :alt="data.image.original.alt"
          />
        </div>
        <div class="content">
          <div class="title">
            {{ data.title }}
          </div>
          <div class="description" v-html="data.description" dir="rtl"></div>
          <div class="button">
            <a
              v-if="data.link.link.type == 'link'"
              :href="data.link.link.link"
              >{{ data.link.label }}</a
            >
            <nuxt-link
              v-if="data.link.link.type == 'page'"
              :to="data.link.link.link"
              >{{ data.link.label }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import SingleCompany from "../SingleCompany";

@Component({
  name: "TwoColumnTextImageBlock",
  components: { SingleCompany },
})
export default class TwoColumnTextImageBlock extends Vue {
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
    @media (max-width: 1250px) {
      width: 95%;
      padding-bottom: 30px;
      padding-top: 30px;
    }
    .title {
      display: flex;
      // justify-content: flex-end;
      // align-items: flex-end;
      a {
        width: 100%;
        font-size: 36px;
        font-weight: 700;
        color: $linked-font-color;
        @media (max-width: 1250px) {
          font-size: 30px;
        }
      }
    }
  }
}
.news-wrapper {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 10px;
    margin-top: 10px;
  }
  .content {
    min-height: 605px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    @media (max-width: 700px) {
      height: auto;
    }

    .title {
      font-size: 36px;
      font-weight: 700;
      width: 80%;
      @media (max-width: 1250px) {
        font-size: 30px;
      }
      @media (max-width: 950px) {
        font-size: 24px;
      }
      @media (max-width: 400px) {
        width: 100%;
        font-size: 20px;
      }
    }
    .description {
      text-align: right;
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
      @media (max-width: 1250px) {
        font-size: 14px;
      }
      @media (max-width: 400px) {
        font-size: 14px;
        line-height: 25px;
      }
    }
    .button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;
      gap: 10px;
      width: 220px;
      height: 54px;
      background: #01aeab;
      border-radius: 8px;
      @media (max-width: 950px) {
        height: 45px;
        width: 200px;
      }
      a {
        font-weight: 700;
        font-size: 16px;
        line-height: 22px;
        color: #ffffff;
        @media (max-width: 1250px) {
          font-size: 14px;
        }
        @media (max-width: 950px) {
          font-size: 13px;
        }
      }
    }
  }
  .image {
    height: 605px;
    @media (max-width: 700px) {
      margin-top: 30px;
    }
    @media (max-width: 700px) {
      height: 300px;
    }
    img {
      flex-shrink: 0;
      -webkit-flex-shrink: 0;
      max-width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}
</style>
