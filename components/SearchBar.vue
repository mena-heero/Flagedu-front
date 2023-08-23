<template>
  <div>
    <div class="search-input-container">
      <i class="bi bi-search search-icon"></i>
      <input
        type="text"
        :placeholder="$t('search_placeholder')"
        v-model.trim="searchText"
        v-debounce:400ms="debounceSearch"
      />
      <div
        class="search-result-container"
        v-if="openSearchResult == true"
        v-on-clickaway="hideSearchResult"
      >
        <div class="company-result" v-if="companies.length > 0">
          <div class="title">{{ $t("search_companies_title") }}</div>
          <a
            class="item"
            v-for="(item, idx) in companies"
            :key="'company_' + idx"
            :href="item.meta.html_url"
          >
            <div class="image">
              <img
                :src="HOST + item.thumbnail_image.original.src"
                :alt="item.thumbnail_image.original.alt"
              />
            </div>
            <div class="company-info">
              <div class="company-name">
                {{ item.title }}
              </div>
              <div class="rating">
                <i
                  v-for="(rate, ridx) in totalFullStar(item.rating)"
                  :key="'ratef_' + ridx"
                  class="bi bi-star-fill rating-color"
                ></i>
                <i
                  v-for="(rate, ridx) in totalHalfStar(item.rating)"
                  :key="'rateh_' + ridx"
                  class="bi bi-star-half rating-color"
                ></i>
                <i
                  v-for="(rate, ridx) in totalEmptyStar(item.rating)"
                  :key="'ratee_' + ridx"
                  class="bi bi-star rating-color"
                ></i>
                <div class="rating-value">({{ item.rating }})</div>
              </div>
            </div>
          </a>
        </div>
        <div class="article-result" v-if="articles.length > 0">
          <div class="title">{{ $t("search_articles_title") }}</div>
          <a
            class="item"
            v-for="(item, aidx) in articles"
            :key="'article_' + aidx"
            :href="item.meta.html_url"
          >
            <div class="article-title">{{ aidx + 1 }}. {{ item.title }}</div>
          </a>
        </div>
        <div class="article-result" v-if="newss.length > 0">
          <div class="title">{{ $t("search_news_title") }}</div>
          <a
            class="item"
            v-for="(item, nidx) in newss"
            :key="'news_' + nidx"
            :href="item.meta.html_url"
          >
            <div class="article-title">{{ nidx + 1 }}. {{ item.title }}</div>
          </a>
        </div>
        <div
          class="empty-result"
          v-if="companies.length < 1 && articles.length < 1 && newss.length < 1"
        >
          <div class="empty-text">{{ $t("search_no_results") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import { SEARCH } from "../utils/store/action.names";
import { NS_COMMON } from "../utils/store/namespace.names";
import { namespaced } from "../utils/utils";

@Component({
  name: "SearchBar",
  components: {},
})
export default class SearchBar extends Vue {
  @Action(namespaced(NS_COMMON, SEARCH)) search;

  searchText = "";
  openSearchResult = false;
  companies = [];
  newss = [];
  articles = [];

  get HOST() {
    return this.$config.HOST;
  }

  debounceSearch() {
    this.openSearchResult = true;
    if (this.searchText.length == 0) {
      this.companies = [];
      this.newss = [];
      this.articles = [];
    }
    if (this.searchText.length > 3) {
      var companyParams = {
        limit: 5,
        offset: 0,
        type: "home.CompanyDetail",
        search: this.searchText,
        fields: "title,thumbnail_image,is_islamic,account_open_link,rating",
      };

      this.search(companyParams).then((data) => {
        this.companies = data.items;
      });

      var newsParams = {
        limit: 5,
        offset: 0,
        type: "home.NewsDetailPage",
        search: this.searchText,
        fields: "title",
      };

      this.search(newsParams).then((data) => {
        this.newss = data.items;
      });

      var articlesParams = {
        limit: 5,
        offset: 0,
        type: "home.ArticleDetailPage",
        search: this.searchText,
        fields: "title",
      };

      this.search(articlesParams).then((data) => {
        this.articles = data.items;
      });
    }
  }

  hideSearchResult() {
    this.openSearchResult = false;
    this.companies = [];
    this.newss = [];
    this.articles = [];
    this.searchText = "";
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
.search-input-container {
  position: relative;
  .search-icon {
    position: absolute;
    top: 9px;
    right: 15px;
    font-size: 16px;
    font-weight: 600;
    color: #01aeab;
  }
  input {
    height: 40px;
    width: 100%;
    background: #f1f2f4;
    border: 1px solid #01aeab;
    border-radius: 8px;
    padding-right: 40px;
  }
  .search-result-container {
    position: absolute;
    max-height: 500px;
    width: 100%;
    background-color: #f1f2f4;
    z-index: 9999999999;
    border: 1px solid #01aeab;
    border-radius: 8px;
    padding: 30px;
    overflow: hidden;
    overflow-y: scroll;
    .title {
      font-size: 30px;
      font-weight: 600;
    }
    .divider {
      border-bottom: 1px solid grey;
    }
    .extra-gap {
      margin-top: 30px !important;
    }
    .company-result {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .item {
        display: flex;
        gap: 15px;
        .image {
          height: 70px;
          width: 70px;
          img {
            height: 100%;
            width: 100%;
            flex-shrink: 0;
            -webkit-flex-shrink: 0;
            -o-object-fit: cover;
            object-fit: cover;
          }
        }
        .company-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          .company-name {
            font-size: 14px;
            font-weight: 600;
            color: black;
          }
        }
      }
    }
    .article-result {
      display: flex;
      flex-direction: column;
      gap: 15px;
      .item {
        display: flex;
        gap: 15px;
        .article-title {
          font-size: 14px;
          font-weight: 600;
          color: black;
        }
      }
    }
  }
}

.rating {
  display: flex;
  gap: 5px;
  width: 100%;
  justify-content: flex-start;
  .rating-color {
    font-size: 14px !important;
  }
  .rating-value {
    font-size: 14px;
    font-weight: 700;
    color: #000;
    @media (max-width: 500px) {
      font-size: 14px;
    }
  }
}
.empty-result {
  .empty-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: black;
  }
}
</style>
