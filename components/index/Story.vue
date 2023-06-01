<template>
  <div>
    <div class="story-container">
      <!-- <div class="title">قصة اليوم</div> -->
      <div class="title">{{ $t("story_title") }}</div>

      <div class="story-image-container" dir="ltr">
        <vue-horizontal snap="center">
          <section v-for="(item, idx) in stories" :key="'item_' + idx">
            <img
              @click="openModal(idx)"
              :src="HOST + item.image_detail.original.src"
              :alt="item.image_detail.original.alt"
            />
          </section>
        </vue-horizontal>
      </div>
    </div>
    <StoryModal
      v-if="storyModalOpen"
      :modalOpen="storyModalOpen"
      :stories="stories"
      :storyIndex="storyIndex"
      @hideModal="hideModal"
    />
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import { Swiper, Navigation, Pagination, Autoplay } from "swiper";
import StoryModal from "../modals/StoryModal";

import VueHorizontal from "vue-horizontal";

@Component({
  name: "Story",
  components: {
    Swiper,
    Navigation,
    Pagination,
    Autoplay,
    StoryModal,
    VueHorizontal,
  },
})
export default class Story extends Vue {
  @Prop() stories;

  storyModalOpen = false;
  storyIndex = 0;

  get HOST() {
    return this.$config.HOST;
  }

  openModal(idx) {
    this.storyIndex = idx;
    this.storyModalOpen = true;
  }

  hideModal() {
    this.storyModalOpen = false;
  }

  mounted() {}
}
</script>

<style scoped lang="scss">
.story-container {
  height: auto;
  .title {
    width: 100%;
    margin: 0 auto;
    font-size: 26px;
    font-weight: 700;
    padding-top: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
}

.story-image-container {
  margin-top: 20px;
  margin-right: 20px;
  padding-bottom: 0px;
  width: 60%;
  margin: 0 auto;
  @media (max-width: 1250px) {
    width: 80%;
  }
  @media (max-width: 950px) {
    width: 90%;
  }
  @media (max-width: 750px) {
    font-size: 100%;
  }
}

section {
  cursor: pointer;
  img {
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
    width: 100px;
    height: 100px;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 100%;
  }
}

::v-deep .v-hl-container {
  gap: 20px !important;
  justify-content: center;
}
</style>
