<template>
  <div>
    <div class="single-company" v-if="type == 1">
      <div class="image">
        <img
          :src="HOST + renderLocaleImage(data, 'thumbnail_image', $i18n.locale)"
          :alt="data.thumbnail_image.original.alt"
        />
      </div>
      <div class="content">
        <div class="islamic-account">
          <div class="title" v-if="data.is_islamic">
            {{ $t("islamicAccount") }}
            <i class="bi bi-moon-stars-fill moon-star"></i>
          </div>
        </div>
        <div class="content-body">
          <div class="reviews">
            <div class="title">{{ $t("numberOfReviews") }}</div>
            <div class="no-of-reviews">10</div>
          </div>
          <div class="rating">
            <i
              v-for="(rate, ridx) in totalFullStar(data.rating)"
              :key="'ratef_' + ridx"
              class="bi bi-star-fill rating-color"
            ></i>
            <i
              v-for="(rate, ridx) in totalHalfStar(data.rating)"
              :key="'rateh_' + ridx"
              class="bi bi-star-half rating-color"
            ></i>
            <i
              v-for="(rate, ridx) in totalEmptyStar(data.rating)"
              :key="'ratee_' + ridx"
              class="bi bi-star rating-color"
            ></i>
            <div class="rating-value">({{ data.rating }})</div>
          </div>
          <div class="buttons">
            <a target="_blank" :href="data.account_open_link">{{
              $t("openAccount")
            }}</a>
            <nuxt-link :to="modifyHtmlPath(data.meta.html_url)">{{
              $t("companyProfile")
            }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="single-company" v-if="type == 2">
      <div class="image">
        <img
          :src="
            HOST +
            renderLocaleImage(data, 'thumbnail_image', $i18n.locale, true)
          "
          :alt="data.thumbnail_image.alt"
        />
      </div>
      <div class="content">
        <div class="islamic-account">
          <div class="title" v-if="data.is_islamic">
            {{ $t("islamicAccount") }}
            <i class="bi bi-moon-stars-fill moon-star"></i>
          </div>
        </div>
        <div class="content-body">
          <div class="reviews">
            <div class="title">{{ $t("numberOfReviews") }}</div>
            <div class="no-of-reviews">10</div>
          </div>
          <div class="rating">
            <i
              v-for="(rate, ridx) in totalFullStar(data.rating)"
              :key="'ratef_' + ridx"
              class="bi bi-star-fill rating-color"
            ></i>
            <i
              v-for="(rate, ridx) in totalHalfStar(data.rating)"
              :key="'rateh_' + ridx"
              class="bi bi-star-half rating-color"
            ></i>
            <i
              v-for="(rate, ridx) in totalEmptyStar(data.rating)"
              :key="'ratee_' + ridx"
              class="bi bi-star rating-color"
            ></i>
            <div class="rating-value">({{ data.rating }})</div>
          </div>
          <div class="buttons">
            <a target="_blank" :href="data.account_open_link">{{
              $t("openAccount")
            }}</a>
            <nuxt-link :to="data.html_url">{{
              $t("companyProfile")
            }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import { modifyHtmlPath, renderLocaleImage } from "../utils/utils";

@Component({
  name: "SingleCompany",
  components: {},
})
export default class SingleCompany extends Vue {
  @Prop() data;
  @Prop() type;

  renderLocaleImage = renderLocaleImage;

  modifyHtmlPath = modifyHtmlPath;

  get HOST() {
    return this.$config.HOST;
  }

  totalFullStar(rating) {
    return Math.floor(rating);
  }

  totalHalfStar(rating) {
    var x = rating - Math.floor(rating);
    if (x > 0.1) {
      return 1;
    }
    return 0;
  }

  totalEmptyStar(rating) {
    var x = 5 - Math.ceil(rating);
    if (x >= 1) {
      return x;
    }
    return 0;
  }
}
</script>

<style scoped lang="scss">
.single-company {
  width: 100%;
  height: 423px;
  background-color: #f1f2f4;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 500px) {
    gap: 5px;
  }
  .image {
    height: 200px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
    @media (max-width: 500px) {
      padding: 10px;
    }
    @media (max-width: 500px) {
      margin: 0 auto;
      width: 100%;
    }
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
    .islamic-account {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20px;
      .title {
        height: 20px;
        width: 150px;
        text-align: center;
        border: 1px solid #01aeab;
        font-size: 12px;
        font-weight: 500;
        border-radius: 10px;
        color: #000;
      }
    }
  }
}
.moon-star {
  color: #007300;
  margin-left: 5px;
}
.content-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin-top: 10px;
  .reviews {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .no-of-reviews {
      color: #01aeab;
      font-size: 16px;
      font-weight: 700;
      @media (max-width: 500px) {
        font-size: 14px;
      }
    }
    .title {
      font-size: 16px;
      font-weight: 600;
      width: 100%;
      text-align: right;
      color: #000;
      @media (max-width: 500px) {
        font-size: 14px;
      }
    }
  }
  .rating {
    display: flex;
    gap: 5px;
    width: 100%;
    justify-content: flex-start;
    .rating-value {
      font-size: 18px;
      font-weight: 700;
      color: #000;
      @media (max-width: 500px) {
        font-size: 14px;
      }
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    a {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 43px;
      background: #01aeab;
      border-radius: 8px;
      font-weight: 600;
      font-size: 12px;
      color: $primary-color;
      &:nth-child(2) {
        background-color: transparent;
        border: 1px solid #01aeab;
        color: #01aeab;
      }
    }
  }
}
</style>
