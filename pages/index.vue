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
}
</script>

<style scoped lang="scss"></style>
