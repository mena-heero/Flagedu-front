<template>
  <div>
    <div class="rating-container">
      <div class="form">
        <div class="title">ما هو رأيك؟</div>
        <ValidationObserver v-slot="{ invalid }" ref="form">
          <form
            method="post"
            name="ratingForm"
            @submit.prevent="handleAddRating"
          >
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="div"
              class="mb-3"
            >
              <div class="form-input mb-1">
                <input
                  type="number"
                  name="Rating"
                  :class="{
                    'form-control': true,
                    redborder: errors[0],
                  }"
                  class="form-control"
                  placeholder="التصنيف 0-5"
                  step="1"
                  min="0"
                  max="5"
                  v-model="formData.rating"
                />
              </div>
              <small v-if="errors.length" class="error">
                {{ errors[0] }}
              </small>
            </ValidationProvider>
            <ValidationProvider
              rules="required"
              v-slot="{ errors }"
              tag="div"
              class="mb-3"
            >
              <div class="form-input mb-1">
                <textarea
                  :class="{
                    'form-control': true,
                    redborder: errors[0],
                  }"
                  placeholder="تعليق"
                  rows="3"
                  v-model="formData.comment"
                  name="Comment"
                ></textarea>
              </div>
              <small v-if="errors.length" class="error">
                {{ errors[0] }}
              </small>
            </ValidationProvider>
            <button :disabled="invalid" class="submit-button">أضف تعليق</button>
          </form>
        </ValidationObserver>
        <!-- <div class="" v-if="!getProfile">
          أنت بحاجه إلى <nuxt-link to="/signin">تسجيل الدخول</nuxt-link> لإضافة
          التقييم والمراجعة!
        </div> -->
      </div>
      <div class="comments">
        <div
          class="single-comment"
          v-for="(comment, idx) in ratings"
          :key="'ratings_' + idx"
        >
          <div class="image">
            <img
              v-if="comment.user && comment.user.profile_image_detail"
              :src="HOST + comment.user.profile_image_detail.original.src"
              :alt="comment.user.profile_image_detail.original.alt"
            />
            <img v-else src="/images/avatar.png" alt="profile" />
          </div>
          <div class="content">
            <div class="name">
              <span v-if="comment.user">{{
                comment.user.full_name
                  ? comment.user.full_name
                  : comment.user.email
              }}</span>
              <span v-else>Anonymous</span>
            </div>
            <div class="info">
              <div class="rating">
                <i
                  v-for="(rate, ridx) in totalFullStar(comment.rating)"
                  :key="'ratef_' + ridx"
                  class="bi bi-star-fill rating-color-local"
                ></i>
                <i
                  v-for="(rate, ridx) in totalHalfStar(comment.rating)"
                  :key="'rateh_' + ridx"
                  class="bi bi-star-half rating-color-local"
                ></i>
                <i
                  v-for="(rate, ridx) in totalEmptyStar(comment.rating)"
                  :key="'ratee_' + ridx"
                  class="bi bi-star rating-color-local"
                ></i>
                <div class="rating-value">({{ comment.rating }})</div>
              </div>
              <div class="timesince" dir="ltr">
                <i class="bi bi-clock-fill"></i>
                {{ $dayjs(comment.creation_time).fromNow() }}
              </div>
            </div>
            <div class="user-comment" v-html="comment.comment"></div>
          </div>
        </div>
        <div dir="ltr" class="pagination" v-if="paginationSteps.length > 1">
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
import { get } from "https";
import {
  Component,
  Vue,
  Getter,
  Action,
  Prop,
  Watch,
} from "nuxt-property-decorator";
import { namespaced } from "~/utils/utils";
import { ADD_RATING, FETCH_RATING } from "../utils/store/action.names";
import { GET_PROFILE } from "../utils/store/getter.names";
import { NS_USER, NS_COMPANY } from "../utils/store/namespace.names";

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
  name: "RatingReview",
  components: {},
})
export default class RatingReview extends Vue {
  @Prop() dataId;

  @Getter(namespaced(NS_USER, GET_PROFILE)) getProfile;

  @Action(namespaced(NS_COMPANY, ADD_RATING)) addRating;
  @Action(namespaced(NS_COMPANY, FETCH_RATING)) fetchRating;

  formData = {
    rating: "",
    comment: "",
  };
  ratings = [];

  count = 0;
  page = 1;
  limit = 20;
  offset = 0;
  totalPageCount = "";
  paginationSteps = [this.page];

  get pageType() {
    if (this.$route.params.type) {
      return this.$route.params.type;
    } else {
      return "company";
    }
  }

  @Watch("page")
  handlePageChange(val, oldVal) {
    this.paginationSteps = [val];
    this.handleFetchRating();
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

  handleFetchRating() {
    var params = {
      limit: this.limit,
      offset: this.offset,
    };

    if (this.pageType == "news") {
      params["type"] = 0;
      params["news"] = this.dataId;
    } else if (this.pageType == "articles") {
      params["type"] = 1;
      params["articles"] = this.dataId;
    } else if (this.pageType == "company") {
      params["type"] = 2;
      params["company"] = this.dataId;
    }

    this.fetchRating(params).then((data) => {
      this.ratings = data.results;
      this.count = data.count;
      [this.totalPageCount, this.paginationSteps] = calculatePage(
        this.count,
        this.limit,
        this.page,
        this.totalPageCount,
        this.paginationSteps
      );
    });
  }

  mounted() {
    this.handleFetchRating();
  }

  handleAddRating() {
    if (this.pageType == "news") {
      this.formData["news"] = this.dataId;
      this.formData["type"] = 0;
    } else if (this.pageType == "articles") {
      this.formData["articles"] = this.dataId;
      this.formData["type"] = 1;
    } else if (this.pageType == "company") {
      this.formData["type"] = 2;
      this.formData["company"] = this.dataId;
    }

    this.addRating(this.formData)
      .then((data) => {
        var msg = `<div class='t-custom-class'><div>You rating and comment is added successfully!</div></div>`;
        this.$toast.success(msg);
        this.formData["rating"] = "";
        this.formData["comment"] = "";
        this.handleFetchRating();
      })
      .catch((e) => {
        this.loading = false;
        this.error_msg = "";
        var err_msg = "";
        if (e.response.status === 400) {
          for (const [key, value] of Object.entries(e.response.data)) {
            const err = `<p>${value}</p>`;
            err_msg = err_msg + err;
          }
          this.$toast.error(err_msg);
        } else {
          var msg = `<div class='t-custom-class'><div>Something went wrong!</div></div>`;
          this.$toast.error(msg);
        }
      });
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

  get HOST() {
    return this.$config.HOST;
  }
}
</script>

<style scoped lang="scss">
.rating-container {
  width: 40%;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  gap: 50px;
  @media (max-width: 1250px) {
    width: 70%;
    gap: 30px;
  }
  @media (max-width: 950px) {
  }
  @media (max-width: 700px) {
    width: 80%;
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 400px) {
    width: 95%;
  }
}
.form {
  .title {
    font-size: 24px;
    letter-spacing: 2px;
  }
  form {
    margin-top: 30px;
    .submit-button {
      border: 1px solid #333;
      padding-top: 5px;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 5px;
      border-radius: 8px;
      color: #333;
      transition: 0.3s;
      &:hover {
        background-color: #333;
        color: white;
        cursor: pointer;
      }
    }
  }
}
.comments {
  display: flex;
  flex-direction: column;
  gap: 30px;
  .single-comment {
    display: flex;
    gap: 20px;
    .image {
      img {
        height: 50px;
        width: 50px;
        border-radius: 50px;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 0px;
      width: 100%;
      .name {
        font-size: 16px;
        font-weight: 500;
      }
      .info {
        display: flex;
        justify-content: flex-start;
        .rating {
          display: flex;
          justify-content: flex-start;
          gap: 5px;
          width: 200px;
          .rating-value {
            font-size: 14px;
            font-weight: 700;
            color: #000;
          }
        }
        .timesince {
          font-size: 14px;
          color: grey;
          display: flex;
          justify-content: flex-end;
          gap: 5px;
        }
      }
      .user-comment {
        margin-top: 10px;
      }
    }
  }
}

.form-control {
  color: black;
  border-color: grey;
  border-radius: 8px;
  width: 80%;
  @media (max-width: 400px) {
    width: 95%;
  }
}

.form-control:focus {
  color: black !important;
  background: transparent;
  border-color: black;
  box-shadow: 0 0 0 0.25rem rgb(255 255 255 / 25%);
}

::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: grey;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}

.rating-color-local {
  color: $rating-color;
  font-size: 14px;
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
    border: 1px solid grey;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: grey;
    }
  }
}
.active {
  color: white !important;
  background-color: grey;
}
</style>
