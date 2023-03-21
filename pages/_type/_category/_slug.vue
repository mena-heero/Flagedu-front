<template>
  <div class="company-index">
    <div class="wrapper">
      <div class="title">{{ getCurrentPage.title }}</div>
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
import { NS_COMMON } from "../../../utils/store/namespace.names";
import { FETCH_CURRENT_PAGE } from "../../../utils/store/action.names";
import { namespaced } from "../../../utils/utils";
import DescriptionBlock from "../../../components/blocks/DescriptionBlock";
import ImageBlock from "../../../components/blocks/ImageBlock";
import BannerBlock from "../../../components/blocks/BannerBlock";
import ButtonBlock from "../../../components/blocks/ButtonBlock";
import RatingReview from "../../../components/RatingReview";
import TableBlock from "../../../components/blocks/TableBlock";
import VideoBlock from "../../../components/blocks/VideoBlock";

@Component({
  name: "DetailPage",
  components: {
    description: DescriptionBlock,
    image_block: ImageBlock,
    banner: BannerBlock,
    button_block: ButtonBlock,
    table_block: TableBlock,
    video_block: VideoBlock,
    RatingReview,
  },
})
export default class DetailPage extends Vue {
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

    return {
      getCurrentPage,
    };
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
    width: 60%;
    margin: 0 auto;
    text-align: right;
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
    background-color: white;
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
</style>
