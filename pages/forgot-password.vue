<template>
  <div class="container">
    <div
      class="auth-wrapper d-flex justify-content-center align-items-center py-5"
    >
      <div class="card-wrapper">
        <div class="text-center mb-3">
          <img src="/images/logo.png" alt="logo" class="auth-logo mb-4" />
          <h1 class="text-white fw-semibold">
            {{ $t("forget-password_title") }}
          </h1>
        </div>

        <p class="text-secondary text-center">
          {{ $t("forget-password_enter_email") }}
        </p>

        <ValidationObserver v-slot="{ invalid }">
          <form
            method="post"
            name="myform"
            class="signin_validate"
            @submit.prevent="handleForgetPassword"
          >
            <ValidationProvider rules="required" v-slot="{ errors }" tag="div">
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
                  :placeholder="$t('forget-password_email_placeholder')"
                  v-model="formData.email"
                />
              </div>
              <small v-if="errors.length" class="error">{{ errors[0] }}</small>
            </ValidationProvider>

            <div class="form-input text-center error my-2">
              <div class="mb-3 mb-0" v-if="error_msg">
                <p class="error" v-html="error_msg"></p>
              </div>
            </div>

            <button
              class="btn btn-primary form-button mt-4"
              :disabled="invalid"
            >
              {{
                loading
                  ? $t("forget-password_loading_text")
                  : $t("forget-password_button_text")
              }}
            </button>
          </form>
        </ValidationObserver>

        <p class="have-account text-center text-white">
          {{ $t("forget-password_back_to_login_text") }}
          <NuxtLink to="/signin" class="text-active">{{
            $t("forget-password_login_link_text")
          }}</NuxtLink>
        </p>
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
} from "nuxt-property-decorator";
import { NS_USER } from "../utils/store/namespace.names";
import { SEND_VERIFICATION_CODE } from "../utils/store/action.names";
import { namespaced } from "../utils/utils";
@Component({
  name: "ForgetPassword",
  layout: "auth-layout",
})
export default class ForgetPassword extends Vue {
  @Action(namespaced(NS_USER, SEND_VERIFICATION_CODE)) sendVerificationCode;

  error_msg = "";
  loading = false;
  stage = 1;

  formData = {
    email: "",
    reason: "forget_password",
  };

  handleForgetPassword() {
    this.loading = true;
    this.sendVerificationCode(this.formData)
      .then((data) => {
        this.$router.push({
          name: "reset-password",
          query: {
            email: this.formData.email,
            mode: "forget-password",
          },
        });
      })
      .catch((e) => {
        this.loading = false;
        this.error_msg = "";
        var err_msg = "";
        for (const [key, value] of Object.entries(e.response.data)) {
          const err = `<p>${value}</p>`;
          err_msg = err_msg + err;
        }
        this.error_msg = err_msg;
      });
  }

  mounted() {}

  head() {
    return {
      title: "Forgot Password",
    };
  }
}
</script>

<style lang="scss" scoped>
.error {
  color: #eb794f;
}
.error .text-secondary {
  @media (max-width: 400px) {
    font-size: 14px;
  }
}
.form-input {
  margin-top: 2rem;
}
</style>
