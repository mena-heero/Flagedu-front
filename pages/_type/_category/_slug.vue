<template>
  <div class="company-index">
    <div class="wrapper">
      <h1 class="title">
        {{ renderLocaleField(getCurrentPage, "title", $i18n.locale) }}
      </h1>
      <div class="sharing">
        <div class="share-text">{{ $t("share") }}</div>
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
          <div
            v-for="(comp, idx) in getCurrentPage.body"
            :key="'component' + idx"
          >
            <component
              :key="'pageBody' + idx"
              :is="comp.type"
              :data="comp.value"
            ></component>
          </div>
        </div>
        <div
          class="save-button"
          v-if="getProfile && $route.params.type == 'articles'"
        >
          <button @click="handleAddSavedTopic" v-if="isExists == false">
            <span v-if="loading == false"
              ><i class="bi bi-heart-fill"></i>
              {{ $t("Save_this_article") }}
            </span>
            <span v-else>Loading...</span>
          </button>
          <button @click="handleRemoveSavedTopic" v-if="isExists == true">
            {{ $t("Remove_from_saved") }}
            <span v-if="loading == false"> </span>
            <span v-else>Loading...</span>
          </button>
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

import {
  NS_COMMON,
  NS_COMPANY,
  NS_USER,
} from "../../../utils/store/namespace.names";
import {
  FETCH_CURRENT_PAGE,
  ADD_SAVED_TOPIC,
  CHECK_SAVED_TOPIC_EXISTS,
  DELETE_SAVED_TOPIC,
} from "../../../utils/store/action.names";
import { namespaced, renderLocaleField } from "../../../utils/utils";
import DescriptionBlock from "../../../components/blocks/DescriptionBlock";
import ImageBlock from "../../../components/blocks/ImageBlock";
import BannerBlock from "../../../components/blocks/BannerBlock";
import ButtonBlock from "../../../components/blocks/ButtonBlock";
import RatingReview from "../../../components/RatingReview";
import TableBlock from "../../../components/blocks/TableBlock";
import CustomTableBlock from "../../../components/blocks/CustomTableBlock";
import VideoBlock from "../../../components/blocks/VideoBlock";
import { GET_PROFILE } from "../../../utils/store/getter.names";

@Component({
  name: "DetailPage",
  components: {
    description: DescriptionBlock,
    image_block: ImageBlock,
    banner: BannerBlock,
    button_block: ButtonBlock,
    table_block: TableBlock,
    video_block: VideoBlock,
    custom_table_block: CustomTableBlock,
    RatingReview,
  },
})
export default class DetailPage extends Vue {
  @Getter(namespaced(NS_USER, GET_PROFILE)) getProfile;

  @Action(namespaced(NS_COMPANY, ADD_SAVED_TOPIC)) addSavedTopic;
  @Action(namespaced(NS_COMPANY, CHECK_SAVED_TOPIC_EXISTS))
  checkSavedTopicExists;
  @Action(namespaced(NS_COMPANY, DELETE_SAVED_TOPIC)) deleteSavedTopic;

  formData = {
    type: 1,
    articles: "",
  };
  loading = false;
  renderLocaleField = renderLocaleField;

  handleAddSavedTopic() {
    this.loading = true;
    this.formData["articles"] = this.getCurrentPage.id;
    this.addSavedTopic(this.formData)
      .then((data) => {
        this.isExists = true;
        this.savedTopicId = data.id;
        this.loading = false;
        this.$toast.success($t("success_saved"));
      })
      .catch((e) => {
        this.loading = false;
        this.$toast.error($t("error"));
      });
  }

  handleRemoveSavedTopic() {
    this.loading = true;
    this.deleteSavedTopic({ id: this.savedTopicId })
      .then((data) => {
        this.isExists = false;
        this.savedTopicId = null;
        this.loading = false;
        this.$toast.success($t("success_remove"));
      })
      .catch((e) => {
        this.loading = false;
        this.$toast.error($t("error"));
      });
  }

  async asyncData({ route, $axios, store, error }) {
    var topicType = route.params.type;
    var getCurrentPage = {};
    var isExists = false;
    var savedTopicId = null;

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

    const checkExist = await store
      .dispatch(namespaced(NS_COMPANY, CHECK_SAVED_TOPIC_EXISTS), {
        type: 1,
        obj_id: getCurrentPage.id,
      })
      .then((data) => {
        if (data.exists == true) {
          isExists = true;
          savedTopicId = data.id;
        }
      })
      .catch((e) => {
        isExists = false;
      });

    return {
      getCurrentPage,
      isExists,
      savedTopicId,
    };
  }
  mounted() {}

  get HOST() {
    return this.$config.HOST;
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
          hid: "og:image",
          property: "og:image",
          content: this.prepareOGImageUrl,
        },
        {
          hid: "fb:app_id",
          property: "fb:app_id",
          content: this.$config.FB_APP_ID,
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
    width: 60%;
    margin: 0 auto;
    @media (max-width: 1250px) {
      width: 80%;
      font-size: 30px;
    }
    @media (max-width: 950px) {
    }
    @media (max-width: 700px) {
      font-size: 26px;
    }
    @media (max-width: 500px) {
      font-size: 22px;
    }
    @media (max-width: 400px) {
      width: 95%;
      font-size: 20px;
    }
  }
  .white-back {
    // background-color: white;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .company-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 60%;
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
        width: 95%;
      }
    }
  }
}
.sharing {
  width: 60%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 1250px) {
    width: 80%;
    font-size: 30px;
  }
  @media (max-width: 950px) {
  }
  @media (max-width: 700px) {
    font-size: 26px;
  }
  @media (max-width: 500px) {
    font-size: 22px;
  }
  @media (max-width: 400px) {
    width: 95%;
    font-size: 20px;
  }

  .share-text {
    // color: black;
    font-size: 14px;
    font-weight: 600;
  }
  .item {
  }
}

.share-icon {
  font-size: 25px;
  // color: black;
}

.save-button {
  width: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin-top: 50px;
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
    width: 95%;
  }
  button {
    background: $button-bg;
    border: 0;
    border-radius: 50px;
    font-weight: 500;
    font-size: 16px;
    color: $primary-color !important;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
