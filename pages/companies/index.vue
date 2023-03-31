<template>
  <div class="company-index">
    <div class="wrapper">
      <div class="title">{{ getCurrentPage.hero_title }}</div>
      <div
        class="hero-description"
        v-html="getCurrentPage.rendered_hero_description"
      ></div>
      <div class="title">{{ getCurrentPage.list_title }}</div>
      <div class="white-back">
        <div class="filters">
          <div class="search-input">
            <img
              src="/images/filter-icon.png"
              alt="filter icon"
              class="filter-icon"
              @click="showFilterDorpdown = true"
            />
            <CompanyFilter
              v-if="showFilterDorpdown"
              :filterData="filterData"
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
              placeholder="Search"
              v-model.trim="search"
              v-debounce:400ms="debounceSearch"
            />
          </div>
        </div>
        <div class="company-wrapper">
          <div
            v-for="(company, idx) in companies"
            :key="'company_' + idx"
            class="items"
          >
            <SingleCompany :data="company" :type="1" />
          </div>
        </div>
        <div class="empty-news" v-if="companies.length < 1">
          Not any companies found!
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
import {
  NS_AUTH,
  NS_COMMON,
  NS_COMPANY,
} from "../../utils/store/namespace.names";
import {
  FETCH_CURRENT_PAGE,
  FETCH_COMPANY,
  FETCH_PAGES,
} from "../../utils/store/action.names";
import { namespaced, deepCopy } from "../../utils/utils";
import SingleCompany from "../../components/SingleCompany";
import CompanyFilter from "../../components/CompanyFilter";

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
  name: "CompanyIndex",
  components: { SingleCompany, CompanyFilter },
})
export default class CompanyIndex extends Vue {
  @Action(namespaced(NS_COMPANY, FETCH_COMPANY)) fetchCompany;
  @Action(namespaced(NS_COMMON, FETCH_PAGES)) fetchPages;

  showFilterDorpdown = false;

  @Watch("$route", { deep: true })
  handleRouteChange(val, oldVal) {
    this.fetchData();
  }

  get filterData() {
    return {
      sortByName: this.sortByName,
      sortByRating: this.sortByRating,
    };
  }

  hideFilterDropdown() {
    this.showFilterDorpdown = false;
  }

  handleFilterApply(params) {
    this.hideFilterDropdown();
    this.isLoading = true;
    this.sortByName = params.sortByName;
    this.sortByRating = params.sortByRating;
    this.handleFilter();
  }

  handleFilter() {
    var q = deepCopy(this.$route.query);
    if (this.sortByName) {
      q["sort_by_name"] = this.sortByName;
    } else {
      delete q["sort_by_name"];
    }
    if (this.sortByRating) {
      q["sort_by_rating"] = this.sortByRating;
    } else {
      delete q["sort_by_rating"];
    }
    this.$router.push({
      query: q,
    });
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

    query["type"] = "home.CompanyDetail";
    query["fields"] =
      "title,thumbnail_image,is_islamic,account_open_link,rating";

    if (query["sort_by_name"]) {
      if (query["sort_by_name"] == 0) {
        query["order"] = "-title";
      } else {
        query["order"] = "title";
      }
      delete query["sort_by_name"];
    }

    if (query["sort_by_rating"]) {
      if (query["sort_by_rating"] == 0) {
        query["order"] = "-rating";
      } else {
        query["order"] = "rating";
      }
      delete query["sort_by_rating"];
    }

    await this.fetchPages(query).then((data) => {
      this.companies = data.items;
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

  async asyncData({ route, $axios, store }) {
    var getCurrentPage = {};
    var sortByName = route.query.sort_by_name ? route.query.sort_by_name : "";
    var sortByRating = route.query.sort_by_rating
      ? route.query.sort_by_rating
      : "";

    const currentPageData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_CURRENT_PAGE), {
        html_path: "companies",
      })
      .then((data) => {
        getCurrentPage = data;
      })
      .catch((e) => {
        console.log(e);
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

    var params = {
      limit: limit,
      offset: offset,
      type: "home.CompanyDetail",
      fields: "title,thumbnail_image,is_islamic,account_open_link,rating",
    };

    if (search) {
      params["search"] = search;
    }

    if (sortByName) {
      if (sortByName == "0") {
        params["order"] = "-title";
      } else {
        params["order"] = "title";
      }
    }

    if (sortByRating) {
      if (sortByRating == "0") {
        params["order"] = "-rating";
      } else {
        params["order"] = "rating";
      }
    }

    var companies = [];
    const getCompany = await store
      .dispatch(namespaced(NS_COMMON, FETCH_PAGES), params)
      .then((data) => {
        companies = data.items;
        count = data.meta.total_count;
      });

    var [totalPageCount, paginationSteps] = calculatePage(
      count,
      limit,
      page,
      totalPageCount,
      paginationSteps
    );

    return {
      getCurrentPage,
      companies,
      count,
      page,
      limit,
      paginationSteps,
      totalPageCount,
      search,
      sortByName,
      sortByRating,
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
    @media (max-width: 450px) {
      font-size: 30px;
    }
    @media (max-width: 350px) {
      font-size: 26px;
      width: 95%;
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
    @media (max-width: 350px) {
      width: 95%;
    }
  }
  .white-back {
    background-color: white;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .company-wrapper {
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
  width: 70%;
  margin: 0 auto;
}
</style>
