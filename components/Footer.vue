<template>
  <div>
    <footer>
      <div class="company-item">
        <div class="image">
          <img
            :src="HOST + getGlobalSettings.company_logo.original.src"
            :alt="getGlobalSettings.company_logo.original.alt"
          />
        </div>
        <div class="socials">
          <div v-if="getSocialSettings.facebook" class="item">
            <a :href="getSocialSettings.facebook">
              <i class="bi bi-facebook"></i>
            </a>
          </div>
          <div v-if="getSocialSettings.instagram" class="item">
            <a :href="getSocialSettings.instagram">
              <i class="bi bi-instagram"></i>
            </a>
          </div>
          <div v-if="getSocialSettings.linkedin" class="item">
            <a :href="getSocialSettings.linkedin">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
          <div v-if="getSocialSettings.youtube" class="item">
            <a :href="getSocialSettings.youtube">
              <i class="bi bi-youtube"></i>
            </a>
          </div>
          <div v-if="getSocialSettings.tiktok" class="item">
            <a :href="getSocialSettings.tiktok">
              <i class="bi bi-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
      <div
        class="item"
        v-for="(item, idx) in getFootermenu"
        :key="'footer_' + idx"
      >
        <div class="title">
          {{ item.title }}
        </div>
        <div class="submenu">
          <div
            class="submenu-item"
            v-for="(submenu, sidx) in item.submenus"
            :key="'submenu_' + sidx"
          >
            <a v-if="submenu.is_external == true" :href="submenu.link_url">{{
              submenu.link_title
            }}</a>
            <nuxt-link
              v-if="submenu.is_external == false"
              :to="submenu.link_url"
              >{{ submenu.link_title }}</nuxt-link
            >
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action } from "nuxt-property-decorator";
import { namespaced } from "~/utils/utils";
import {} from "../utils/store/action.names";
import {
  GET_PROFILE,
  GET_FOOTERMENU,
  GET_GLOBAL_SETTINGS,
  GET_SOCIAL_SETTINGS,
} from "../utils/store/getter.names";
import { NS_USER, NS_COMMON } from "../utils/store/namespace.names";

@Component({
  name: "Footer",
  components: {},
})
export default class Footer extends Vue {
  @Getter(namespaced(NS_COMMON, GET_FOOTERMENU)) getFootermenu;
  @Getter(namespaced(NS_COMMON, GET_GLOBAL_SETTINGS)) getGlobalSettings;
  @Getter(namespaced(NS_COMMON, GET_SOCIAL_SETTINGS)) getSocialSettings;

  get HOST() {
    return this.$config.HOST;
  }
}
</script>

<style scoped lang="scss">
footer {
  background-color: #1f3241;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 20px;
  padding: 50px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1250px) {
    gap: 15px;
    padding: 25px;
  }
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .item {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;

    @media (max-width: 1250px) {
      gap: 20px;
    }
    @media (max-width: 700px) {
      width: 100%;
    }
    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
      @media (max-width: 1250px) {
        font-size: 16px;
      }
      @media (max-width: 700px) {
        text-align: center;
      }
    }
    .submenu {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .submenu-item {
        display: flex;
        a {
          color: #a5adb3;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          @media (max-width: 1250px) {
            font-size: 14px;
          }
          @media (max-width: 700px) {
            text-align: center;
            width: 100%;
          }
        }
      }
    }
  }
  .company-item {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    .image {
      width: 213px;
      height: 126px;
      @media (max-width: 1250px) {
        width: 180px;
        height: 100px;
      }
      @media (max-width: 700px) {
        width: 140px;
        height: 80px;
      }
      img {
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        max-width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
    .socials {
      display: flex;
      gap: 15px;
      height: 20px;
      i {
        color: #fff;
        font-size: 30px;
        @media (max-width: 1250px) {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
