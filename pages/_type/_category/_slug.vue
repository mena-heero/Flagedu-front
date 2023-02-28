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

@Component({
  name: "DetailPage",
  components: {
    description: DescriptionBlock,
    image_block: ImageBlock,
    banner: BannerBlock,
    button_block: ButtonBlock,
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
    width: 70%;
    margin: 0 auto;
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
    }
  }
}
</style>
