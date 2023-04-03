<template>
  <div>
    <div class="story-container">
      <div class="title">قصة اليوم</div>
      <div class="story-image-container">
        <div class="story-images">
          <div class="swiper">
            <div class="swiper-wrapper">
              <div
                v-for="(item, idx) in stories"
                :key="'item_' + idx"
                class="swiper-slide"
              >
                <div class="slider-content">
                  <a
                    v-if="item.is_external == true"
                    target="_blank"
                    href="https://google.com"
                  >
                    <img :src="HOST + item.image_detail.original.src" />
                  </a>
                  <nuxt-link
                    v-else-if="item.link && item.link != null"
                    :to="item.link"
                  >
                    <img :src="HOST + item.image_detail.original.src" />
                  </nuxt-link>
                  <a v-else>
                    <img :src="HOST + item.image_detail.original.src" />
                  </a>
                </div>
              </div>
            </div>

            <div class="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action, Prop } from "nuxt-property-decorator";
import { Swiper, Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";

@Component({
  name: "Story",
  components: {
    Swiper,
    Navigation,
    Pagination,
    Autoplay,
  },
})
export default class Story extends Vue {
  @Prop() stories;

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {
    Swiper.use([Navigation, Pagination, Autoplay]);

    const swiper = new Swiper(".swiper", {
      direction: "horizontal",
      loop: true,
      slidesPerView: 5,
      spaceBetween: 20,
      modules: [Navigation, Pagination, Autoplay],
      pagination: {
        el: ".swiper-pagination",
        type: "bullets",
        clickable: true,
      },
      // autoplay: {
      //   delay: 3000,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
</script>

<style scoped lang="scss">
.story-container {
  height: auto;
  .title {
    width: 80%;
    margin: 0 auto;
    font-size: 26px;
    font-weight: 700;
    padding-top: 20px;
  }
}

.story-image-container {
  display: flex;
  margin-top: 20px;
  padding-bottom: 0px;
  .story-images {
    width: 70%;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
}
.swiper {
  height: 120px;
  overflow: hidden;
  position: relative;
  width: 86%;
  @media (max-width: 700px) {
    width: 100%;
  }
}
.swiper-slide {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 120px !important;
  width: 120px !important;
}
.slider-content {
  color: #000;
  height: 120px !important;
  width: 120px !important;
  img {
    flex-shrink: 0;
    -webkit-flex-shrink: 0;
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    border-radius: 100%;
  }
}
.swiper-button-prev {
  background: white;
  height: 44px;
  width: 44px;
  border-radius: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  &::after {
    font-size: 20px !important;
  }
}
</style>
