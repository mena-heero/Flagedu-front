<template>
  <div class="container">
    <div
      class="auth-wrapper d-flex justify-content-center align-items-center py-5"
    >
      <div class="card-wrapper">
        <div class="text-center mb-5">
          <img src="/images/logo.png" alt="logo" class="auth-logo mb-4" />
          <h1 class="text-white fw-semibold">Sign In</h1>
        </div>
        <ValidationObserver v-slot="{ invalid }" ref="form">
          <form method="post" name="signinForm" @submit.prevent="handleLogin">
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
                  type="text"
                  name="Username"
                  :class="{
                    'form-control': true,
                    redborder: errors[0],
                  }"
                  class="form-control"
                  placeholder="Email"
                  v-model="formData.username"
                />
              </div>
              <small v-if="errors.length" class="error">
                {{ errors[0] }}
              </small>
            </ValidationProvider>

            <ValidationProvider
              rules="required|min:8"
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
                  name="Password"
                  ref="passwordOneInput"
                  :class="{
                    'form-control': true,
                    redborder: errors[0],
                  }"
                  class="form-control"
                  placeholder="Password"
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

            <div class="d-flex justify-content-between align-items-center">
              <div class="form-check d-flex align-items-center"></div>

              <div>
                <NuxtLink class="form-forget-password" to="/forgot-password"
                  >Forgot password?</NuxtLink
                >
              </div>
            </div>
            <div
              class="form-input text-center error my-2"
              v-if="error_msg"
              v-html="error_msg"
            ></div>

            <button
              type="submit"
              class="btn btn-primary form-button"
              :disabled="invalid"
            >
              {{ loading ? "Please wait..." : "Sign in" }}
            </button>

            <p class="have-account text-center text-white">
              Don`t have an account?
              <NuxtLink to="/signup" class="text-active">Sign up</NuxtLink>
            </p>
          </form>
        </ValidationObserver>
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
  namespace,
} from "nuxt-property-decorator";
import { namespaced } from "../utils/utils";
import { NS_AUTH } from "../utils/store/namespace.names";
import { SIGNIN } from "../utils/store/action.names";

@Component({
  name: "Signin",
  components: {},
  layout: "auth-layout",
})
export default class Signin extends Vue {
  @Action(namespaced(NS_AUTH, SIGNIN)) signin;

  error_msg = "";
  loading = false;

  formData = {
    username: "",
    password: "",
  };
  showPasswordOne = false;

  toggleShowOne() {
    this.showPasswordOne = !this.showPasswordOne;
    if (this.showPasswordOne == true) {
      this.$refs.passwordOneInput.type = "text";
    } else {
      this.$refs.passwordOneInput.type = "password";
    }
  }

  step = 1;
  userProfile = null;

  commonSendVerificationCode(data, popup = false) {
    this.sendVerificationCode({
      email: data.email,
      reason: "verify",
    }).then((data) => {
      if (popup == true) {
        var msg = `<div class='t-custom-class'><div>Successfully resend verification code to your email!</div></div>`;
        this.$toast.success(msg);
      }
    });
  }

  handleLogin() {
    this.loading = true;
    this.signin(this.formData)
      .then((data) => {
        let token = data.token;
        this.userProfile = data;
        if (token === null && data.is_email_verified == false) {
          this.commonSendVerificationCode(data);
          this.$router.push({
            path: "/validate-otp",
            name: "validate-otp",
            query: {
              email: data.email,
              mode: "verification",
            },
          });
        } else {
          this.$router.push({ name: "index" });
        }
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
          var msg = `<div class='t-custom-class'><div>Something went wrong!</div></div>`;
          this.$toast.error(msg);
        }
      });
  }

  head() {
    return {
      title: "Signin",
    };
  }
}
</script>

<style lang="scss" scoped>
.form-remember-me {
  font-weight: 400;
  font-size: 14px;
  color: $primary-color;

  @media (max-width: 350px) {
    font-size: 12px !important;
  }
}
.form-forget-password {
  font-size: 14px;
  font-weight: 400;
  color: #eb794f;
  float: right;

  @media (max-width: 350px) {
    font-size: 12px;
  }
}
</style>
