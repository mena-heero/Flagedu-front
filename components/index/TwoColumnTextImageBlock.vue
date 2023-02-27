<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="news-wrapper">
        <div class="content">
          <div class="title">
            {{ data.title }}
          </div>
          <div class="description" v-html="data.description"></div>
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
        <div class="image">
          <img
            :src="HOST + data.image.original.src"
            :alt="data.image.original.alt"
          />
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
.news-wrapper {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  .content {
    height: 605px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: flex-end;
    .title {
      text-align: right;
      font-size: 36px;
      font-weight: 700;
      width: 80%;
    }
    .description {
      text-align: right;
      font-weight: 500;
      font-size: 16px;
      line-height: 32px;
    }
    .button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 16px 32px;
      gap: 10px;
      width: 206px;
      height: 54px;
      background: #01aeab;
      border-radius: 8px;
      a {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        color: #ffffff;
      }
    }
  }
  .image {
    height: 605px;
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
