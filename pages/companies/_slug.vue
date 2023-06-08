<template>
  <div class="company-index">
    <div class="wrapper">
      <h1 class="title">
        {{ renderLocaleField(getCurrentPage, "title", $i18n.locale) }} Review
        {{ getYear }}
      </h1>
      <div class="sharing">
        <div class="share-text">يشارك:</div>
        <div class="item">
          <ShareNetwork
            network="facebook"
            :url="fullPath"
            :title="getPageTitle"
            :description="getSearchDescription"
          >
            <i class="bi bi-facebook share-icon"></i>
          </ShareNetwork>
        </div>
        <div class="item">
          <ShareNetwork
            network="twitter"
            :url="fullPath"
            :title="getPageTitle"
            :description="getSearchDescription"
          >
            <i class="bi bi-twitter share-icon"></i>
          </ShareNetwork>
        </div>
        <div class="item">
          <ShareNetwork
            network="telegram"
            :url="fullPath"
            :title="getPageTitle"
            :description="getSearchDescription"
          >
            <i class="bi bi-telegram share-icon"></i>
          </ShareNetwork>
        </div>
        <div class="item">
          <ShareNetwork
            network="Messenger"
            :url="fullPath"
            :title="getPageTitle"
            :description="getSearchDescription"
          >
            <i class="bi bi-messenger share-icon"></i>
          </ShareNetwork>
        </div>
        <div class="item">
          <ShareNetwork network="email" :url="fullPath" :title="getPageTitle">
            <i class="bi bi-envelope-fill share-icon"></i>
          </ShareNetwork>
        </div>
        <div class="item">
          <ShareNetwork
            network="whatsapp"
            :url="fullPath"
            :title="getPageTitle"
            :description="getSearchDescription"
          >
            <i class="bi bi-whatsapp share-icon"></i>
          </ShareNetwork>
        </div>
        <div class="item">
          <ShareNetwork
            network="linkedIn"
            :url="fullPath"
            :title="getPageTitle"
            :description="getSearchDescription"
          >
            <i class="bi bi-linkedin share-icon"></i>
          </ShareNetwork>
        </div>
      </div>
      <div class="white-back">
        <div class="company-wrapper">
          <div class="company-summary">
            <div class="basic-info">
              <div class="item">
                <div class="left">
                  <i class="bi bi-trophy"></i>
                  <div class="title">تقييم</div>
                </div>
                <div class="right">
                  <div class="rating">
                    <i
                      v-for="(rate, ridx) in totalFullStar(
                        getCurrentPage.rating
                      )"
                      :key="'ratef_' + ridx"
                      class="bi bi-star-fill rating-color"
                    ></i>
                    <i
                      v-for="(rate, ridx) in totalHalfStar(
                        getCurrentPage.rating
                      )"
                      :key="'rateh_' + ridx"
                      class="bi bi-star-half rating-color"
                    ></i>
                    <i
                      v-for="(rate, ridx) in totalEmptyStar(
                        getCurrentPage.rating
                      )"
                      :key="'ratee_' + ridx"
                      class="bi bi-star rating-color"
                    ></i>
                    <div class="rating-value">
                      ({{ getCurrentPage.rating }})
                    </div>
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-hammer"></i>
                  <div class="title">الهيئات التنظيمية</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    {{ getCurrentPage.regulatory_body }}
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-moon-stars"></i>
                  <div class="title">حساب اسلامي</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    {{ convertBoolean(getCurrentPage.is_islamic) }}
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-currency-dollar"></i>
                  <div class="title">الحد الأدنى للإيداع</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    ${{ getCurrentPage.minimum_deposit }}
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-headset"></i>
                  <div class="title">خدمة الزبائن</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    {{ getCurrentPage.customer_service }}
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-airplane-engines"></i>
                  <div class="title">حساب تجريبي</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    {{ convertBoolean(getCurrentPage.demo_account) }}
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-building"></i>
                  <div class="title">الفرع الرئيسي</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    {{
                      getCurrentPage.origin_branch
                        ? getCurrentPage.origin_branch.name
                        : ""
                    }}
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div class="item">
                <div class="left">
                  <i class="bi bi-activity"></i>
                  <div class="title">منصات التداول</div>
                </div>
                <div class="right">
                  <div class="item-value">
                    {{ getCurrentPage.trading_platforms }}
                  </div>
                </div>
              </div>
            </div>
            <div class="company-info">
              <div class="logo">
                <img
                  v-if="getCurrentPage.logo"
                  :src="HOST + getCurrentPage.logo.original.src"
                  :alt="getCurrentPage.logo.original.alt"
                />
              </div>
              <div
                class="short-desc"
                v-html="
                  renderLocaleField(
                    getCurrentPage,
                    'short_description',
                    $i18n.locale
                  )
                "
              ></div>
              <div class="account-open-btn">
                <a target="_blank" :href="getCurrentPage.account_open_link"
                  >فتح حساب</a
                >
              </div>
            </div>
          </div>
          <div
            v-for="(comp, idx) in getCurrentPage.body"
            :key="'component' + idx"
          >
            <company-evaluation-block
              v-if="comp.type == 'company_evaluation_block'"
              :key="'pageBody' + idx"
              :pageData="getCurrentPage"
            />
            <component
              v-else
              :key="'pageBody' + idx"
              :is="comp.type"
              :data="comp.value"
            ></component>
          </div>
        </div>
      </div>
    </div>
    <RatingReview :dataId="getCurrentPage.id" />
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
import { NS_COMMON } from "../../utils/store/namespace.names";
import { FETCH_CURRENT_PAGE } from "../../utils/store/action.names";
import {
  namespaced,
  convertBoolean,
  renderLocaleField,
  renderLocaleImage,
} from "../../utils/utils";
import DescriptionBlock from "../../components/blocks/DescriptionBlock";
import ImageBlock from "../../components/blocks/ImageBlock";
import BannerBlock from "../../components/blocks/BannerBlock";
import ButtonBlock from "../../components/blocks/ButtonBlock";
import RatingReview from "../../components/RatingReview";
import TableBlock from "../../components/blocks/TableBlock";
import CompanyEvaluationBlock from "../../components/blocks/CompanyEvaluationBlock";
import VideoBlock from "../../components/blocks/VideoBlock";

@Component({
  name: "CompanyDetailPage",
  components: {
    description: DescriptionBlock,
    image_block: ImageBlock,
    banner: BannerBlock,
    button_block: ButtonBlock,
    table_block: TableBlock,
    video_block: VideoBlock,
    CompanyEvaluationBlock,
    RatingReview,
  },
})
export default class CompanyDetailPage extends Vue {
  convertBoolean = convertBoolean;
  renderLocaleField = renderLocaleField;
  renderLocaleImage = renderLocaleImage;

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
        if (e.response.status === 404) {
          error({ statusCode: 404 });
        } else {
          error({ statusCode: 500 });
        }
      });

    return {
      getCurrentPage,
    };
  }

  get getYear() {
    const d = new Date();
    return d.getFullYear();
  }

  get HOST() {
    return this.$config.HOST;
  }
  mounted() {}

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

  get getOGImage() {
    if (this.getCurrentPage.og_img_original) {
      if (this.getCurrentPage.og_img_original.original) {
        return this.getCurrentPage.og_img_original.original.src;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  get prepareOGImageUrl() {
    if (this.getOGImage) {
      return this.HOST + this.getOGImage;
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
    return {
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
          hid: "og:image",
          property: "og:image",
          content: this.prepareOGImageUrl,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.fullPath,
        },
        {
          hid: "fb:app_id",
          property: "fb:app_id",
          content: this.$config.FB_APP_ID,
        },
      ],
    };
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
    width: 55%;
    margin: 0 auto;
    @media (max-width: 1250px) {
      width: 80%;
    }
    @media (max-width: 950px) {
      width: 95%;
    }
    @media (max-width: 850px) {
      width: 70%;
    }
    @media (max-width: 700px) {
      width: 80%;
    }
    @media (max-width: 500px) {
      width: 95%;
      font-size: 28px;
    }
    @media (max-width: 400px) {
      font-size: 24px;
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
      width: 55%;
      margin: 0 auto;
      @media (max-width: 1250px) {
        width: 80%;
      }
      @media (max-width: 950px) {
        width: 95%;
      }
      @media (max-width: 850px) {
        width: 70%;
      }
      @media (max-width: 700px) {
        width: 80%;
      }
      @media (max-width: 500px) {
        width: 95%;
      }
      @media (max-width: 400px) {
      }
    }
  }
}

.company-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 50px;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 700px) {
  }
  @media (max-width: 500px) {
  }
  @media (max-width: 400px) {
  }
  .company-info {
    width: 100%;
    height: 560px;
    background-color: #e5e7eb;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    padding-left: 40px;
    padding-right: 40px;
    @media (max-width: 500px) {
      height: auto;
      padding-left: 20px;
      padding-right: 20px;
    }
    @media (max-width: 400px) {
      height: auto;
      padding-left: 10px;
      padding-right: 10px;
    }
    .logo {
      height: 120px;
      img {
        height: 100%;
        max-width: 100%;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
    .short-desc {
      text-align: justify;
      font-size: 16px;
      line-height: 25px;
      font-weight: 500;
    }
    .account-open-btn {
      a {
        color: white;
        background-color: #01aeab;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
        font-weight: 600;
        border-radius: 8px;
        font-size: 18px;
      }
    }
  }
  .basic-info {
    width: 100%;
    height: 560px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: space-between;
    .divider {
      border: 0.5px solid #f1f1f1;
    }
    .item {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        i {
          color: black;
          font-size: 20px;
        }
        .title {
          font-size: 16px;
          font-weight: 600;
          width: 100%;
        }
      }
      .right {
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
          }
        }
        .item-value {
        }
      }
    }
  }
}
.sharing {
  width: 55%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 950px) {
    width: 95%;
  }
  @media (max-width: 850px) {
    width: 70%;
  }
  @media (max-width: 700px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 95%;
    font-size: 28px;
  }
  @media (max-width: 400px) {
    font-size: 24px;
  }

  .share-text {
    color: black;
    font-size: 14px;
    font-weight: 600;
  }
  .item {
  }
}

.share-icon {
  font-size: 25px;
  color: black;
}
</style>
