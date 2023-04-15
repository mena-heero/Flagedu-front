<template>
  <div class="wrapper">
    <div class="profile-wrapper" v-if="getProfile">
      <div class="profile-container">
        <div class="profile-menu">
          <a @click.prevent="showProfileUpdateModal = true" href="#">
            Edit Profile
            <i class="bi bi-pencil-square bicon"></i>
          </a>
          <a
            class="change-password"
            @click.prevent="showPasswordChangeModal = true"
            href="#"
          >
            Change Password
            <i class="bi bi-key-fill bicon"></i>
          </a>
          <a @click.prevent="handleSignOut" href="#" class="red-btn">
            Sign out
            <i class="bi bi-box-arrow-right bicon"></i>
          </a>
        </div>
        <div class="profile-info">
          <div class="image">
            <img
              v-if="getProfile.profile_image_detail"
              :src="HOST + getProfile.profile_image_detail.original.src"
              :alt="getProfile.profile_image_detail.original.alt"
            />
            <img
              v-else-if="getProfile.social_image_url"
              :src="getProfile.social_image_url"
              :alt="getProfile.full_name"
            />
            <img v-else src="/images/avatar.png" alt="profile" />
          </div>
          <div class="full-name">
            {{ getProfile.full_name }}
          </div>
          <div class="email">
            {{ getProfile.email }}
          </div>
        </div>
      </div>
    </div>
    <div class="white-back">
      <div class="category-title">My Saved Articles</div>
      <div class="news-wrapper">
        <nuxt-link
          :to="article.article_detail.html_url"
          class="item"
          v-for="(article, idx) in articles"
          :key="'articles_' + idx"
        >
          <div class="image">
            <img
              :src="HOST + article.article_detail.logo_detail.original.src"
              :alt="article.article_detail.logo_detail.original.alt"
            />
            <div class="category">
              {{ article.article_detail.category.title }}
            </div>
          </div>
          <div class="content">
            <div class="pub-date">
              <i class="bi bi-clock clock-icon"></i>
              {{
                $dayjs(article.article_detail.first_published_at).format(
                  "DD MMMM, YYYY"
                )
              }}
            </div>
            <div class="title">
              {{ getTitle(article.article_detail.title) }}
            </div>
          </div>
        </nuxt-link>
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
    <ProfileUpdateModal
      v-if="showProfileUpdateModal"
      :modalOpen="showProfileUpdateModal"
      @hideModal="hideModal"
    />
    <PasswordChangeModal
      v-if="showPasswordChangeModal"
      :modalOpen="showPasswordChangeModal"
      @hideModal="hidePasswordModal"
    />
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
import { NS_COMMON, NS_USER, NS_COMPANY } from "../utils/store/namespace.names";
import {
  FETCH_CURRENT_PAGE,
  FETCH_SAVED_TOPIC,
} from "../utils/store/action.names";
import { namespaced } from "../utils/utils";
import { GET_PROFILE } from "../utils/store/getter.names";
import { SET_TOKEN_ERROR } from "../utils/store/mutation.names";
import ProfileUpdateModal from "../components/modals/ProfileUpdate";
import PasswordChangeModal from "../components/modals/PasswordChangeModal";

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
  name: "Profile",
  components: {
    ProfileUpdateModal,
    PasswordChangeModal,
  },
})
export default class Profile extends Vue {
  @Getter(namespaced(NS_USER, GET_PROFILE)) getProfile;

  @Action(namespaced(NS_COMPANY, FETCH_SAVED_TOPIC)) fetchSavedTopic;

  @Mutation(namespaced(NS_USER, SET_TOKEN_ERROR)) setTokenError;

  showProfileUpdateModal = false;
  showPasswordChangeModal = false;

  @Watch("page")
  handlePageChange(val, oldVal) {
    if (val != oldVal) {
      this.handleFetchSavedTopic();
    }
  }

  async handleFetchSavedTopic() {
    this.articles = [];
    var params = {
      limit: this.limit,
      offset: this.offset,
      type: "1",
    };

    await this.fetchSavedTopic(params).then((data) => {
      this.articles = data.results;
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

  hideModal() {
    this.showProfileUpdateModal = false;
  }

  hidePasswordModal() {
    this.showPasswordChangeModal = false;
  }

  get HOST() {
    return this.$config.HOST;
  }

  getTitle(text) {
    if (text.length > 60) {
      return text.slice(0, 60) + " ...";
    } else {
      return text;
    }
  }

  handleSignOut() {
    this.$router.push("/");
    this.setTokenError();
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

  async asyncData({ route, $axios, store }) {
    var articles = [];

    var count = 0;
    var page = 1;
    var limit = 20;
    var offset = 0;
    var totalPageCount = "";
    var paginationSteps = [page];

    var params = {
      limit: limit,
      offset: offset,
      type: 1,
    };

    const fetchArticles = await store
      .dispatch(namespaced(NS_COMPANY, FETCH_SAVED_TOPIC), params)
      .then((data) => {
        articles = data.results;
        count = data.count;
      })
      .catch((e) => {
        console.log(e);
      });

    var [totalPageCount, paginationSteps] = calculatePage(
      count,
      limit,
      page,
      totalPageCount,
      paginationSteps
    );

    return {
      articles,
      count,
      page,
      limit,
      paginationSteps,
      totalPageCount,
    };
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  padding-top: 0px !important;
  gap: 0px !important;
}
.profile-wrapper {
  width: 100%;
  background-color: #d7e1ec;
}
.profile-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  @media (max-width: 700px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    flex-direction: column;
  }
  @media (max-width: 400px) {
    font-size: 24px;
  }
  .profile-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    a {
      height: 44px;
      width: 155px;
      background-color: $primary-btn-color;
      color: $primary-color;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 8px;
    }
    .change-password {
      font-size: 13px;
    }
    .red-btn {
      background-color: red;
    }
  }
  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
    .image {
      margin-bottom: 60px;
      img {
        height: 128px;
        width: 128px;
        border-radius: 128px;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
    .full-name {
      font-weight: 500;
      font-size: 28px;
      line-height: 34px;
      text-align: center;
      color: #000000;
      @media (max-width: 600px) {
        font-size: 20px;
      }
    }
    .email {
      font-weight: 500;
      font-size: 20px;
      text-align: center;
      color: #000000;
      @media (max-width: 600px) {
        font-size: 18px;
      }
    }
  }
}
.bicon {
  font-size: 16px;
}
.white-back {
  background-color: white;
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
          color: $linked-font-color;
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
</style>
