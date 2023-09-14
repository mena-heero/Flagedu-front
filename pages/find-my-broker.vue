<template>
  <div class="company-index">
    <div class="wrapper">
      <h1 class="title">
        {{ renderLocaleField(getCurrentPage, "title", $i18n.locale) }}
      </h1>
      <div class="white-back">
        <div class="company-wrapper">
          <div class="result-block">
            <div class="title">{{ $t("fyb.suggested_brokers") }}</div>
            <div class="companies">
              <div
                class="items-wrapper"
                v-for="(item, idx) in getCompanies"
                :key="'company_' + idx"
              >
                <div class="item">
                  <div class="content">
                    <div class="rank">
                      <div>{{ $t("fyb.top") }}</div>
                      <div>{{ idx + 1 }}</div>
                    </div>
                    <div class="image">
                      <img
                        :src="HOST + item.logo_detail.original.src"
                        :alt="item.logo_detail.original.alt"
                      />
                    </div>
                    <div class="company-info">
                      <div class="title">
                        {{ renderLocaleField(item, "title", $i18n.locale) }}
                      </div>
                      <div class="rating">
                        <i
                          v-for="(rate, ridx) in totalFullStar(item.rating)"
                          :key="'ratef_' + ridx"
                          class="bi bi-star-fill rating-size"
                        ></i>
                        <i
                          v-for="(rate, ridx) in totalHalfStar(item.rating)"
                          :key="'rateh_' + ridx"
                          class="bi bi-star-half rating-size"
                        ></i>
                        <i
                          v-for="(rate, ridx) in totalEmptyStar(item.rating)"
                          :key="'ratee_' + ridx"
                          class="bi bi-star rating-size"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <div class="btn">
                    <nuxt-link class="hide-on-380" :to="item.html_url">{{
                      $t("fyb.visit")
                    }}</nuxt-link>
                    <nuxt-link class="visible-on-380" :to="item.html_url">{{
                      $t("fyb.visit")
                    }}</nuxt-link>
                  </div>
                </div>
                <div
                  v-if="idx != getCompanies.length - 1"
                  class="divider"
                ></div>
              </div>
            </div>
          </div>
          <div class="question-block">
            <div class="title" v-if="finish == false">
              {{ $t("fyb.Question_number") }}{{ step }}
            </div>
            <div class="title" v-if="finish == true">
              {{ $t("fyb.congratz") }}
            </div>

            <div class="item" v-if="step == 1">
              <div class="question-title">
                {{ $t("fyb.Quest1") }}
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q1"
                  value="1"
                />
                <label for="s1q1" class="form-check-label"
                  >{{ $t("fyb.beginner") }}
                </label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q2"
                  value="2"
                />
                <label for="s1q2" class="form-check-label">{{
                  $t("fyb.intermediate")
                }}</label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q3"
                  value="3"
                />
                <label for="s1q3" class="form-check-label"
                  >{{ $t("fyb.Advanced") }}
                </label>
              </div>
            </div>
            <div class="item" v-if="step == 2">
              <div class="question-title">{{ $t("fyb.Quest2") }}</div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q1"
                  value="1"
                />
                <label for="s2q1" class="form-check-label">{{
                  $t("stocks")
                }}</label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q2"
                  value="2"
                />
                <label for="s2q2" class="form-check-label">{{
                  $t("ETFs")
                }}</label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q3"
                  value="3"
                />
                <label for="s2q3" class="form-check-label"
                  >{{ $t("Commodities") }}
                </label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q4"
                  value="4"
                />
                <label for="s2q4" class="form-check-label">{{
                  $t("Forex")
                }}</label>
              </div>
            </div>
            <div class="item" v-if="step == 3">
              <div class="question-title">{{ $t("fyb.Quest3") }}</div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q1"
                  value="1"
                />
                <label for="s3q1" class="form-check-label">
                  {{ $t("fyb.less500") }}</label
                >
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q2"
                  value="2"
                />
                <label for="s3q2" class="form-check-label">{{
                  $t("fyb.less5000")
                }}</label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q3"
                  value="3"
                />
                <label for="s3q3" class="form-check-label">{{
                  $t("fyb.less25000")
                }}</label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q4"
                  value="4"
                />
                <label for="s3q4" class="form-check-label">{{
                  $t("fyb.less50000")
                }}</label>
              </div>
            </div>
            <div class="item" v-if="step == 4">
              <div class="question-title">{{ $t("fyb.Quest4") }}</div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q1"
                  value="1"
                />
                <label for="s4q1" class="form-check-label"
                  >{{ $t("Not_Important") }}
                </label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q2"
                  value="2"
                />{{ $t("some_how_important") }}
                <label for="s4q2" class="form-check-label"></label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q3"
                  value="3"
                />
                <label for="s4q3" class="form-check-label"
                  >{{ $t("Very_Important") }}
                </label>
              </div>
            </div>
            <div class="item" v-if="step == 5 && finish == false">
              <div class="question-title">{{ $t("fyb.Quest5") }}</div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q1"
                  value="3"
                />
                <label for="s5q1" class="form-check-label"
                  >{{ $t("Yes") }}
                </label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q2"
                  value="1"
                />
                <label for="s5q2" class="form-check-label">{{
                  $t("No")
                }}</label>
              </div>
            </div>
            <div class="finish-block" v-if="finish == true">
              {{ $t("fyb.thnx_done") }}
            </div>
            <div class="btns">
              <button v-if="step != 5" @click="handleNext" class="next-btn">
                {{ $t("Next") }}
              </button>
              <button
                v-if="step == 5 && finish == false"
                @click="handleFinish"
                class="next-btn"
              >
                {{ $t("End") }}
              </button>
              <button
                @click="handleBack"
                v-if="step != 1 && finish == false"
                class="back-btn"
              >
                {{ $t("Back") }}
              </button>
              <button
                v-if="finish == true"
                @click="handleTryAgain"
                class="next-btn"
              >
                {{ $t("Try_Again") }}
              </button>
            </div>
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
  Getter,
  Action,
  Mutation,
  Watch,
} from "nuxt-property-decorator";
import { NS_COMMON, NS_COMPANY } from "../utils/store/namespace.names";
import {
  FETCH_CURRENT_PAGE,
  FETCH_COMPANY_FINDER_RATING,
} from "../utils/store/action.names";
import { namespaced, renderLocaleField } from "../utils/utils";

@Component({
  name: "FindMyBroker",
  components: {},
})
export default class FindMyBroker extends Vue {
  @Action(namespaced(NS_COMPANY, FETCH_COMPANY_FINDER_RATING))
  fetchCompanyFinderRating;

  step = 1;
  finish = false;
  renderLocaleField = renderLocaleField;

  answers = {
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  };

  handleNext() {
    if (this.step == 1) {
      if (!this.answers.q1) {
        this.$toast.error($t("fyb.please_answer"));
        return false;
      }
    } else if (this.step == 2) {
      if (!this.answers.q2) {
        this.$toast.error("");
        return false;
      }
    } else if (this.step == 3) {
      if (!this.answers.q3) {
        this.$toast.error($t("fyb.please_answer"));
        return false;
      }
    } else if (this.step == 4) {
      if (!this.answers.q4) {
        this.$toast.error($t("fyb.please_answer"));
        return false;
      }
    }
    this.step += 1;
    if (this.step > 5) {
      this.step = 5;
    }
  }

  get totalPoint() {
    var t = 0;
    var that = this;
    Object.keys(this.answers).forEach(function (key) {
      if (that.answers[key]) {
        t += parseInt(that.answers[key]);
      }
    });
    return t;
  }

  get getCompanies() {
    var company = [];

    if (this.step == 1) {
      company = this.companies.find((item) => item.rating == "0");
      return company.companies;
    } else {
      if (this.totalPoint > 0 && this.totalPoint < 6) {
        company = this.companies.find((item) => item.rating == "0-5");
        return company.companies;
      } else if (this.totalPoint > 5 && this.totalPoint < 10) {
        company = this.companies.find((item) => item.rating == "6-9");
        return company.companies;
      } else if (this.totalPoint > 9) {
        company = this.companies.find((item) => item.rating == "10+");
        return company.companies;
      }
    }
  }

  handleFinish() {
    if (this.step == 5) {
      if (!this.answers.q5) {
        this.$toast.error($t("fyb.please_answer"));
        return false;
      }
    }
    this.finish = true;
  }

  handleBack() {
    this.step -= 1;
    if (this.step < 1) {
      this.step = 1;
    }
  }

  handleTryAgain() {
    this.step = 1;
    this.answers = {
      q1: "",
      q2: "",
      q3: "",
      q4: "",
      q5: "",
    };
    this.finish = false;
  }

  // handleFetchCompany() {
  //   var params = {
  //     sort_by_rating: 0,
  //   };
  //   this.fetchFindBrokerCompany(params).then((data) => {
  //     this.companies = data.results;
  //   });
  // }

  async asyncData({ route, $axios, store, error }) {
    var getCurrentPage = {};
    const currentPageData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_CURRENT_PAGE), {
        html_path: route.path,
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

    var companies = null;

    const fetchCompanies = await store
      .dispatch(namespaced(NS_COMPANY, FETCH_COMPANY_FINDER_RATING))
      .then((data) => {
        companies = data;
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      getCurrentPage,
      companies,
    };
  }

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
  mounted() {}

  get getPageTitle() {
    if (this.getCurrentPage.meta.seo_title) {
      return this.getCurrentPage.meta.seo_title;
    } else {
      return this.getCurrentPage.title;
    }
  }

  get getSearchDescription() {
    if (this.getCurrentPage.meta.search_description) {
      return this.getCurrentPage.meta.search_description;
    } else {
      return "";
    }
  }

  get getKeywords() {
    if (this.getCurrentPage.og_keywords) {
      return this.getCurrentPage.og_keywords;
    } else {
      return "";
    }
  }

  get fullPath() {
    if (this.getCurrentPage.meta.html_url) {
      return this.getCurrentPage.meta.html_url;
    } else {
      return null;
    }
  }

  head() {
    const headData = {
      title: this.getPageTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSearchDescription,
        },
        {
          hid: "Keywords",
          name: "Keywords",
          content: this.getKeywords,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.getPageTitle,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.getSearchDescription,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.fullPath,
        },
      ],
    };

    // Add canonical URL to headData only if this.fullPath is defined
    if (this.fullPath) {
      // Add canonical link tag to the HTML head section
      headData.link = [
        {
          rel: "canonical",
          href: this.fullPath,
        },
      ];
    }

    return headData;
  }
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
    width: 65%;
    margin: 0 auto;
    @media (max-width: 1250px) {
      width: 90%;
    }
    @media (max-width: 950px) {
    }
    @media (max-width: 800px) {
    }
    @media (max-width: 500px) {
    }
    @media (max-width: 400px) {
    }
  }
  .white-back {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .company-wrapper {
      display: grid;
      grid-template-columns: 1fr 0.8fr;
      gap: 50px;
      width: 65%;
      margin: 0 auto;
      @media (max-width: 1250px) {
        width: 90%;
      }
      @media (max-width: 950px) {
      }
      @media (max-width: 800px) {
        grid-template-columns: 1fr;
      }
      @media (max-width: 450px) {
      }
      @media (max-width: 350px) {
        width: 95%;
      }
      .title {
        font-size: 32px;
        font-weight: 500;
        width: 100%;
        @media (max-width: 1050px) {
          font-size: 26px;
        }
      }
    }
  }
}
.question-block {
  display: flex;
  gap: 20px;
  flex-direction: column;
  margin-right: 10px;
  .item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    // align-items: flex-end;
    .question-title {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .btns {
    display: flex;
    gap: 15px;
    width: 100%;
    .next-btn {
      border: none;
      height: 40px;
      width: 106px;
      background: #01aeab;
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
    }
    .back-btn {
      border: 1px solid #01aeab;
      height: 40px;
      width: 106px;
      background: white;
      border-radius: 8px;
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #01aeab;
    }
  }
}
.result-block {
  display: flex;
  gap: 20px;
  flex-direction: column;
  .companies {
    display: flex;
    flex-direction: column;
    background-color: #f1f2f4;
    border-radius: 16px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    @media (max-width: 1050px) {
      padding: 5px;
    }
    .items-wrapper {
      .divider {
        border: 1px solid #dfdfdf;
      }
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
        padding: 20px;
        @media (max-width: 1050px) {
          padding: 5px;
        }
        .btn {
          a {
            border: none;
            background: #01aeab;
            border-radius: 8px;
            font-weight: 700;
            font-size: 16px;
            line-height: 22px;
            color: #ffffff;
            padding: 15px;
            @media (max-width: 1050px) {
              padding: 10px;
              font-size: 12px;
            }
            @media (max-width: 380px) {
            }
          }
        }
      }
      .content {
        display: flex;
        gap: 10px;
        .rank {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 8px;
          gap: 8px;
          width: 46px;
          height: 62px;
          background: #1f3241;
          border-radius: 65px;
          @media (max-width: 1050px) {
            width: 30px;
            height: 48px;
            border-radius: 50px;
          }
          div {
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            text-align: center;
            color: #ffffff;
            @media (max-width: 1050px) {
              font-size: 12px;
            }
          }
        }
        .image {
          width: 65px;
          height: 65px;
          @media (max-width: 1050px) {
            height: 50px;
            width: 50px;
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
        .company-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @media (max-width: 1050px) {
            gap: 5px;
          }
          .title {
            font-weight: 600;
            font-size: 16px;
            color: black;
            @media (max-width: 1292px) {
              font-size: 14px;
            }
            @media (max-width: 1050px) {
              font-size: 14px;
            }
            @media (max-width: 350px) {
              font-size: 12px;
            }
          }
          .rating {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 5px;
            width: 100%;
            .rating-value {
              font-size: 18px;
              font-weight: 700;
              color: #000;
              @media (max-width: 1700px) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}

input[type="radio"] {
}

.form-check-custom {
  width: 100%;
  display: grid;
  grid-template-columns: 0.2fr 5fr;
  gap: 10px;
  .form-check-label {
  }
  input {
    margin-right: 0px !important;
    margin-left: auto;
  }
}
.form-check {
  display: flex;
  gap: 30px;
  label {
    font-size: 16px;
  }
}
.finish-block {
  font-size: 18px;
  font-weight: 600;
  text-align: right;
}

.rating-color {
  color: $rating-color;
  font-size: 18px;
  @media (max-width: 550px) {
    font-size: 15px;
  }
  @media (max-width: 1050px) {
    font-size: 12px;
  }
}

.rating-size {
  color: $rating-color;
  font-size: 13px;
}
</style>
