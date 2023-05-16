<template>
  <div class="company-index">
    <div class="wrapper">
      <h1 class="title">مقارنة الوسطاء عبر الإنترنت</h1>
      <div class="white-back">
        <div class="company-wrapper">
          <div class="select-company-wrapper">
            <div class="company-list">
              <div class="company-item">
                <div
                  class="no-company"
                  @click="handleOpenCompanySearch(1)"
                  v-if="!companyInput.company1"
                >
                  <div class="add-company-title">أضف شركة</div>
                  <i class="bi bi-plus-lg icon-big"></i>
                </div>
                <div class="has-company" v-if="companyDetail.company1">
                  <div class="close-btn">
                    <i class="bi bi-x" @click="handleRemove(1)"></i>
                  </div>
                  <div class="image">
                    <img
                      :src="
                        HOST + companyDetail.company1.logo_detail.original.src
                      "
                      :alt="companyDetail.company1.logo_detail.original.alt"
                    />
                  </div>
                  <div class="company-name">
                    {{ companyDetail.company1.title }}
                  </div>
                  <nuxt-link
                    class="visit-broker-btn"
                    :to="companyDetail.company1.html_url"
                  >
                    قم بزيارة وسيط
                  </nuxt-link>
                </div>
              </div>
              <div class="company-item">
                <div
                  class="no-company"
                  @click="handleOpenCompanySearch(2)"
                  v-if="!companyInput.company2"
                >
                  <div class="add-company-title">أضف شركة</div>
                  <i class="bi bi-plus-lg icon-big"></i>
                </div>
                <div class="has-company" v-if="companyDetail.company2">
                  <div class="close-btn">
                    <i class="bi bi-x" @click="handleRemove(2)"></i>
                  </div>
                  <div class="image">
                    <img
                      :src="
                        HOST + companyDetail.company2.logo_detail.original.src
                      "
                      :alt="companyDetail.company2.logo_detail.original.alt"
                    />
                  </div>
                  <div class="company-name">
                    {{ companyDetail.company2.title }}
                  </div>
                  <nuxt-link
                    class="visit-broker-btn"
                    :to="companyDetail.company2.html_url"
                  >
                    قم بزيارة وسيط
                  </nuxt-link>
                </div>
              </div>
              <div class="company-item">
                <div
                  class="no-company"
                  @click="handleOpenCompanySearch(3)"
                  v-if="!companyInput.company3"
                >
                  <div class="add-company-title">أضف شركة</div>
                  <i class="bi bi-plus-lg icon-big"></i>
                </div>
                <div class="has-company" v-if="companyDetail.company3">
                  <div class="close-btn">
                    <i class="bi bi-x" @click="handleRemove(3)"></i>
                  </div>
                  <div class="image">
                    <img
                      :src="
                        HOST + companyDetail.company3.logo_detail.original.src
                      "
                      :alt="companyDetail.company3.logo_detail.original.alt"
                    />
                  </div>
                  <div class="company-name">
                    {{ companyDetail.company3.title }}
                  </div>
                  <nuxt-link
                    class="visit-broker-btn"
                    :to="companyDetail.company3.html_url"
                  >
                    قم بزيارة وسيط
                  </nuxt-link>
                </div>
              </div>
              <div class="company-item">
                <div
                  class="no-company"
                  @click="handleOpenCompanySearch(4)"
                  v-if="!companyInput.company4"
                >
                  <div class="add-company-title">أضف شركة</div>
                  <i class="bi bi-plus-lg icon-big"></i>
                </div>
                <div class="has-company" v-if="companyDetail.company4">
                  <div class="close-btn">
                    <i class="bi bi-x" @click="handleRemove(4)"></i>
                  </div>
                  <div class="image">
                    <img
                      :src="
                        HOST + companyDetail.company4.logo_detail.original.src
                      "
                      :alt="companyDetail.company4.logo_detail.original.alt"
                    />
                  </div>
                  <div class="company-name">
                    {{ companyDetail.company4.title }}
                  </div>
                  <nuxt-link
                    class="visit-broker-btn"
                    :to="companyDetail.company4.html_url"
                  >
                    قم بزيارة وسيط
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>البيانات الأساسية للوسيط</div>
            </div>
            <div class="company-content-wrapper">
              <BasicData :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>حساب اسلامي</div>
            </div>
            <div class="company-content-wrapper">
              <IslamicAccount :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>مصاريف</div>
            </div>
            <div class="company-content-wrapper">
              <FeesBlock :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>الإيداع والسحب</div>
            </div>
            <div class="company-content-wrapper">
              <DepositWithdraw :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>منصات التداول</div>
            </div>
            <div class="company-content-wrapper">
              <TradingPlatform :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>السوق والمنتجات</div>
            </div>
            <div class="company-content-wrapper">
              <MarketsProducts :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>حماية</div>
            </div>
            <div class="company-content-wrapper">
              <SecurityBlock :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>خدمة الزبائن</div>
            </div>
            <div class="company-content-wrapper">
              <CustomerServiceBlock :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>البحث و التنمية</div>
            </div>
            <div class="company-content-wrapper">
              <ResearchDevelopmentBlock :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>حساب تجريبي</div>
            </div>
            <div class="company-content-wrapper">
              <DemoAccount :companyDetail="companyDetail" />
            </div>
          </div>
          <div class="detail-company-wrapper">
            <div class="block-title">
              <i class="bi bi-caret-up-fill"></i>
              <div>الرافعه الماليه</div>
            </div>
            <div class="company-content-wrapper">
              <Leverage :companyDetail="companyDetail" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <CompanySearchModal
      v-if="openCompanySearchModal == true"
      :modalOpen="openCompanySearchModal"
      :position="selectedPosition"
      @hideModal="hideModal"
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
import { NS_COMMON, NS_COMPANY } from "../utils/store/namespace.names";
import {
  FETCH_CURRENT_PAGE,
  FETCH_COMPANY_DETAIL,
} from "../utils/store/action.names";
import { namespaced, deepCopy } from "../utils/utils";
import CompanySearchModal from "../components/modals/CompanySearchModal";
import BasicData from "../components/compare/BasicData";
import FeesBlock from "../components/compare/FeesBlock";
import IslamicAccount from "../components/compare/IslamicAccount";
import DepositWithdraw from "../components/compare/DepositWithdraw";
import TradingPlatform from "../components/compare/TradingPlatform";
import MarketsProducts from "../components/compare/MarketsProducts";
import SecurityBlock from "../components/compare/SecurityBlock";
import CustomerServiceBlock from "../components/compare/CustomerServiceBlock";
import ResearchDevelopmentBlock from "../components/compare/ResearchDevelopmentBlock";
import DemoAccount from "../components/compare/DemoAccount";
import Leverage from "../components/compare/Leverage";

@Component({
  name: "ComparePage",
  components: {
    CompanySearchModal,
    BasicData,
    FeesBlock,
    IslamicAccount,
    DepositWithdraw,
    TradingPlatform,
    MarketsProducts,
    SecurityBlock,
    CustomerServiceBlock,
    ResearchDevelopmentBlock,
    DemoAccount,
    Leverage,
  },
})
export default class ComparePage extends Vue {
  @Action(namespaced(NS_COMPANY, FETCH_COMPANY_DETAIL)) fetchCompanyDetail;

  openCompanySearchModal = false;
  selectedPosition = 1;

  handleOpenCompanySearch(position) {
    this.selectedPosition = position;
    this.openCompanySearchModal = true;
  }

  handleRemove(position) {
    if (position == 1) {
      this.companyInput.company1 = null;
      this.companyDetail.company1 = null;
    } else if (position == 2) {
      this.companyInput.company2 = null;
      this.companyDetail.company2 = null;
    } else if (position == 3) {
      this.companyInput.company3 = null;
      this.companyDetail.company3 = null;
    } else if (position == 4) {
      this.companyInput.company4 = null;
      this.companyDetail.company4 = null;
    }

    var q = deepCopy(this.$route.query);
    var companies = q.company;
    var companyList = companies.split("-");
    companyList[position - 1] = "";
    var d = companyList.join("-");
    this.$router.push({ query: { company: d } });
  }

  handleFetchCompanyDetail(id, position) {
    this.fetchCompanyDetail({ id: id }).then((data) => {
      if (position == 1) {
        this.companyDetail.company1 = data;
      } else if (position == 2) {
        this.companyDetail.company2 = data;
      } else if (position == 3) {
        this.companyDetail.company3 = data;
      } else if (position == 4) {
        this.companyDetail.company4 = data;
      }
    });
  }

  hideModal(data) {
    this.openCompanySearchModal = false;
    if (data) {
      var pos = data.position;
      var item = data.item;
      if (pos == 1) {
        this.companyInput.company1 = item;
      } else if (pos == 2) {
        this.companyInput.company2 = item;
      } else if (pos == 3) {
        this.companyInput.company3 = item;
      } else if (pos == 4) {
        this.companyInput.company4 = item;
      }
      var q = deepCopy(this.$route.query);
      if (q.company) {
        var all_q = q.company.split("-");
        all_q[pos - 1] = item.id;
        var d = all_q.join("-");
        this.$router.push({ query: { company: d } });
      } else {
        var p = ["", "", "", ""];
        p[pos - 1] = item.id;
        var d = p.join("-");
        this.$router.push({ query: { company: d } });
      }
      this.handleFetchCompanyDetail(item.id, pos);
    }
  }

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

    var companyInput = {
      company1: null,
      company2: null,
      company3: null,
      company4: null,
    };

    var companyDetail = {
      company1: null,
      company2: null,
      company3: null,
      company4: null,
    };
    var companies = route.query.company;
    if (companies) {
      var companyList = companies.split("-");
      for (var i = 0; i < companyList.length; i++) {
        if (companyList[i]) {
          await store
            .dispatch(namespaced(NS_COMPANY, FETCH_COMPANY_DETAIL), {
              id: companyList[i],
            })
            .then((data) => {
              if (i == 0) {
                companyDetail.company1 = data;
                companyInput.company1 = {
                  html_url: data.html_url,
                  id: data.id,
                  logo_detail: data.logo_detail,
                  rating: data.rating,
                  title: data.title,
                };
              } else if (i == 1) {
                companyDetail.company2 = data;
                companyInput.company2 = {
                  html_url: data.html_url,
                  id: data.id,
                  logo_detail: data.logo_detail,
                  rating: data.rating,
                  title: data.title,
                };
              } else if (i == 2) {
                companyDetail.company3 = data;
                companyInput.company3 = {
                  html_url: data.html_url,
                  id: data.id,
                  logo_detail: data.logo_detail,
                  rating: data.rating,
                  title: data.title,
                };
              } else if (i == 3) {
                companyDetail.company4 = data;
                companyInput.company4 = {
                  html_url: data.html_url,
                  id: data.id,
                  logo_detail: data.logo_detail,
                  rating: data.rating,
                  title: data.title,
                };
              }
            })
            .catch((e) => {
              if (e.response.status === 404) {
                error({ statusCode: 404 });
              } else {
                error({ statusCode: 500 });
              }
            });
        }
      }
    }

    return {
      getCurrentPage,
      companyDetail,
      companyInput,
    };
  }
  mounted() {}

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
}
</script>

<style lang="scss">
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
      width: 90%;
    }
    @media (max-width: 950px) {
    }
    @media (max-width: 700px) {
      width: 95%;
    }
    @media (max-width: 500px) {
    }
    @media (max-width: 450px) {
      font-size: 22px;
    }
    @media (max-width: 350px) {
    }
  }
  .white-back {
    background-color: white;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .company-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 70%;
      margin: 0 auto;
      @media (max-width: 1250px) {
        width: 95%;
      }
      @media (max-width: 950px) {
      }
      @media (max-width: 700px) {
      }
      @media (max-width: 500px) {
      }
      @media (max-width: 450px) {
      }
      @media (max-width: 350px) {
      }
    }
  }
}

.select-company-wrapper {
  box-shadow: 0 4px 2px -1px gray;
  padding-bottom: 30px;
  padding-top: 10px;
  @media (max-width: 700px) {
    box-shadow: none;
    border-bottom: 1px solid gray;
  }
  .company-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 700px) {
      grid-template-columns: repeat(4, 200px);
      overflow: hidden;
      overflow-x: scroll;
      padding-bottom: 15px;
    }
    .company-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .no-company {
        border: 1px solid #dfdfdf;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
        cursor: pointer;

        @media (max-width: 1250px) {
        }
        @media (max-width: 950px) {
          padding: 8px;
        }
        @media (max-width: 700px) {
          padding: 5px;
        }
        @media (max-width: 500px) {
        }
        @media (max-width: 450px) {
        }
        @media (max-width: 350px) {
        }

        .add-company-title {
          font-size: 22px;
          font-weight: 600;
          color: grey;
          @media (max-width: 950px) {
            font-size: 16px;
          }
          @media (max-width: 700px) {
            font-size: 14px;
          }
          @media (max-width: 500px) {
          }
          @media (max-width: 450px) {
          }
          @media (max-width: 350px) {
          }
        }
      }
      .has-company {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: center;
        position: relative;
        .close-btn {
          position: absolute;
          top: -20px;
          right: -10px;
          @media (max-width: 700px) {
            top: -10px;
          }
          i {
            font-size: 26px;
            cursor: pointer;
          }
        }
        .image {
          height: 80px;
          width: 80px;
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
        .company-name {
          text-align: center;
          font-size: 18px;
          font-weight: 600;
        }
        .visit-broker-btn {
          padding-left: 15px;
          padding-right: 15px;
          padding-top: 10px;
          padding-bottom: 10px;
          background-color: #01aeab;
          color: white;
          font-size: 14px;
          font-weight: 500;
          border-radius: 10px;
        }
      }
    }
  }
}

.detail-company-wrapper {
  padding-bottom: 30px;
  padding-top: 10px;
  .block-title {
    font-size: 18px;
    font-weight: 600;
    display: flex;
    gap: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid grey;
    i {
      cursor: pointer;
    }
  }
  .company-content {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    @media (max-width: 700px) {
      grid-template-columns: repeat(4, 200px);
      overflow: hidden;
      overflow-x: scroll;
      padding-bottom: 15px;
    }
  }
}

.icon-big {
  font-size: 40px;
  font-weight: bold;
  color: grey;
  @media (max-width: 1250px) {
  }
  @media (max-width: 950px) {
    font-size: 22px;
  }
  @media (max-width: 700px) {
    font-size: 18px;
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 450px) {
  }
  @media (max-width: 350px) {
  }
}
.icon-angle-up {
  font-size: 30px;
  font-weight: bold;
}

.rating {
  display: flex;
  justify-content: center;
  gap: 5px;
  width: 100%;
  .rating-value {
    font-size: 18px;
    font-weight: 700;
    color: #000;
    @media (max-width: 1050px) {
      font-size: 14px;
    }
    @media (max-width: 700px) {
      font-size: 14px;
    }
  }
}

.rating-color {
  @media (max-width: 700px) {
    font-size: 15px;
  }
}
</style>
