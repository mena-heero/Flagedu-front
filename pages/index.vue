<template>
  <div>
    <Story :stories="stories" />
  </div>
</template>

<script>
import { Component, Vue, Action } from "nuxt-property-decorator";
import Story from "../components/index/Story";
import { FETCH_STORY } from "../utils/store/action.names";
import { NS_COMMON } from "../utils/store/namespace.names";
import { namespaced } from "../utils/utils";

@Component({
  name: "Index",
  components: {
    Story,
  },
})
export default class Index extends Vue {
  async asyncData({ route, $axios, store }) {
    var stories = [];
    const slideData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_STORY))
      .then((data) => {
        stories = data.results;
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      stories,
    };
  }
}
</script>

<style scoped lang="scss"></style>
