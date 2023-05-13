<template>
  <div class="modal-backdrop">
    <div
      class="modal-container"
      :class="{ 'open-modal': modalOpen }"
      role="dialog"
      v-on-clickaway="close"
    >
      <div class="modal-body">
        <div class="udpate-wrapper">
          <button class="close-btn" @click="close">
            <img
              src="/images/close.png"
              alt="close icon"
              class="img-fuild"
              width="18"
              height="18"
            />
          </button>

          <div class="profile-card">
            <ValidationObserver v-slot="{ invalid }" tag="form">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                tag="div"
                class="mb-3"
              >
                <label>Search Company ({{ position }})</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    redborder: errors[0],
                  }"
                  placeholder="Search ..."
                  name="Company name"
                  v-model.trim="searchText"
                  v-debounce:400ms="debounceSearch"
                />
                <small v-if="errors[0]" class="error mt-1"
                  >Please enter company name</small
                >
              </ValidationProvider>

              <div class="results">
                <div class="item-wrapper">
                  <div
                    class="item"
                    v-for="(item, idx) in datas"
                    :key="'com_' + idx"
                    @click="handleCompanyClick(item)"
                  >
                    <div class="image">
                      <img
                        v-if="item.logo_detail"
                        :src="HOST + item.logo_detail.original.src"
                        :alt="item.logo_detail.original.alt"
                      />
                      <img
                        v-else
                        :src="HOST + item.thumbnail_image.original.src"
                        :alt="item.thumbnail_image.original.alt"
                      />
                    </div>
                    <div class="content">
                      <div class="title">
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
                  </div>
                </div>
                <div
                  class="pagination"
                  dir="ltr"
                  v-if="paginationSteps.length > 1"
                >
                  <a
                    v-if="page != 1"
                    class="item"
                    @click.prevent="handleDecrement"
                  >
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
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Component,
  Vue,
  Prop,
  Getter,
  Action,
  Mutation,
  Watch,
} from "nuxt-property-decorator";
import { NS_COMPANY, NS_COMMON } from "../../utils/store/namespace.names";
import { namespaced } from "../../utils/utils";
import {
  FETCH_FIND_BROKER_COMPANY,
  FETCH_PAGES,
} from "../../utils/store/action.names";

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
      if (i > 0) {
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
      if (counter > 0) {
        break;
      }
      paginationSteps.unshift(i);
      counter += 1;
    }
  }
  return paginationSteps;
}

@Component({
  name: "CompanySearchModal",
  components: {},
})
export default class CompanySearchModal extends Vue {
  @Prop() modalOpen;
  @Prop() position;

  @Action(namespaced(NS_COMPANY, FETCH_FIND_BROKER_COMPANY))
  fetchFindBrokerCompany;
  @Action(namespaced(NS_COMMON, FETCH_PAGES)) fetchPages;

  searchText = "";
  datas = [];

  limit = 20;
  offset = 0;
  count = 0;
  totalPageCount = "";
  page = 1;
  paginationSteps = [this.page];

  error_msg = [];
  loading = false;

  @Watch("page")
  handlePageChange(val, oldVal) {
    if (val != oldVal) {
      this.handleFetchCompany();
    }
  }

  resetParams() {
    this.limit = 20;
    this.offset = 0;
    this.count = 0;
    this.totalPageCount = "";
    this.page = 1;
    this.paginationSteps = [this.page];
  }

  debounceSearch() {
    if (this.searchText.length == 0) {
      this.datas = [];
      this.resetParams();
      this.handleFetchCompany();
    }
    if (this.searchText.length > 3) {
      this.fetchFindBrokerCompany({ title: this.searchText }).then((data) => {
        this.datas = data.results;
      });
    }
  }

  async handleFetchCompany() {
    this.datas = [];
    var params = {
      limit: this.limit,
      offset: this.offset,
      type: "home.CompanyDetail",
      fields: "title,thumbnail_image,is_islamic,account_open_link,rating",
    };

    await this.fetchPages(params).then((data) => {
      this.datas = data.items;
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

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {
    this.handleFetchCompany();
  }

  handleCompanyClick(item) {
    this.$emit("hideModal", { item, position: this.position });
  }

  close() {
    this.$emit("hideModal");
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

  handleDecrement() {
    if (this.page > 1) {
      this.page = this.page - 1;
      this.offset = (this.page - 1) * this.limit;
    } else {
      this.page = 1;
      this.offset = (this.page - 1) * this.limit;
    }
  }

  updatePage(pageNo) {
    this.page = pageNo;
    this.offset = (this.page - 1) * this.limit;
  }

  handleIncreament() {
    if (this.page < this.totalPageCount) {
      this.page = this.page + 1;
      this.offset = (this.page - 1) * this.limit;
    } else {
      this.page = this.totalPageCount;
      this.offset = (this.page - 1) * this.limit;
    }
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.modal-container {
  position: relative;
  min-height: 168px;
  background-color: #1f3241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  // transform: scale(0);
  opacity: 0;

  @media (max-width: 400px) {
    width: 90%;
  }
}

.close {
  animation: close 0.8s forwards;
}

.udpate-wrapper {
  padding: 50px;
  position: relative;

  .close-btn {
    position: absolute;
    top: 30px;
    right: 30px;
    background: none;
    border: none;
  }

  .profile-card {
    border: 1px solid white;
    border-radius: 20px;
    padding: 25px 44px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;

    .image-wrapper {
      position: relative;

      .profile-pic {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-bottom: 30px;
        object-fit: cover;
      }

      .camera-btn {
        position: absolute;
        bottom: 30px;
        right: 0;
        background: linear-gradient(180deg, #dc5ced 0%, #25e1fb 100%);
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 15px;
          height: 15px;
        }
      }
    }

    form {
      width: 100%;

      label {
        font-family: $poppins-font, sans-serif;
        font-weight: 400;
        font-size: 13px;
        margin-bottom: 5px;
        padding-left: 15px;
        color: $primary-color;
      }

      .form-control {
        font-family: $poppins-font, sans-serif;
        font-weight: 400;
        font-size: 13px;
        color: $placeholder-color;
        border: 1px solid rgba(255, 255, 255, 0.6);
      }

      .form-button {
        font-size: 14px;
        padding: 10px 0;
      }
    }

    @media (max-width: 767px) {
      padding: 25px 30px 35px;
      width: 350px;
    }

    @media (max-width: 575px) {
      padding: 80px 25px 100px;
      border: none;
      width: 360px;
    }

    @media (max-width: 400px) {
      width: unset;
    }
  }

  @media (max-width: 767px) {
    padding: 35px;
  }

  @media (max-width: 575px) {
    padding: 0px;
  }
}

// modal overlay show animation
@keyframes bounceUp {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.95);
  }
  95% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes close {
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  30% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  0% {
    transform: scale(1);
  }
}
// modal overlay show animation

.results {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  justify-content: space-between;
  .item-wrapper {
    display: flex;
    gap: 15px;
    flex-direction: column;
    height: 250px;
    width: 100%;
    overflow: hidden;
    overflow-y: scroll;
    .item {
      display: flex;
      gap: 10px;
      cursor: pointer;
      .image {
        height: 60px;
        width: 60px;
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
        .title {
          font-size: 16px;
          font-weight: 600;
          color: white;
        }
        .rating {
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          gap: 5px;
          width: 100%;
          .rating-value {
            font-size: 18px;
            font-weight: 700;
            color: #fff;
            @media (max-width: 500px) {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.pagination {
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  a {
    color: white;
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
      color: black;
    }
  }
}
.active {
  color: black !important;
  background-color: #f1f1f1;
}
</style>
