<template>
  <div class="company-index">
    <div class="wrapper">
      <h1 class="title">
        {{ renderLocaleField(getCurrentPage, "title", $i18n.locale) }}
      </h1>
      <div class="white-back">
        <div class="company-wrapper">
          <div class="contact-container">
            <div
              class="left"
              :style="{
                backgroundImage:
                  'url(' +
                  HOST +
                  renderLocaleImage(
                    getCurrentPage,
                    'background_image',
                    $i18n.locale
                  ) +
                  ')',
              }"
            >
              <div class="content">
                <h2>
                  {{
                    renderLocaleField(
                      getCurrentPage,
                      "hero_title",
                      $i18n.locale
                    )
                  }}
                </h2>
                <p class="title">
                  {{
                    renderLocaleField(
                      getCurrentPage,
                      "hero_subtitle",
                      $i18n.locale
                    )
                  }}
                </p>
                <div
                  class="text-address"
                  v-html="
                    renderLocaleField(
                      getGlobalSettings,
                      'address',
                      $i18n.locale
                    )
                  "
                ></div>
                <br />
                <p class="text">
                  <b>{{ $t("contact_us_phone") }}:</b>
                  <span dir="ltr">{{ getGlobalSettings.contact_number }}</span>
                </p>
                <p class="text">
                  <b>{{ $t("contact_us_email") }}:</b>
                  <span dir="ltr">{{ getGlobalSettings.contact_email }}</span>
                </p>
              </div>
            </div>
            <div class="right">
              <ValidationObserver v-slot="{ invalid }">
                <form @submit.prevent="handleFormSubmit" v-if="!formSubmit">
                  <div class="input-wrapper">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input
                        type="text"
                        name="Full name"
                        :placeholder="$t('contact_us_full_name_placeholder')"
                        v-model="formData.full_name"
                      />
                      <span v-if="errors[0]">* {{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper">
                    <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <input
                        type="text"
                        name="Email"
                        :placeholder="$t('contact_us_email_placeholder')"
                        v-model="formData.email"
                      />
                      <span v-if="errors[0]">* {{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input
                        type="text"
                        name="Phone"
                        :placeholder="$t('contact_us_phone_placeholder')"
                        v-model="formData.phone"
                      />
                      <span v-if="errors[0]">* {{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <div>
                        <div>
                          <textarea
                            name="Message"
                            v-model="formData.message"
                            :placeholder="$t('contact_us_message_placeholder')"
                            rows="4"
                            cols="30"
                          ></textarea>
                        </div>
                      </div>
                      <span v-if="errors[0]">* {{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="input-wrapper">
                    <button
                      :disabled="invalid"
                      type="submit"
                      class="sign-up-btn"
                    >
                      {{
                        loading
                          ? $t("contact_us_submit_button_loading")
                          : $t("contact_us_submit_button")
                      }}
                    </button>
                  </div>
                </form>
                <div class="thank-you" v-if="formSubmit">
                  {{ $t("contact_us_thank_you_message") }}
                </div>
              </ValidationObserver>
            </div>
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
import { NS_COMMON } from "../../utils/store/namespace.names";
import { CONTACT_US, FETCH_CURRENT_PAGE } from "../../utils/store/action.names";
import { GET_GLOBAL_SETTINGS } from "../../utils/store/getter.names";
import {
  namespaced,
  renderLocaleField,
  renderLocaleImage,
} from "../../utils/utils";

@Component({
  name: "ContactUs",
  components: {},
})
export default class ContactUs extends Vue {
  @Getter(namespaced(NS_COMMON, GET_GLOBAL_SETTINGS)) getGlobalSettings;

  @Action(namespaced(NS_COMMON, CONTACT_US)) contactUs;

  renderLocaleImage = renderLocaleImage;

  formData = {
    full_name: "",
    email: "",
    phone: "",
    message: "",
  };
  formSubmit = false;
  error_msg = "";
  loading = false;
  renderLocaleField = renderLocaleField;

  handleFormSubmit() {
    this.loading = true;
    this.contactUs(this.formData)
      .then((data) => {
        this.formSubmit = true;
        this.loading = false;
      })
      .catch((e) => {
        this.loading = false;
        this.error_msg = "";
        var err_msg = "";
        if (e.response.status === 400) {
          for (const [key, value] of Object.entries(e.response.data)) {
            const err = `<p>${value}</p>`;
            err_msg = err_msg + err;
          }
          this.error_msg = err_msg;
          this.$toast.error(msg);
        } else {
          var msg = `<div class='t-custom-class'><div>{{$t("error")}}</div></div>`;
          this.$toast.error(msg);
        }
      });
  }

  async asyncData({ route, $axios, store, error }) {
    var getCurrentPage = {};
    const currentPageData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_CURRENT_PAGE), {
        html_path: route.path,
      })
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
      getCurrentPage,
    };
  }
  mounted() {}

  get HOST() {
    return this.$config.HOST;
  }

  get getPageTitle() {
    if (this.getCurrentPage.meta.seo_title) {
      return this.getCurrentPage.meta.seo_title;
    } else {
      return this.getCurrentPage.title;
    }
  }

  get getSearchDescription() {
    if (this.getCurrentPage.meta.search_description) {
      return this.getCurrentPage.meta.search_description;
    } else {
      return "";
    }
  }

  get getKeywords() {
    if (this.getCurrentPage.og_keywords) {
      return this.getCurrentPage.og_keywords;
    } else {
      return "";
    }
  }

  get fullPath() {
    if (this.getCurrentPage.meta.html_url) {
      return this.getCurrentPage.meta.html_url;
    } else {
      return null;
    }
  }

  head() {
    const headData = {
      title: this.getPageTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.getSearchDescription,
        },
        {
          hid: "Keywords",
          name: "Keywords",
          content: this.getKeywords,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.getPageTitle,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.getSearchDescription,
        },
        {
          hid: "og:url",
          property: "og:url",
          content: this.fullPath,
        },
      ],
    };

    // Add canonical URL to headData only if this.fullPath is defined
    if (this.fullPath) {
      // Add canonical link tag to the HTML head section
      headData.link = [
        {
          rel: "canonical",
          href: this.fullPath,
        },
      ];
    }

    return headData;
  }
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
    @media (max-width: 1250px) {
      width: 80%;
    }
    @media (max-width: 950px) {
    }
    @media (max-width: 700px) {
    }
    @media (max-width: 500px) {
      width: 90%;
      font-size: 28px;
    }
    @media (max-width: 350px) {
      width: 95%;
    }
  }
  .white-back {
    // background-color: white;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .company-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
      width: 70%;
      margin: 0 auto;
      @media (max-width: 1250px) {
        width: 100%;
      }
      @media (max-width: 950px) {
      }
      @media (max-width: 700px) {
      }
      @media (max-width: 500px) {
        width: 90%;
      }
      @media (max-width: 350px) {
        width: 95%;
      }
    }
  }
}
.contact-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
  .left {
    height: 730px;
    background-size: cover;
    display: flex;
    justify-content: center;
    @media (max-width: 1250px) {
      width: 100%;
    }
    .content {
      color: #000;
      font-size: 20px;
      font-weight: 900;
      height: 100%;
      width: 80%;
      display: flex;
      gap: 20px;
      flex-direction: column;
      justify-content: center;

      h1 {
        font-size: 40px;
      }
      .title {
        font-weight: 400;
        font-size: 18px;
        margin: 0 !important;
        color: black;
      }
      .text {
        font-size: 18px;
        font-weight: 400;
        margin-top: 5px;
        margin-bottom: 0px;
      }

      .text-address {
        font-size: 18px;
        font-weight: 400;
        margin-top: 5px;
        margin-bottom: 0px;
        white-space: pre-line;
      }
    }
  }
  .right {
    height: 730px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    @media (max-width: 1250px) {
      height: auto;
      margin-top: 50px;
    }
    .input-wrapper {
      margin-bottom: 20px;
      width: 60%;
      display: flex;
      flex-direction: column;
      @media (max-width: $small-breakpoint-max),
        (max-width: $mobile-breakpoint-max) {
        width: 100%;
      }
      .acc-create-succ-msg {
        font-size: 24px;
        line-height: 40px;
        font-weight: 400;
        color: #012d3a;
      }
      span {
        width: 400px;
        display: flex;
        flex-direction: column;
        @media (max-width: $small-breakpoint-max),
          (max-width: $mobile-breakpoint-max) {
          width: 86vw;
        }
        input {
          height: 40px;
          border: 1px solid black;
          padding: 10px;
          width: 100%;
        }
        textarea {
          padding-right: 10px;
        }
        span {
          font-weight: 300;
          text-align: left;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 10px;
          padding-left: 0px;
          padding-bottom: 0px;
          font-size: 12px;
          color: red;
        }
        select {
          height: 40px;
          border: 1px solid black;
          padding: 10px;
          width: 80%;
          background-color: white;
        }
      }
      .resend-text {
        margin-top: 10px;
        font-weight: 300;
      }
      p {
        width: 80%;
        line-height: 25px;
        font-weight: 400;
        a:hover {
          text-decoration: underline;
        }
      }
      .sign-up-btn {
        width: 80%;
        padding: 10px 0;
        border: none;
        font-size: 17px;
        font-weight: 550;
        // background: #012d3a;
        // color: #fff;
        cursor: pointer;
      }
    }
  }
}
.thank-you {
  font-size: 30px;
  color: black;
  line-height: 40px;
}

.dark-mode .sign-up-btn {
  background: white;
  color: black;
}
.light-mode .sign-up-btn {
  background: #012d3a;
  color: white;
}
</style>
