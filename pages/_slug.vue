<template>
  <div class="company-index">
    <div class="wrapper">
      <h1 class="title" v-if="getCurrentPage.hero_title">
        {{ renderLocaleField(getCurrentPage, "hero_title", $i18n.locale) }}
      </h1>
      <div
        v-if="getCurrentPage.rendered_hero_description"
        class="hero-description"
        v-html="
          renderLocaleField(
            getCurrentPage,
            'rendered_hero_description',
            $i18n.locale
          )
        "
      ></div>
      <h1 class="title" v-if="getCurrentPage.list_title">
        {{ renderLocaleField(getCurrentPage, "list_title", $i18n.locale) }}
      </h1>
      <div class="white-back">
        <div class="filters">
          <div class="search-input">
            <img
              src="/images/filter-icon.png"
              alt="filter icon"
              class="filter-icon"
              @click="showFilterDorpdown = true"
            />
            <NewsArticleFilter
              v-if="showFilterDorpdown"
              :filterData="filterData"
              :data="getCurrentPage.all_categories"
              @hide-filter-dropdown="hideFilterDropdown"
              @apply="handleFilterApply"
            />
            <img
              src="/images/search-icon.png"
              alt="search icon"
              class="search-icon"
            />
            <input
              type="text"
              name="search"
              class="form-control"
              placeholder="يبحث"
              v-model.trim="search"
              v-debounce:400ms="debounceSearch"
            />
          </div>
        </div>
        <div class="category-title">
          {{ categoryTitle }}
        </div>
        <div class="news-wrapper">
          <nuxt-link
            :to="modifyHtmlPath(article.meta.html_url)"
            class="item"
            v-for="(article, idx) in newss"
            :key="'articles_' + idx"
          >
            <div class="image">
              <img
                v-if="article.thumbnail && article.thumbnail.original"
                :src="
                  HOST + renderLocaleImage(article, 'thumbnail', $i18n.locale)
                "
                :alt="article.thumbnail.original.alt"
              />
              <div class="category">{{ article.fetch_parent.title }}</div>
            </div>
            <div class="content">
              <div class="pub-date">
                <i class="bi bi-clock clock-icon"></i>
                {{
                  $dayjs(article.meta.first_published_at).format(
                    "DD MMMM, YYYY"
                  )
                }}
              </div>
              <div class="title">
                {{
                  getTitle(renderLocaleField(article, "title", $i18n.locale))
                }}
              </div>
            </div>
          </nuxt-link>
          <div class="empty-news" v-if="newss.length < 1">
            Not any {{ $route.params.slug }} found
          </div>
        </div>
        <div class="pagination" dir="ltr" v-if="paginationSteps.length > 1">
          <a v-if="page != 1" class="item" @click.prevent="handleDecrement">
            <i class="bi bi-caret-left-fill"></i>
          </a>
          <a
            :class="{ active: page == pag, item: true }"
            v-for="(pag, idx) in paginationSteps"
            :key="'pag_' + idx"
            @click.prevent="updatePage(pag)"
          >
            {{ pag }}
          </a>
          <a
            v-if="totalPageCount != page"
            class="item"
            @click.prevent="handleIncreament"
          >
            <i class="bi bi-caret-right-fill"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Component,
  Vue,
  Getter,
  Action,
  Mutation,
  Watch,
} from "nuxt-property-decorator";
import { NS_USER, NS_COMMON, NS_COMPANY } from "../utils/store/namespace.names";
import { FETCH_CURRENT_PAGE, FETCH_PAGES } from "../utils/store/action.names";
import {
  namespaced,
  deepCopy,
  modifyHtmlPath,
  renderLocaleField,
  renderLocaleImage,
} from "../utils/utils";
import NewsArticleFilter from "../components/NewsArticleFilter";

function calculatePage(count, limit, page, totalPageCount, paginationSteps) {
  const totalPage = Math.ceil(count / limit);
  totalPageCount = totalPage;
  if (totalPage > 1) {
    paginationSteps = calculateNext(totalPage, page, paginationSteps);
    paginationSteps = calculatePrev(page, paginationSteps);
  }
  return [totalPageCount, paginationSteps];
}

function calculateNext(totalPage, page, paginationSteps) {
  if (totalPage > 1) {
    var next = page;
    for (var i = 0; i < totalPage; i++) {
      if (i > 3) {
        break;
      }
      if (page < totalPage) {
        next = next + 1;
        if (next > totalPage) {
          break;
        }
        paginationSteps.push(next);
      }
    }
  }
  return paginationSteps;
}

function calculatePrev(page, paginationSteps) {
  if (page > 1) {
    var counter = 0;
    for (var i = page - 1; i > 0; i--) {
      if (counter > 2) {
        break;
      }
      paginationSteps.unshift(i);
      counter += 1;
    }
  }
  return paginationSteps;
}

@Component({
  name: "NewsArticleListPage",
  components: { NewsArticleFilter },
})
export default class NewsArticleListPage extends Vue {
  @Action(namespaced(NS_COMMON, FETCH_PAGES)) fetchPages;

  showFilterDorpdown = false;
  modifyHtmlPath = modifyHtmlPath;
  renderLocaleField = renderLocaleField;
  renderLocaleImage = renderLocaleImage;

  @Watch("$route", { deep: true })
  handleRouteChange(val, oldVal) {
    this.fetchData();
  }

  get HOST() {
    return this.$config.HOST;
  }

  get filterData() {
    return {
      selectedCategory: this.selectedCategory,
    };
  }

  hideFilterDropdown() {
    this.showFilterDorpdown = false;
  }

  handleFilterApply(params) {
    this.hideFilterDropdown();
    this.isLoading = true;
    this.selectedCategory = params.selectedCategory;
    this.categoryTitle = params.categoryTitle;
    this.handleFilter();
  }

  handleFilter() {
    var q = deepCopy(this.$route.query);
    if (this.selectedCategory) {
      q["child_of"] = this.selectedCategory;
    } else {
      delete q["child_of"];
    }
    this.$router.push({
      query: q,
    });
  }

  getTitle(text) {
    if (text.length > 60) {
      return text.slice(0, 60) + " ...";
    } else {
      return text;
    }
  }

  debounceSearch() {
    var query = deepCopy(this.$route.query);
    if (this.search.length == 0) {
      delete query["search"];
      this.$router.push({ query: query });
    }
    if (this.search.length > 3) {
      query["search"] = this.search;
      this.$router.push({ query: query });
    }
  }

  handleDecrement() {
    if (this.page > 1) {
      this.page = this.page - 1;
      var query = deepCopy(this.$route.query);
      if (!query.limit) {
        query["limit"] = this.limit;
      }
      query["offset"] = (this.page - 1) * this.limit;

      this.$router.push({ query: query });
    } else {
      this.page = 1;
      var query = deepCopy(this.$route.query);
      if (!query.limit) {
        query["limit"] = this.limit;
      }
      query["offset"] = (this.page - 1) * this.limit;
      this.$router.push({ query: query });
    }
  }

  updatePage(pageNo) {
    this.page = pageNo;
    var query = deepCopy(this.$route.query);
    if (!query.limit) {
      query["limit"] = this.limit;
    }
    query["offset"] = (this.page - 1) * this.limit;
    this.$router.push({ query: query });
  }

  handleIncreament() {
    if (this.page < this.totalPageCount) {
      this.page = this.page + 1;
      var query = deepCopy(this.$route.query);
      if (!query.limit) {
        query["limit"] = this.limit;
      }
      query["offset"] = (this.page - 1) * this.limit;
      this.$router.push({ query: query });
    } else {
      this.page = this.totalPageCount;
      var query = deepCopy(this.$route.query);
      if (!query.limit) {
        query["limit"] = this.limit;
      }
      query["offset"] = (this.page - 1) * this.limit;
      this.$router.push({ query: query });
    }
  }

  async fetchData() {
    var query = deepCopy(this.$route.query);

    var slug = this.$route.params.slug;
    var pageType = "home.NewsDetailPage";
    if (slug == "articles") {
      pageType = "home.ArticleDetailPage";
    }

    query["type"] = pageType;
    query["fields"] = "title,title_en,thumbnail,thumbnail_en,fetch_parent";
    query["order"] = "-first_published_at";

    await this.fetchPages(query).then((data) => {
      this.newss = data.items;
      this.count = data.meta.total_count;
    });

    this.totalPageCount = "";
    this.paginationSteps = [this.page];
    [this.totalPageCount, this.paginationSteps] = calculatePage(
      this.count,
      this.limit,
      this.page,
      this.totalPageCount,
      this.paginationSteps
    );
  }

  async asyncData({ route, $axios, store, error }) {
    var slug = route.params.slug;
    var selectedCategory = route.query.child_of ? route.query.child_of : "";
    var categoryTitle = "";
    var getCurrentPage = {};
    const currentPageData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_CURRENT_PAGE), {
        html_path: slug,
      })
      .then((data) => {
        getCurrentPage = data;
      })
      .catch((e) => {
        // console.log(e);
        if (e.response.status === 404) {
          error({ statusCode: 404 });
        } else {
          error({ statusCode: 500 });
        }
      });

    var count = 0;
    var page = 1;
    var limit = route.query.limit ? route.query.limit : 20;
    var offset = route.query.offset ? route.query.offset : 0;
    var totalPageCount = "";
    var search = route.query.search ? route.query.search : "";

    if (offset != 0) {
      page = Math.ceil(offset / limit) + 1;
    }
    var paginationSteps = [page];

    var pageType = "home.NewsDetailPage";
    if (slug == "articles") {
      pageType = "home.ArticleDetailPage";
    }

    var params = {
      limit: limit,
      offset: offset,
      type: pageType,
      fields: "title,title_en,thumbnail,thumbnail_en,fetch_parent",
      order: "-first_published_at",
    };

    if (search) {
      params["search"] = search;
    }

    if (selectedCategory) {
      params["child_of"] = parseInt(selectedCategory);
    }

    var newss = [];
    const getNews = await store
      .dispatch(namespaced(NS_COMMON, FETCH_PAGES), params)
      .then((data) => {
        newss = data.items;
        count = data.meta.total_count;
      })
      .catch((e) => {
        if (e.response.status === 404) {
          error({ statusCode: 404 });
        } else {
          error({ statusCode: 500 });
        }
      });

    var [totalPageCount, paginationSteps] = calculatePage(
      count,
      limit,
      page,
      totalPageCount,
      paginationSteps
    );

    if (selectedCategory) {
      var x = getCurrentPage.all_categories.find(
        (obj) => obj.id == selectedCategory
      );
      categoryTitle = x.title;
    }

    return {
      getCurrentPage,
      newss,
      count,
      page,
      limit,
      paginationSteps,
      totalPageCount,
      search,
      selectedCategory,
      categoryTitle,
    };
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
.company-index {
}
.wrapper {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  .title {
    font-size: 36px;
    font-weight: 700;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 1250px) {
      width: 80%;
    }
    @media (max-width: 950px) {
    }
    @media (max-width: 700px) {
    }
    @media (max-width: 500px) {
    }
    @media (max-width: 400px) {
    }
  }
  .hero-description {
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
    width: 70%;
    margin: 0 auto;
    @media (max-width: 1250px) {
      width: 80%;
    }
    @media (max-width: 950px) {
    }
    @media (max-width: 700px) {
    }
    @media (max-width: 500px) {
    }
    @media (max-width: 400px) {
    }
  }
  .white-back {
    // background-color: white;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .category-title {
      font-size: 28px;
      font-weight: 700;
      width: 70%;
      margin: 0 auto;
      margin-bottom: 20px;
    }
    .news-wrapper {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      width: 70%;
      margin: 0 auto;
      @media (max-width: 1400px) {
        grid-template-columns: repeat(4, 1fr);
        width: 80%;
      }
      @media (max-width: 1250px) {
        margin-top: 30px;
        width: 80%;
        grid-template-columns: repeat(4, 1fr);
      }
      @media (max-width: 950px) {
        margin-top: 30px;
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 450px) {
        grid-template-columns: 1fr;
      }
      @media (max-width: 350px) {
        width: 95%;
        grid-template-columns: 1fr;
      }
      .item {
        height: 490px;
        .image {
          height: 372px;
          position: relative;
          img {
            flex-shrink: 0;
            -webkit-flex-shrink: 0;
            max-width: 100%;
            height: 100%;
            -o-object-fit: cover;
            object-fit: cover;
            border-radius: 8px;
          }
          .category {
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: black;
            padding-left: 8px;
            padding-right: 8px;
            padding-top: 5px;
            padding-bottom: 5px;
            border-radius: 5px;
            color: white;
            font-weight: 600;
            letter-spacing: 1px;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 20px;
          .title {
            // color: $linked-font-color;
            font-size: 16px;
            font-weight: 600;
            height: 54px;
            overflow: hidden;
            display: flex;
            align-items: center;
            width: 100%;
            @media (max-width: 1400px) {
              font-size: 13px;
            }
            @media (max-width: 1250px) {
              font-size: 14px;
            }
            @media (max-width: 950px) {
            }
            @media (max-width: 700px) {
            }
            @media (max-width: 500px) {
            }
            @media (max-width: 400px) {
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
  }
}
.pagination {
  height: 50px;
  width: 70%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 100px;
  margin-top: 50px;
  a {
    color: black;
    font-size: 18px;
    font-weight: 500;
    height: 40px;
    width: 40px;
    border: 1px solid #f1f1f1;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
.active {
  color: black !important;
  background-color: #f1f1f1;
}

.filters {
  width: 70%;
  margin: 0 auto;
  height: 60px;
  margin-bottom: 50px;
  @media (max-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 950px) {
  }
  @media (max-width: 700px) {
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 350px) {
    width: 95%;
  }
  .search-input {
    position: relative;

    .search-icon {
      position: absolute;
      top: 35%;
      right: 45px;

      width: 16px;
      height: 16px;

      @media (max-width: 767px) {
        left: 24px;
      }
    }

    .form-control {
      border: none;
      background: #000;
      padding: 15px 68px;
      padding-right: 70px;
      font-size: 16px;
      line-height: 16px;
      color: white;

      &:focus {
        background: #000;
        box-shadow: 0 0 0 0.25rem rgba(89, 91, 224, 0.4);
      }

      @media (max-width: 575px) {
        font-size: 14px;
        line-height: 14px;
      }
    }

    .filter-icon {
      position: absolute;
      top: 20%;
      left: 45px;
      width: 30px;
      height: 30px;
      cursor: pointer;

      @media (max-width: 767px) {
        top: 21%;
        right: 25px;
        width: 24px;
        height: 26px;
      }
    }
  }
}
.empty-news {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
