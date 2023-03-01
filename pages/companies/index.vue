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
              src="/images/search-icon.png"
              alt="search icon"
              class="search-icon"
            />
            <input
              type="text"
              name="search"
              class="form-control"
              placeholder="Search"
              v-model.trim="name"
              v-debounce:400ms="debounceSearch"
            />
            <img
              src="/images/filter-icon.png"
              alt="filter icon"
              class="filter-icon"
              @click="showFilterDorpdown = true"
            />
            <CompanyFilter
              v-if="showFilterDorpdown"
              :filterData="filterData"
              :data="getCurrentPage.all_categories"
              @hide-filter-dropdown="hideFilterDropdown"
              @apply="handleFilterApply"
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
        <div class="pagination" v-if="paginationSteps.length > 1">
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
    if (this.name.length == 0) {
      delete query["name"];
      this.$router.push({ query: query });
    }
    if (this.name.length > 3) {
      query["name"] = this.name;
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
    await this.fetchCompany(query).then((data) => {
      this.companies = data.results;
      this.count = data.count;
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
    var sortByName = route.query.sortByName ? route.query.sortByName : "";
    var sortByRating = route.query.sortByRating ? route.query.sortByRating : "";

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
    var name = route.query.name ? route.query.name : "";

    if (offset != 0) {
      page = Math.ceil(offset / limit) + 1;
    }
    var paginationSteps = [page];

    // if (limit > 2) {
    //   limit = 2;
    // } else if (limit < 2) {
    //   limit = 2;
    // }

    var params = {
      limit: limit,
      offset: offset,
    };

    if (name) {
      params["name"] = name;
    }

    if (sortByName) {
      params["sort_by_name"] = sortByName;
    }

    if (sortByRating) {
      params["sort_by_rating"] = sortByRating;
    }

    var companies = [];
    const getCompany = await store
      .dispatch(namespaced(NS_COMPANY, FETCH_COMPANY), params)
      .then((data) => {
        companies = data.results;
        count = data.count;
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
      name,
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
  }
  .hero-description {
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
    width: 70%;
    margin: 0 auto;
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
  .search-input {
    position: relative;

    .search-icon {
      position: absolute;
      top: 35%;
      left: 45px;

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
      padding-right: 100px;
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
      right: 45px;
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
</style>
