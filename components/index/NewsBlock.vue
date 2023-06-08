<template>
  <div class="company-block-container">
    <div class="company-container">
      <div class="title">
        <nuxt-link to="/news">{{ data.title }}</nuxt-link>
      </div>
      <div class="news-wrapper">
        <div class="other-news">
          <nuxt-link :to="data.news[0].html_url" class="item hide-on-desktop">
            <div class="image">
              <img
                :src="
                  HOST +
                  renderLocaleImage(
                    data.news[0],
                    'thumbnail',
                    $i18n.locale,
                    true
                  )
                "
                :alt="data.news[0].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                <i class="bi bi-clock clock-icon"></i>
                {{ $dayjs(data.news[0].publish_date).format("DD MMMM, YYYY") }}
              </div>
              <div class="title">{{ data.news[0].title }}</div>
            </div>
          </nuxt-link>
          <nuxt-link :to="data.news[1].html_url" class="item">
            <div class="image">
              <img
                :src="
                  HOST +
                  renderLocaleImage(
                    data.news[1],
                    'thumbnail',
                    $i18n.locale,
                    true
                  )
                "
                :alt="data.news[1].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                <i class="bi bi-clock clock-icon"></i>
                {{ $dayjs(data.news[1].publish_date).format("DD MMMM, YYYY") }}
              </div>
              <div class="title">
                {{ data.news[1].title }}
              </div>
            </div>
          </nuxt-link>
          <nuxt-link :to="data.news[2].html_url" class="item">
            <div class="image">
              <img
                :src="
                  HOST +
                  renderLocaleImage(
                    data.news[2],
                    'thumbnail',
                    $i18n.locale,
                    true
                  )
                "
                :alt="data.news[2].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                <i class="bi bi-clock clock-icon"></i>
                {{ $dayjs(data.news[2].publish_date).format("DD MMMM, YYYY") }}
              </div>
              <div class="title">
                {{ data.news[2].title }}
              </div>
            </div>
          </nuxt-link>
          <nuxt-link :to="data.news[3].html_url" class="item">
            <div class="image">
              <img
                :src="
                  HOST +
                  renderLocaleImage(
                    data.news[3],
                    'thumbnail',
                    $i18n.locale,
                    true
                  )
                "
                :alt="data.news[3].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                <i class="bi bi-clock clock-icon"></i>
                {{ $dayjs(data.news[3].publish_date).format("DD MMMM, YYYY") }}
              </div>
              <div class="title">
                {{ data.news[3].title }}
              </div>
            </div>
          </nuxt-link>
          <nuxt-link :to="data.news[4].html_url" class="item">
            <div class="image">
              <img
                :src="
                  HOST +
                  renderLocaleImage(
                    data.news[4],
                    'thumbnail',
                    $i18n.locale,
                    true
                  )
                "
                :alt="data.news[4].thumbnail.alt"
              />
            </div>
            <div class="content">
              <div class="pub-date">
                <i class="bi bi-clock clock-icon"></i>
                {{ $dayjs(data.news[4].publish_date).format("DD MMMM, YYYY") }}
              </div>
              <div class="title">
                {{ data.news[4].title }}
              </div>
            </div>
          </nuxt-link>
        </div>
        <nuxt-link :to="data.news[0].html_url" class="highligted-news hide">
          <div class="image">
            <img
              :src="
                HOST +
                renderLocaleImage(data.news[0], 'thumbnail', $i18n.locale, true)
              "
              :alt="data.news[0].thumbnail.alt"
            />
          </div>
          <div class="content">
            <div class="pub-date">
              <i class="bi bi-clock clock-icon"></i>
              {{ $dayjs(data.news[0].publish_date).format("DD MMMM, YYYY") }}
            </div>
            <div class="title">{{ data.news[0].title }}</div>
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
  name: "NewsBlock",
  components: { SingleCompany },
})
export default class NewsBlock extends Vue {
  @Prop() data;

  renderLocaleImage = renderLocaleImage;

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
  grid-template-columns: 2fr 1.2fr;
  gap: 40px;
  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
  .highligted-news {
    height: 750px;
    .image {
      height: 600px;
      img {
        // flex-shrink: 0;
        // -webkit-flex-shrink: 0;
        max-width: 100%;
        height: 100%;
        // -o-object-fit: cover;
        // object-fit: cover;
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
        height: 60px;
        overflow: hidden;
        display: flex;
        align-items: center;
      }
    }
  }
  .other-news {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 1250px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media (max-width: 950px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 550px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 400px) {
      grid-template-columns: 1fr;
    }
    .item {
      height: 375px;
      .image {
        height: 250px;
        img {
          // flex-shrink: 0;
          // -webkit-flex-shrink: 0;
          width: 100%;
          height: 100%;
          // -o-object-fit: cover;
          // object-fit: cover;
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
