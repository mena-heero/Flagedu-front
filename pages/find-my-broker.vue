<template>
  <div class="company-index">
    <div class="wrapper">
      <div class="title">{{ getCurrentPage.title }}</div>
      <div class="white-back">
        <div class="company-wrapper">
          <div class="question-block">
            <div class="title" v-if="finish == false">
              Question Number {{ step }}
            </div>
            <div class="title" v-if="finish == true">Congratulation</div>
            <div class="item" v-if="step == 1">
              <div class="question-title">
                How familiar are you with trading and investing?
              </div>
              <div class="form-check-custom">
                <label for="s1q1" class="form-check-label"
                  >i'm first-timer with no experience</label
                >
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q1"
                  value="1"
                />
              </div>
              <div class="form-check-custom">
                <label for="s1q2" class="form-check-label"
                  >I've already made a few simple transactions</label
                >
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q2"
                  value="2"
                />
              </div>
              <div class="form-check-custom">
                <label for="s1q3" class="form-check-label"
                  >i have experience with various products and different trading
                  strategies</label
                >
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q3"
                  value="3"
                />
              </div>
              <div class="form-check-custom">
                <label for="s1q4" class="form-check-label"
                  >I am a professional and fully confident</label
                >
                <input
                  v-model="answers.q1"
                  type="radio"
                  class="form-check-input me-2"
                  name="q1"
                  id="s1q4"
                  value="4"
                />
              </div>
            </div>
            <div class="item" v-if="step == 2">
              <div class="question-title">
                Choose the most important assets for you!
              </div>
              <div class="form-check-custom">
                <label for="s2q1" class="form-check-label"
                  >Stocks and ETFs (e.g. Apple or Tesla shares)</label
                >
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q1"
                  value="1"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q2" class="form-check-label"
                  >Forex (e.g. EURUSD or GBPUSD)</label
                >
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q2"
                  value="2"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q3" class="form-check-label"
                  >Options and futures
                </label>
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q3"
                  value="3"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q4" class="form-check-label"
                  >Funds (e.g. BlackRock Equity Dividend Fund)</label
                >
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q4"
                  value="4"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q5" class="form-check-label"
                  >CFDs (e.g. Apple share CFD)</label
                >
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q5"
                  value="5"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q6" class="form-check-label"
                  >Cryptos (e.g. Bitcoin or Ethereum)</label
                >
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q6"
                  value="6"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q7" class="form-check-label"
                  >Commodities(oil-gold)</label
                >
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q7"
                  value="7"
                />
              </div>
              <div class="form-check-custom">
                <label for="s2q8" class="form-check-label">I Don't Know</label>
                <input
                  v-model="answers.q2"
                  type="radio"
                  class="form-check-input me-2"
                  name="q2"
                  id="s2q8"
                  value="8"
                />
              </div>
            </div>
            <div class="item" v-if="step == 3">
              <div class="question-title">
                Brokers charge fees, not just for trading. How cost conscious
                are you?
              </div>
              <div class="form-check-custom">
                <label for="s3q1" class="form-check-label"
                  >I'm fine with reasonable fees if the services are
                  exceptional</label
                >
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q1"
                  value="1"
                />
              </div>
              <div class="form-check-custom">
                <label for="s3q2" class="form-check-label"
                  >I want to pay as little as possible in fees, I only need
                  basic functions</label
                >
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q2"
                  value="2"
                />
              </div>
              <div class="form-check-custom">
                <label for="s3q3" class="form-check-label"
                  >I want a zero-commission broker, I only want to pay what's
                  absolutely necessary</label
                >
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q3"
                  value="3"
                />
              </div>
              <div class="form-check-custom">
                <label for="s3q4" class="form-check-label">I Don't Know</label>
                <input
                  v-model="answers.q3"
                  type="radio"
                  class="form-check-input me-2"
                  name="q3"
                  id="s3q4"
                  value="4"
                />
              </div>
            </div>
            <div class="item" v-if="step == 4">
              <div class="question-title">
                How often do you want to deal with your investments and trades?
              </div>
              <div class="form-check-custom">
                <label for="s4q1" class="form-check-label">Daily</label>
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q1"
                  value="1"
                />
              </div>
              <div class="form-check-custom">
                <label for="s4q2" class="form-check-label">Weekly</label>
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q2"
                  value="2"
                />
              </div>
              <div class="form-check-custom">
                <label for="s4q3" class="form-check-label">Monthly</label>
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q3"
                  value="3"
                />
              </div>
              <div class="form-check-custom">
                <label for="s4q4" class="form-check-label">Yearly</label>
                <input
                  v-model="answers.q4"
                  type="radio"
                  class="form-check-input me-2"
                  name="q4"
                  id="s4q4"
                  value="4"
                />
              </div>
            </div>
            <div class="item" v-if="step == 5 && finish == false">
              <div class="question-title">
                How much money would you like to deposit?
              </div>
              <div class="form-check-custom">
                <label for="s5q1" class="form-check-label">Less than 50$</label>
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q1"
                  value="1"
                />
              </div>
              <div class="form-check-custom">
                <label for="s5q2" class="form-check-label">51$ - 200$</label>
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q2"
                  value="2"
                />
              </div>
              <div class="form-check-custom">
                <label for="s5q3" class="form-check-label">201$ - 500$</label>
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q3"
                  value="3"
                />
              </div>
              <div class="form-check-custom">
                <label for="s5q4" class="form-check-label">501$ - 1000$</label>
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q4"
                  value="4"
                />
              </div>
              <div class="form-check-custom">
                <label for="s5q5" class="form-check-label">1001$ - 2000$</label>
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q5"
                  value="5"
                />
              </div>
              <div class="form-check-custom">
                <label for="s5q6" class="form-check-label"
                  >More than 2000$</label
                >
                <input
                  v-model="answers.q5"
                  type="radio"
                  class="form-check-input me-2"
                  name="q5"
                  id="s5q6"
                  value="6"
                />
              </div>
            </div>
            <div class="finish-block" v-if="finish == true">
              Thank you for answering the question. The broker list is suggested
              based on your answer!
            </div>
            <div class="btns">
              <button
                @click="handleBack"
                v-if="step != 1 && finish == false"
                class="back-btn"
              >
                Back
              </button>
              <button v-if="step != 5" @click="handleNext" class="next-btn">
                Next
              </button>
              <button
                v-if="step == 5 && finish == false"
                @click="handleFinish"
                class="next-btn"
              >
                Finish
              </button>
              <button
                v-if="finish == true"
                @click="handleTryAgain"
                class="next-btn"
              >
                Try again
              </button>
            </div>
          </div>
          <div class="result-block">
            <div class="title">Your Broker List</div>
            <div class="companies">
              <div
                class="items-wrapper"
                v-for="(item, idx) in companies"
                :key="'company_' + idx"
              >
                <div class="item">
                  <div class="btn">
                    <nuxt-link class="hide-on-380" :to="item.html_url"
                      >Visit</nuxt-link
                    >
                    <nuxt-link class="visible-on-380" :to="item.html_url"
                      >Visit</nuxt-link
                    >
                  </div>
                  <div class="content">
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
                    <div class="image">
                      <img
                        :src="HOST + item.logo_detail.original.src"
                        :alt="item.logo_detail.original.alt"
                      />
                    </div>
                    <div class="rank">
                      <div>Top</div>
                      <div>{{ idx + 1 }}</div>
                    </div>
                  </div>
                </div>
                <div v-if="idx != companies.length - 1" class="divider"></div>
              </div>
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
  FETCH_FIND_BROKER_COMPANY,
} from "../utils/store/action.names";
import { namespaced } from "../utils/utils";

@Component({
  name: "FindMyBroker",
  components: {},
})
export default class FindMyBroker extends Vue {
  @Action(namespaced(NS_COMPANY, FETCH_FIND_BROKER_COMPANY))
  fetchFindBrokerCompany;

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
        this.$toast.error("Please answer the question!");
        return false;
      }
    } else if (this.step == 2) {
      if (!this.answers.q2) {
        this.$toast.error("Please answer the question!");
        return false;
      }
    } else if (this.step == 3) {
      if (!this.answers.q3) {
        this.$toast.error("Please answer the question!");
        return false;
      }
    } else if (this.step == 4) {
      if (!this.answers.q4) {
        this.$toast.error("Please answer the question!");
        return false;
      }
    }
    this.step += 1;
    if (this.step > 5) {
      this.step = 5;
    }
  }

  handleFinish() {
    if (this.step == 5) {
      if (!this.answers.q5) {
        this.$toast.error("Please answer the question!");
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

  handleFetchCompany() {
    var params = {
      sort_by_rating: 0,
    };
    this.fetchFindBrokerCompany(params).then((data) => {
      this.companies = data.results;
    });
  }

  async asyncData({ route, $axios, store }) {
    var getCurrentPage = {};
    const currentPageData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_CURRENT_PAGE), {
        html_path: route.path,
      })
      .then((data) => {
        getCurrentPage = data;
      })
      .catch((e) => {
        console.log(e);
      });

    var companies = null;

    const fetchCompanies = await store
      .dispatch(namespaced(NS_COMPANY, FETCH_FIND_BROKER_COMPANY), {
        sort_by_rating: 0,
      })
      .then((data) => {
        companies = data.results;
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
    text-align: right;
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
      grid-template-columns: 0.8fr 1fr;
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
        text-align: right;
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
    align-items: flex-end;
    .question-title {
      font-size: 18px;
      font-weight: 600;
      text-align: right;
    }
  }
  .btns {
    display: flex;
    gap: 15px;
    width: 100%;
    justify-content: flex-end;
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
            justify-content: flex-end;
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
  grid-template-columns: 5fr 0.2fr;
  gap: 10px;
  .form-check-label {
    text-align: right;
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
    text-align: right;
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
