<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <nuxt-link to="/articles"> <i class="bi bi-blockquote-left"></i> {{ data.title }}</nuxt-link>
      </div>
      <div class="news-wrapper">
        <nuxt-link
          :to="article.html_url"
          class="item"
          v-for="(article, idx) in data.articles"
          :key="'articles_' + idx"
        >
        <div class="bg-light shadow-sm p-2  mb-2 image">
          <div class="image ">
            <img
              :src="
                HOST +
                renderLocaleImage(article, 'thumbnail', $i18n.locale, true)
              "
              :alt="article.thumbnail.alt"
            />
          
          <div class="content ">
            <div class="">
              <i class="bi bi-clock clock-icon"></i>
              {{ $dayjs(article.publish_date).format("DD MMMM, YYYY") }}
            </div>
            </div>
            <div class="title">
              {{ article.title }}
            </div>
          </div>
        </div>

        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import { renderLocaleImage } from "../../utils/utils";
import SingleCompany from "../SingleCompany";

@Component({
  name: "ArticleBlock",
  components: { SingleCompany },
})
export default class ArticleBlock extends Vue {
  @Prop() data;

  renderLocaleImage = renderLocaleImage;

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
.news-wrapper {
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1250px) {
    margin-top: 30px;
    grid-template-columns: repeat(3, 1fr);
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
  }
  .item {
    height: 270px;
    @media (max-width: 500px) {
      height: auto;
    }
    .image {
      
      border-radius: 8px;
      img {
        // flex-shrink: 0;
        // -webkit-flex-shrink: 0;
        max-width: 100%;
        height: 100%;
        // -o-object-fit: cover;
        // object-fit: cover;
       
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    
      .title {
        // color: $linked-font-color;
        font-size: 18px;
        font-weight: 600;
        height: 54px;
        overflow: hidden;
        display: flex;
        align-items: center;
        @media (max-width: 1450px) {
          font-size: 14px;
        }
      }
    }
  }
}

.pub-date {
  color: #717171;
  font-size: 14px;
  font-weight: 500;
}
.clock-icon {
  font-size: 14px;
  color: #717171;
  font-weight: 500;
}
</style>
