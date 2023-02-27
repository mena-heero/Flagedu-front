<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <a href="/">{{ data.title }}</a>
      </div>
      <div class="news-wrapper">
        <a
          href="#"
          class="item"
          v-for="(article, idx) in data.articles"
          :key="'articles_' + idx"
        >
          <div class="image">
            <img
              :src="HOST + article.thumbnail.src"
              :alt="article.thumbnail.alt"
            />
          </div>
          <div class="content">
            <div class="pub-date">
              {{ $dayjs(article.publish_date).format("DD MMMM, YYYY") }}
              <i class="bi bi-clock clock-icon"></i>
            </div>
            <div class="title">
              {{ article.title }}
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import SingleCompany from "../SingleCompany";

@Component({
  name: "ArticleBlock",
  components: { SingleCompany },
})
export default class ArticleBlock extends Vue {
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
  grid-template-columns: repeat(5, 1fr);
  gap: 30px;
  .item {
    height: 490px;
    .image {
      height: 372px;
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
    .content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
      .title {
        color: $linked-font-color;
        font-size: 18px;
        font-weight: 600;
        text-align: right;
        height: 54px;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
    }
  }
}

.pub-date {
  color: #717171;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
}
.clock-icon {
  font-size: 14px;
  color: #717171;
  font-weight: 500;
}
</style>
