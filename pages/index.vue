<template>
  <div>
    <!-- <Story :stories="stories" /> -->
    <div v-for="(comp, idx) in getCurrentPage.body" :key="'component' + idx">
      <component
        :key="'pageBody' + idx"
        :is="comp.type"
        :data="comp.value"
      ></component>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Action } from "nuxt-property-decorator";
import ArticleBlock from "../components/index/ArticleBlock";
import BrokerSurveyBlock from "../components/index/BrokerSurveyBlock";
import CompanyBlock from "../components/index/CompanyBlock";
import NewsBlock from "../components/index/NewsBlock";
import Story from "../components/index/Story";
import TwoColumnTextImageBlock from "../components/index/TwoColumnTextImageBlock";
import TradingViewComponent from "../components/tradingview/TradingViewComponent";
import { FETCH_STORY, FETCH_CURRENT_PAGE } from "../utils/store/action.names";
import { NS_COMMON } from "../utils/store/namespace.names";
import { namespaced } from "../utils/utils";

@Component({
  name: "Index",
  components: {
    Story,
    currency_rate_block: TradingViewComponent,
    broker_survey_block: BrokerSurveyBlock,
    companies: CompanyBlock,
    news: NewsBlock,
    articles: ArticleBlock,
    two_column_text_image_block: TwoColumnTextImageBlock,
  },
})
export default class Index extends Vue {
  async asyncData({ route, $axios, store, error }) {
    var stories = [];
    const soryData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_STORY))
      .then((data) => {
        stories = data.results;
      })
      .catch((e) => {
        console.log(e);
      });

    var getCurrentPage = {};
    const currentPageData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_CURRENT_PAGE), { html_path: "/" })
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
    return {
      stories,
      getCurrentPage,
    };
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

<style scoped lang="scss"></style>
