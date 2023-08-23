<template>
  <div>
    <div class="backdrop mobile-visible-block">
      <div class="sidemenu" v-on-clickaway="close">
        <div class="sidemenu-wrapper">
          <div class="image" v-if="getProfile">
            <nuxt-link to="/profile" v-if="getProfile" class="profile-img">
              <img
                v-if="getProfile.profile_image_detail"
                :src="HOST + getProfile.profile_image_detail.original.src"
                :alt="getProfile.profile_image_detail.original.alt"
              />
              <img v-else src="/images/avatar.png" alt="profile" />
              <div class="full-name">{{ getProfile.full_name }}</div>
            </nuxt-link>
          </div>
          <div class="menu-items">
            <div class="nav-item-container">
              <nuxt-link v-if="!getProfile" to="/signin" class="nav-item">{{
                $t("signup_login_link_text")
              }}</nuxt-link>
            </div>
            <div
              v-for="(item, idx) in getMainMenu"
              :key="'menu_' + idx"
              class="nav-item-container"
            >
              <nuxt-link
                :to="item.link_url"
                v-if="!item.is_external && item.link_url != null"
                class="nav-item"
                >{{
                  renderLocaleField(item, "link_title", $i18n.locale)
                }}</nuxt-link
              >
              <a class="nav-item" v-else-if="item.link_url == null">
                <i class="bi bi-caret-down-fill arrow-down"></i>
                {{ renderLocaleField(item, "link_title", $i18n.locale) }}
              </a>
              <a
                :href="item.link_url"
                target="_blank"
                class="nav-item"
                v-else-if="item.is_external == true"
              >
                {{ renderLocaleField(item, "link_title", $i18n.locale) }}
              </a>
              <div
                class="submenu"
                v-if="item.submenus && item.submenus.length > 0"
              >
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
                    <div class="data">
                      <div class="submenu-name">
                        {{
                          renderLocaleField(
                            submenuitem,
                            "link_title",
                            $i18n.locale
                          )
                        }}
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
                    <div class="image">
                      <img
                        :src="
                          HOST +
                          submenuitem.company_detail.logo_detail.original.src
                        "
                        :alt="
                          submenuitem.company_detail.logo_detail.original.alt
                        "
                      />
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
                        {{
                          renderLocaleField(
                            submenuitem,
                            "link_title",
                            $i18n.locale
                          )
                        }}
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Getter, Action } from "nuxt-property-decorator";
import { namespaced } from "~/utils/utils";
import {} from "../utils/store/action.names";
import {
  GET_PROFILE,
  GET_MAINMENU,
  GET_GLOBAL_SETTINGS,
} from "../utils/store/getter.names";
import { NS_USER, NS_COMMON } from "../utils/store/namespace.names";
import { renderLocaleField } from "../utils/utils";

@Component({
  name: "MobileSideMenu",
  components: {},
})
export default class MobileSideMenu extends Vue {
  @Getter(namespaced(NS_COMMON, GET_MAINMENU)) getMainMenu;
  @Getter(namespaced(NS_COMMON, GET_GLOBAL_SETTINGS)) getGlobalSettings;

  @Getter(namespaced(NS_USER, GET_PROFILE))
  getProfile;
  renderLocaleField = renderLocaleField;
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

  close() {
    this.$emit("close");
  }
}
</script>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999999999;
  top: 0px;
}
.sidemenu {
  height: 100%;
  width: 300px;
  position: fixed;
  background-color: white;
  top: 0px;
  right: 0px;
  z-index: 99999999999;
}
.sidemenu-wrapper {
  padding-top: 30px;
  padding-right: 15px;
  height: 100%;
  .image {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25%;
    .profile-img {
      display: flex;
      flex-direction: column;
      gap: 5px;
      img {
        height: 100px;
        width: 100px;
        border-radius: 100px;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        -o-object-fit: cover;
        object-fit: cover;
      }
      .full-name {
        font-size: 16px;
        font-weight: 600;
        color: black;
      }
    }
  }
}

.menu-items {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 70%;
  overflow: scroll;
  .nav-item-container {
    transform: perspective(1000px);
    z-index: 1;
    text-align: right;
    &:hover {
      .submenu {
        visibility: visible;
        display: flex;
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
      z-index: 999999;
      width: 100%;
      background: $bg-primary;
      display: none;
      flex-direction: column;
      gap: 15px;
      padding-top: 20px;
      .submenu-item {
        .submenu-item-a {
          width: 100%;
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          align-items: center;
          .data {
            display: flex;
            flex-direction: column;
            gap: 2px;
            width: 100%;
            .submenu-name {
              font-weight: 500;
              font-size: 14px;
              line-height: 19px;
              text-align: right;
              color: #000;
            }
            .rating {
              display: flex;
              align-items: flex-start;
              justify-content: flex-end;
              gap: 5px;
              width: 100%;
              .rating-value {
                font-size: 18px;
                font-weight: 500;
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
}
</style>
