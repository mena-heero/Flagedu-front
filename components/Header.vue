<template>
  <div>
    <div class="navbar">
      <div class="nav">
        <div class="logo">
          <nuxt-link to="/">
            <img
              :src="HOST + getGlobalSettings.company_logo.original.src"
              :alt="getGlobalSettings.company_logo.original.alt"
            />
          </nuxt-link>
        </div>
        <div class="nav-item-container">
          <nuxt-link v-if="!getProfile" to="/signin" class="nav-item hide"
            >تسجيل الدخول</nuxt-link
          >
          <a
            v-if="!getProfile"
            href="#"
            class="nav-item mobile-visible-block"
            @click.prevent="mobileSideMenuOpen = true"
            ><i class="bi bi-list icon-big"></i
          ></a>
          <nuxt-link
            to="/profile"
            v-if="getProfile"
            class="nav-item profile-img hide"
          >
            <img
              v-if="getProfile.profile_image_detail"
              :src="HOST + getProfile.profile_image_detail.original.src"
              :alt="getProfile.profile_image_detail.original.alt"
            />
            <img
              v-else-if="getProfile.social_image_url"
              :src="getProfile.social_image_url"
              :alt="getProfile.full_name"
            />
            <img v-else src="/images/avatar.png" alt="profile" />
            <div>{{ getProfile.full_name }}</div>
          </nuxt-link>
          <a
            href="#"
            @click.prevent="mobileSideMenuOpen = true"
            v-if="getProfile"
            class="nav-item profile-img mobile-visible-flex small-font"
          >
            <i class="bi bi-list icon-big"></i>
          </a>
        </div>
        <div
          v-for="(item, idx) in getMainMenu"
          :key="'menu_' + idx"
          class="nav-item-container hide"
        >
          <nuxt-link
            :to="item.link_url"
            v-if="!item.is_external && item.link_url != null"
            class="nav-item"
            >{{ item.link_title }}</nuxt-link
          >
          <a class="nav-item" v-else-if="item.link_url == null">
            <i class="bi bi-caret-down-fill arrow-down"></i>
            {{ item.link_title }}
          </a>
          <a
            :href="item.link_url"
            target="_blank"
            class="nav-item"
            v-else-if="item.is_external == true"
          >
            {{ item.link_title }}
          </a>
          <div class="submenu" v-if="item.submenus && item.submenus.length > 0">
            <div
              v-for="(submenuitem, idx) in item.submenus"
              :key="'submenu_' + idx"
              class="submenu-item"
            >
              <nuxt-link
                :to="submenuitem.get_link"
                v-if="submenuitem.is_external == false"
                class="submenu-item-a"
              >
                <div class="image">
                  <img
                    :src="
                      HOST + submenuitem.company_detail.logo_detail.original.src
                    "
                    :alt="submenuitem.company_detail.logo_detail.original.alt"
                  />
                </div>
                <div class="data">
                  <div class="submenu-name">
                    {{ submenuitem.link_title }}
                  </div>
                  <div class="rating">
                    <i
                      v-for="(rate, ridx) in totalFullStar(
                        submenuitem.company_detail.rating
                      )"
                      :key="'ratef_' + ridx"
                      class="bi bi-star-fill rating-color"
                    ></i>
                    <i
                      v-for="(rate, ridx) in totalHalfStar(
                        submenuitem.company_detail.rating
                      )"
                      :key="'rateh_' + ridx"
                      class="bi bi-star-half rating-color"
                    ></i>
                    <i
                      v-for="(rate, ridx) in totalEmptyStar(
                        submenuitem.company_detail.rating
                      )"
                      :key="'ratee_' + ridx"
                      class="bi bi-star rating-color"
                    ></i>
                    <div class="rating-value">
                      ({{ submenuitem.company_detail.rating }})
                    </div>
                  </div>
                </div>
              </nuxt-link>
              <a
                :href="submenuitem.get_link"
                target="_blank"
                v-else
                class="submenu-item-a"
              >
                <div class="data">
                  <div class="submenu-name">
                    {{ submenuitem.link_title }}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="search-container">
        <div class="middle-aligned"><SearchBar /></div>
      </div>
    </div>
    <MobileSideMenu
      v-if="mobileSideMenuOpen == true"
      @close="handleSideMenuClose"
    />
  </div>
</template>

<script>
import { Component, Vue, Getter, Watch } from "nuxt-property-decorator";
import { namespaced } from "~/utils/utils";
import {} from "../utils/store/action.names";
import {
  GET_PROFILE,
  GET_MAINMENU,
  GET_GLOBAL_SETTINGS,
} from "../utils/store/getter.names";
import { NS_USER, NS_COMMON } from "../utils/store/namespace.names";
import MobileSideMenu from "./MobileSideMenu";
import SearchBar from "./SearchBar";

@Component({
  name: "Header",
  components: {
    MobileSideMenu,
    SearchBar,
  },
})
export default class Header extends Vue {
  @Getter(namespaced(NS_COMMON, GET_MAINMENU)) getMainMenu;
  @Getter(namespaced(NS_COMMON, GET_GLOBAL_SETTINGS)) getGlobalSettings;

  @Getter(namespaced(NS_USER, GET_PROFILE))
  getProfile;

  mobileSideMenuOpen = false;

  @Watch("$route", { immediate: true })
  handleRouteChange(val, oldVal) {
    this.mobileSideMenuOpen = false;
  }

  get HOST() {
    return this.$config.HOST;
  }

  totalFullStar(rating) {
    return Math.floor(rating);
  }

  totalHalfStar(rating) {
    var x = rating - Math.floor(rating);
    if (x > 0.1) {
      return 1;
    }
    return 0;
  }

  totalEmptyStar(rating) {
    var x = 5 - Math.ceil(rating);
    if (x >= 1) {
      return x;
    }
    return 0;
  }

  handleSideMenuClose() {
    this.mobileSideMenuOpen = false;
  }
}
</script>

<style scoped lang="scss">
.navbar {
  width: 80%;
  height: auto;
  margin: 0 auto;
  @media (max-width: 1250px) {
    width: 90%;
  }
  @media (max-width: 320px) {
    width: 100%;
  }
  .nav {
    width: 100%;
    display: flex;
    gap: 20px;
    // justify-content: flex-end;
    align-items: center;
    .nav-item-container {
      position: relative;
      transform: perspective(1000px);
      z-index: 1;
      &:hover {
        .submenu {
          visibility: visible;
          -webkit-transition: all 0.5s, background, 2s 0.5s linear;
          transition: all 0.5s, background 2s 0.5s linear;
          z-index: 999999;
        }
      }
      .nav-item {
        font-weight: 700;
        font-size: 16px;
        color: $linked-font-color;
        cursor: pointer;
      }
      .profile-img {
        display: flex;
        gap: 5px;
        img {
          height: 25px;
          width: 25px;
          border-radius: 25px;
          flex-shrink: 0;
          -webkit-flex-shrink: 0;
          -o-object-fit: cover;
          object-fit: cover;
        }
      }
      .submenu {
        visibility: hidden;
        z-index: 999999999999999999;
        position: absolute;
        max-height: 500px;
        width: 270px;
        overflow: hidden;
        background: $bg-primary;
        box-shadow: 0px 6px 4px rgba(204, 204, 204, 0.25);
        border-radius: 0px 0px 16px 16px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 20px;
        .submenu-item {
          .submenu-item-a {
            width: 100%;
            display: flex;
            gap: 10px;
            align-items: center;
            .data {
              display: flex;
              flex-direction: column;
              gap: 2px;
              width: 100%;
              .submenu-name {
                font-weight: 700;
                font-size: 16px;
                line-height: 19px;
                color: #000;
              }
              .rating {
                display: flex;
                align-items: flex-start;
                justify-content: flex-start;
                gap: 5px;
                width: 100%;
                .rating-value {
                  font-size: 18px;
                  font-weight: 700;
                  color: #000;
                }
              }
            }
          }
          .image {
            height: 50px;
            width: 50px;
            img {
              flex-shrink: 0;
              -webkit-flex-shrink: 0;
              max-width: 100%;
              height: 100%;
              -o-object-fit: cover;
              object-fit: cover;
            }
          }
        }
      }
    }
    .logo {
      height: 60px;
      width: 112px;
      display: flex;
      justify-content: flex-end;
      margin-left: 50px;
      @media (max-width: 1250px) {
        margin-left: 10px;
        margin-right: 10px;
      }
      @media (max-width: 500px) {
        height: 40px;
        width: 80px;
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
  }
  .search-container {
    width: 100%;
    .middle-aligned {
      width: 45%;
      margin: 0 auto;
      @media (max-width: 1250px) {
        margin: 0px;
        margin-top: 10px;
        width: 60%;
      }
      @media (max-width: 1000px) {
        margin: 0px;
        margin-top: 10px;
        width: 70%;
      }
      @media (max-width: 800px) {
        margin: 0px;
        margin-top: 10px;
        width: 80%;
      }
      @media (max-width: 600px) {
        margin: 0px;
        margin-top: 10px;
        width: 90%;
      }
      @media (max-width: 450px) {
        margin: 0px;
        margin-top: 10px;
        width: 100%;
      }
    }
  }
}
.small-font {
  font-size: 14px !important;
}

.icon-big {
  font-size: 30px;
  color: black;
}
</style>
