<template>
  <div class="container">
    <div
      class="auth-wrapper d-flex justify-content-center align-items-center py-5"
    >
      <div class="card-wrapper">
        <div class="text-center mb-5">
          <img src="/images/logo.png" alt="logo" class="auth-logo mb-4" />
          <h1 class="text-white fw-semibold">{{ $t("signup_title") }}</h1>
        </div>

        <ValidationObserver
          v-slot="{ invalid }"
          tag="form"
          @submit.prevent="handleSignup"
        >
          <ValidationProvider
            :rules="{ required, regex: /^[a-zA-Z0-9\.]*$/ }"
            v-slot="{ errors }"
            tag="div"
            class="mb-3"
          >
            <div class="form-input mb-1">
              <img
                src="/images/user.png"
                alt="user icon"
                class="icon"
                width="15"
                height="16"
              />
              <input
                type="text"
                name="Full name"
                :class="{
                  'form-control': true,
                  redborder: errors[0],
                }"
                class="form-control"
                :placeholder="$t('signup_full_name_placeholder')"
                v-model="formData.full_name"
              />
            </div>
            <small v-if="errors.length" class="error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>

          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            tag="div"
            class="mb-3"
          >
            <div class="form-input mb-1">
              <img
                src="/images/email.png"
                alt="email icon"
                class="icon"
                width="20"
                height="16"
              />
              <input
                type="email"
                name="Email"
                :class="{
                  'form-control': true,
                  redborder: errors[0],
                }"
                class="form-control"
                :placeholder="$t('signup_email_placeholder')"
                v-model="formData.email"
              />
            </div>
            <small v-if="errors.length" class="error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>

          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            tag="div"
            class="mb-3"
          >
            <select
              v-model="formData.country"
              class="form-select country-select"
              name="Country"
            >
              <option value="">{{ $t("signup_select_country") }}</option>
              <option
                v-for="(item, idx) in countries"
                :key="'country_' + idx"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </select>
            <small v-if="errors.length" class="error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>

          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            tag="div"
            class="mb-3"
          >
            <div class="form-input mb-1">
              <img
                src="/images/user.png"
                alt="email icon"
                class="icon"
                width="16"
                height="16"
              />
              <input
                type="text"
                name="Phone"
                :class="{
                  'form-control': true,
                  redborder: errors[0],
                }"
                class="form-control"
                :placeholder="$t('signup_phone_placeholder')"
                v-model="formData.phone"
              />
            </div>
            <small v-if="errors.length" class="error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>

          <ValidationProvider
            vid="password"
            ref="password"
            :rules="{ required }"
            v-slot="{ errors }"
            tag="div"
            class="mb-3"
          >
            <div class="form-input mb-1">
              <img
                src="/images/password.png"
                alt="password icon"
                class="icon"
                width="14"
                height="16"
              />
              <input
                type="password"
                name="Password"
                ref="passwordOneInput"
                :class="{
                  'form-control': true,
                  redborder: errors[0],
                }"
                class="form-control"
                :placeholder="$t('signup_password_placeholder')"
                v-model="formData.password"
              />
              <span @click="toggleShowOne">
                <img
                  v-if="!showPasswordOne"
                  src="/images/hide.png"
                  alt="show pass icon"
                  class="show-icon"
                  width="15"
                  height="12"
                />
                <img
                  v-if="showPasswordOne"
                  src="/images/show.png"
                  alt="show pass icon"
                  class="show-icon"
                  width="15"
                  height="12"
                />
              </span>
            </div>
            <small v-if="errors.length" class="error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>

          <ValidationProvider
            vid="password2"
            rules="required|confirmed:password"
            v-slot="{ errors }"
            tag="div"
            class="mb-4"
          >
            <div class="form-input mb-1">
              <img
                src="/images/password.png"
                alt="password icon"
                class="icon"
                width="14"
                height="16"
              />
              <input
                type="password"
                name="Confirm Password"
                ref="passwordTwoInput"
                :class="{
                  'form-control': true,
                  redborder: errors[0],
                }"
                class="form-control"
                :placeholder="$t('signup_confirm_password_placeholder')"
                v-model="formData.password2"
              />
              <span @click="toggleShowTwo">
                <img
                  v-if="!showPasswordTwo"
                  src="/images/hide.png"
                  alt="show pass icon"
                  class="show-icon"
                  width="15"
                  height="12"
                />
                <img
                  v-if="showPasswordTwo"
                  src="/images/show.png"
                  alt="show pass icon"
                  class="show-icon"
                  width="15"
                  height="12"
                />
              </span>
            </div>
            <small v-if="errors.length" class="error">
              {{
                errors.length && formData.password !== formData.password2
                  ? $t("signup_passwords_not_match")
                  : errors[0]
              }}
            </small>
          </ValidationProvider>

          <div class="form-check d-flex">
            <label class="form-check-label text-white">
              {{ $t("signup_agree_terms") }}
              <a
                href="/common/terms-and-conditions"
                target="_blank"
                class="text-active"
              >
                {{ $t("signup_terms_of_service") }}
              </a>
              {{ $t("signup_and") }}
              <a
                href="/common/privacy-policy"
                target="_blank"
                class="text-active"
              >
                {{ $t("signup_privacy_policy") }}
              </a>
            </label>
            <input
              type="checkbox"
              class="form-check-input me-2"
              v-model="formData.agree_terms"
            />
          </div>

          <div class="d-grid">
            <button
              type="submit"
              :disabled="invalid"
              class="btn btn-primary btn-block py-2 fw-semibold"
            >
              {{ $t("signup_create_account") }}
            </button>
          </div>
        </ValidationObserver>

        <div class="mt-4 text-center">
          <p class="text-white">
            {{ $t("signup_already_have_account") }}
            <router-link to="/signin" class="text-active fw-semibold">
              {{ $t("signup_sign_in") }}
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Component,
  Vue,
  Action,
  Getter,
  Mutation,
} from "nuxt-property-decorator";
import { namespaced } from "../utils/utils";
import { NS_USER, NS_COMMON } from "../utils/store/namespace.names";
import { SIGNUP, FETCH_COUNTRY } from "../utils/store/action.names";

@Component({
  name: "Signup",
  components: {},
  layout: "auth-layout",
})
export default class Signup extends Vue {
  @Action(namespaced(NS_COMMON, FETCH_COUNTRY)) fetchCountry;
  @Action(namespaced(NS_USER, SIGNUP)) signup;

  formData = {
    full_name: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    password2: "",
    is_agreed: "",
  };
  error_msg = "";
  password_error = false;
  loading = false;

  showPasswordOne = false;
  showPasswordTwo = false;

  loginWithGoogle() {
    window.location = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?protocol=oauth2&response_type=code&access_type=offline&client_id=559204491251-9rdnbjf2n27ks6u5klvef778icg1j4rm.apps.googleusercontent.com&redirect_uri=https://flagedu.com/socialauth/google&scope=openid%20profile%20email%20email%20profile&code_challenge_method&prompt=select_account&service=lso&o2v=1&flowName=GeneralOAuthFlow`;
  }

  loginWithFacebook() {
    window.location = `https://www.facebook.com/v16.0/dialog/oauth?client_id=1419617315245410&redirect_uri=https://flagedu.com/socialauth/facebook`;
  }

  toggleShowOne() {
    this.showPasswordOne = !this.showPasswordOne;
    if (this.showPasswordOne == true) {
      this.$refs.passwordOneInput.type = "text";
    } else {
      this.$refs.passwordOneInput.type = "password";
    }
  }
  toggleShowTwo() {
    this.showPasswordTwo = !this.showPasswordTwo;
    if (this.showPasswordTwo == true) {
      this.$refs.passwordTwoInput.type = "text";
    } else {
      this.$refs.passwordTwoInput.type = "password";
    }
  }

  handleSignup() {
    this.loading = true;

    if (this.formData.is_agreed == false) {
      var msg = `<div class='t-custom-class'><div>أنت بحاجة إلى الموافقة على الشروط والأحكام الخاصة بنا!</div></div>`;
      this.$toast.error(msg);
      this.loading = false;
      return false;
    }
    const userData = { ...this.formData };
    delete userData["password2"];
    this.signup(userData)
      .then((data) => {
        this.loading = false;
        this.$router.push({
          name: "validate-otp",
          query: {
            email: this.formData.email,
            mode: "verification",
          },
        });
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
        } else {
          var msg = `<div class='t-custom-class'><div>هناك خطأ ما!</div></div>`;
          this.$toast.error(msg);
        }
      });
  }

  async asyncData({ route, $axios, store }) {
    var countries = [];
    const countryData = await store
      .dispatch(namespaced(NS_COMMON, FETCH_COUNTRY))
      .then((data) => {
        countries = data;
      })
      .catch((e) => {
        console.log(e);
      });

    return {
      countries,
    };
  }

  mounted() {}

  head() {
    return {
      title: "Signup",
    };
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #eb794f;
}
.help-text {
  color: #fff;
}
.form-check-input {
  margin-top: 0.26em;
}
.country-select {
  background-color: transparent !important;
  border-radius: 50px;
  color: grey;
}

.social-auth {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  .div-or {
    padding-top: 20px;
    color: white;
  }
  .social-icons {
    display: flex;
    gap: 20px;
    .google-icon {
      font-size: 30px;
      color: #4285f4;
      cursor: pointer;
    }
    .fb-icon {
      font-size: 30px;
      color: #3b5998;
      cursor: pointer;
    }
  }
}
</style>
