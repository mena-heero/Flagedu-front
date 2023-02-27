<template>
  <div>
    <footer>
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
import { NS_AUTH, NS_COMMON } from "../utils/store/namespace.names";

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
  grid-template-columns: 1fr 1fr 1fr 2fr;
  gap: 20px;
  padding: 50px;
  .item {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 30px;
    .title {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
      color: #ffffff;
      text-align: right;
    }
    .submenu {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .submenu-item {
        display: flex;
        justify-content: flex-end;
        a {
          text-align: right;
          color: #a5adb3;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
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
      }
    }
  }
}
</style>
