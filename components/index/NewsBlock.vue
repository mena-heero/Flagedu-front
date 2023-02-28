<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <nuxt-link to="/news">{{ data.title }}</nuxt-link>
      </div>
      <div class="news-wrapper">
        <a href="#" class="highligted-news">
          <div class="image">
            <img
              :src="HOST + data.news[0].thumbnail.src"
              alt="data.news[0].thumbnail.alt"
            />
          </div>
          <div class="content">
            <div class="pub-date">
              {{ $dayjs(data.news[0].publish_date).format("DD MMMM, YYYY") }}
              <i class="bi bi-clock clock-icon"></i>
            </div>
            <div class="title">
              {{ data.news[0].title }}
            </div>
          </div>
        </a>
        <div class="other-news">
          <a href="#" class="item">
            <div class="image">
              <img
                :src="HOST + data.news[1].thumbnail.src"
                alt="data.news[1].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                {{ $dayjs(data.news[1].publish_date).format("DD MMMM, YYYY") }}
                <i class="bi bi-clock clock-icon"></i>
              </div>
              <div class="title">
                {{ data.news[1].title }}
              </div>
            </div>
          </a>
          <a href="#" class="item">
            <div class="image">
              <img
                :src="HOST + data.news[2].thumbnail.src"
                alt="data.news[2].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                {{ $dayjs(data.news[2].publish_date).format("DD MMMM, YYYY") }}
                <i class="bi bi-clock clock-icon"></i>
              </div>
              <div class="title">
                {{ data.news[2].title }}
              </div>
            </div>
          </a>
          <a href="#" class="item">
            <div class="image">
              <img
                :src="HOST + data.news[3].thumbnail.src"
                alt="data.news[3].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                {{ $dayjs(data.news[3].publish_date).format("DD MMMM, YYYY") }}
                <i class="bi bi-clock clock-icon"></i>
              </div>
              <div class="title">
                {{ data.news[3].title }}
              </div>
            </div>
          </a>
          <a href="#" class="item">
            <div class="image">
              <img
                :src="HOST + data.news[4].thumbnail.src"
                alt="data.news[4].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                {{ $dayjs(data.news[4].publish_date).format("DD MMMM, YYYY") }}
                <i class="bi bi-clock clock-icon"></i>
              </div>
              <div class="title">
                {{ data.news[4].title }}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import SingleCompany from "../SingleCompany";

@Component({
  name: "NewsBlock",
  components: { SingleCompany },
})
export default class NewsBlock extends Vue {
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
  grid-template-columns: 1.2fr 2fr;
  gap: 40px;
  .highligted-news {
    height: 750px;
    .image {
      height: 600px;
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
        font-size: 24px;
        font-weight: 600;
        text-align: right;
        height: 60px;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
    }
  }
  .other-news {
    min-height: 750px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    .item {
      height: 375px;
      .image {
        height: 250px;
        img {
          flex-shrink: 0;
          -webkit-flex-shrink: 0;
          width: 100%;
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
