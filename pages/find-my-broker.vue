<template>
  <div class="company-index">
    <div class="wrapper">
      <div class="title">{{ getCurrentPage.title }}</div>
      <div class="white-back">
        <div class="company-wrapper">
          <div class="result-block">
            <div class="title">قائمة الوسطاء المرشحة لك</div>
            <div class="companies">
              <div
                class="items-wrapper"
                v-for="(item, idx) in getCompanies"
                :key="'company_' + idx"
              >
                <div class="item">
                  <div class="content">
                    <div class="rank">
                      <div>قمة</div>
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
                        {{ item.title }}
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
                    <nuxt-link class="hide-on-380" :to="item.html_url"
                      >زياره</nuxt-link
                    >
                    <nuxt-link class="visible-on-380" :to="item.html_url"
                      >زياره</nuxt-link
                    >
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
              رقم السؤال {{ step }}
            </div>
            <div class="title" v-if="finish == true">تهنئة</div>
            <div class="item" v-if="step == 1">
              <div class="question-title">
                ما مدى خبرتك في الاستثمار / التداول؟
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
                <label for="s1q1" class="form-check-label">مبتدئ</label>
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
                <label for="s1q2" class="form-check-label">متوسط</label>
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
                <label for="s1q3" class="form-check-label">متقدم</label>
              </div>
            </div>
            <div class="item" v-if="step == 2">
              <div class="question-title">
                ما نوع الأوراق المالية التي تخطط للتداول / الاستثمار فيها؟
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q1"
                  value="1"
                />
                <label for="s2q1" class="form-check-label">الأسهم</label>
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
                <label for="s2q2" class="form-check-label"
                  >صناديق الاستثمار المتداولة</label
                >
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
                <label for="s2q3" class="form-check-label">السلع </label>
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
                <label for="s2q4" class="form-check-label">الفوركس</label>
              </div>
            </div>
            <div class="item" v-if="step == 3">
              <div class="question-title">ما هي ميزانيتك الاستثمارية؟</div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q1"
                  value="1"
                />
                <label for="s3q1" class="form-check-label"
                  >أقل من 500 دولار</label
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
                <label for="s3q2" class="form-check-label"
                  >500 دولار - 5000 دولار</label
                >
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
                <label for="s3q3" class="form-check-label"
                  >5000 دولار - 25000 دولار</label
                >
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
                <label for="s3q4" class="form-check-label"
                  >25000 دولار - 500000 دولار</label
                >
              </div>
            </div>
            <div class="item" v-if="step == 4">
              <div class="question-title">
                ما هي أهمية واجهة المستخدم لمنصة التداول بالنسبة لك؟
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q1"
                  value="1"
                />
                <label for="s4q1" class="form-check-label">غير مهم</label>
              </div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q2"
                  value="2"
                />
                <label for="s4q2" class="form-check-label">مهم إلى حد ما</label>
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
                <label for="s4q3" class="form-check-label">مهم جدا</label>
              </div>
            </div>
            <div class="item" v-if="step == 5 && finish == false">
              <div class="question-title">هل تفضل وسيط تداول بدون عمولة؟</div>
              <div class="form-check-custom">
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q1"
                  value="3"
                />
                <label for="s5q1" class="form-check-label">نعم</label>
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
                <label for="s5q2" class="form-check-label">لا</label>
              </div>
            </div>
            <div class="finish-block" v-if="finish == true">
              شكرا لك على إجابتك على السؤال. تم اقتراح قائمة الوسطاء بناءً على
              إجابتك!
            </div>
            <div class="btns">
              <button v-if="step != 5" @click="handleNext" class="next-btn">
                التالي
              </button>
              <button
                v-if="step == 5 && finish == false"
                @click="handleFinish"
                class="next-btn"
              >
                ينهي
              </button>
              <button
                @click="handleBack"
                v-if="step != 1 && finish == false"
                class="back-btn"
              >
                خلف
              </button>
              <button
                v-if="finish == true"
                @click="handleTryAgain"
                class="next-btn"
              >
                حاول ثانية
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
import { namespaced } from "../utils/utils";

@Component({
  name: "FindMyBroker",
  components: {},
})
export default class FindMyBroker extends Vue {
  @Action(namespaced(NS_COMPANY, FETCH_COMPANY_FINDER_RATING))
  fetchCompanyFinderRating;

  step = 1;
  finish = false;

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
        this.$toast.error("الرجاء الإجابة على السؤال!");
        return false;
      }
    } else if (this.step == 2) {
      if (!this.answers.q2) {
        this.$toast.error("الرجاء الإجابة على السؤال!");
        return false;
      }
    } else if (this.step == 3) {
      if (!this.answers.q3) {
        this.$toast.error("الرجاء الإجابة على السؤال!");
        return false;
      }
    } else if (this.step == 4) {
      if (!this.answers.q4) {
        this.$toast.error("الرجاء الإجابة على السؤال!");
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
        this.$toast.error("الرجاء الإجابة على السؤال!");
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
    background-color: white;
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
