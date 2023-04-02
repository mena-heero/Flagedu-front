<template>
  <div class="container">
    <div
      class="auth-wrapper d-flex justify-content-center align-items-center py-5"
    >
      <div class="card-wrapper">
        <div v-if="step == 0" class="text-center mb-3">
          <img src="/images/logo.png" alt="logo" class="auth-logo mb-4" />
          <h1 class="text-white fw-semibold">Verification</h1>
        </div>
        <div v-if="step == 1" class="image-box">
          <img src="/images/image-123.png" alt="logo" class="vemate-robot" />
          <img
            src="/images/image-102.png"
            alt="upper right image"
            class="top-right-img"
          />
          <img
            src="/images/image-101.png"
            alt="bottom left image"
            class="btm-left-img"
          />
          <img
            src="/images/image-100.png"
            alt="bottom left image"
            class="btm-right-img"
          />
        </div>
        <h1 v-if="step == 1" class="text-white fw-semibold mt-64">Congrats!</h1>
        <div v-if="step == 1" class="text-secondary text-center mb-5">
          <div v-if="$route.query.mode == 'verification'">
            Your account is verified!
          </div>
          <div v-else>Your account has been created!</div>
        </div>
        <ValidationObserver v-slot="{ invalid }" v-if="step == 0" ref="form">
          <form
            method="post"
            name="myform"
            class="siginin_validate"
            @submit.prevent="handleVerificationConfirm"
          >
            <p class="text-secondary text-center px-0 px-md-4">
              Enter your 6 digits code that you received on your email.
            </p>

            <div
              class="mt-4 mb-3 d-flex justify-content-center align-items-center otp-input-wrapper"
            >
              <v-otp-input
                ref="otpInput"
                input-classes="otp-input"
                separator=""
                :num-inputs="6"
                :should-auto-focus="true"
                :is-input-num="true"
                @on-complete="handleOnComplete"
              />
            </div>

            <div
              class="mb-2 d-flex justify-content-center align-items-center text-active timer"
            >
              <span class="minute">00</span>:<span class="second">{{
                countDown > 9 ? countDown : "0" + countDown
              }}</span>
            </div>

            <p class="text-secondary text-center resend-code">
              If you didn’t receive a code!<a
                href="#"
                class="text-active"
                @click.prevent="handleCodeResend"
                :class="disableResend ? 'disable-link' : ''"
              >
                Resend</a
              >
            </p>

            <button class="btn btn-primary form-button mt-1">
              {{ loading ? "Please wait..." : "Continue" }}
            </button>
          </form>
        </ValidationObserver>

        <p v-if="step == 0" class="have-account text-center text-white">
          Back to sign in?
          <NuxtLink to="/signin" class="text-active">Sign in</NuxtLink>
        </p>
        <div v-if="step == 1" class="start-btn">
          <NuxtLink to="/signin">
            <img
              src="/images/start-btn.png"
              alt="start-btn bg"
              class="img-fluid"
            />
            <span>Start</span>
          </NuxtLink>
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
} from "nuxt-property-decorator";
import { namespaced } from "../../utils/utils";
import { NS_USER } from "../../utils/store/namespace.names";
import {
  SEND_VERIFICATION_CODE,
  SOCIAL_AUTH_VERIFY_CONFIRM,
} from "../../utils/store/action.names";

@Component({
  name: "OTPVerification",
  layout: "auth-layout",
})
export default class OTPVerification extends Vue {
  @Action(namespaced(NS_USER, SEND_VERIFICATION_CODE)) sendVerificationCode;
  @Action(namespaced(NS_USER, SOCIAL_AUTH_VERIFY_CONFIRM))
  socialAuthVerifyConfirm;

  error_msg = "";
  loading = false;
  email = "";
  auth_type = "";
  social_id = "";
  step = 0;
  countDown = 60;
  disableResend = true;

  formData = {
    code: "",
  };

  head() {
    if (this.step == 1)
      return {
        title: "Account Successfully Verified!",
      };
    else {
      return {
        title: "Verification",
      };
    }
  }

  handleOnComplete(val) {
    this.formData.code = val;
  }

  handleCodeResend() {
    this.sendVerificationCode({
      email: this.email,
      reason: "verify",
      user_checking: false,
    })
      .then((data) => {
        this.countDown = 60;
        this.countDownTimer();
        this.disableResend = true;
        var msg = `<div class='t-custom-class'><div>Verification code send successfully!</div></div>`;
        this.$toast.success(msg);
      })
      .catch((e) => {
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

  handleVerificationConfirm() {
    this.loading = true;
    this.formData["email"] = this.email;
    this.formData["social_id"] = this.social_id;
    this.socialAuthVerifyConfirm(this.formData)
      .then((data) => {
        this.loading = false;
        var msg = `<div class='t-custom-class'><div>Successfully verified your account!</div></div>`;
        this.$toast.success(msg);
        this.$router.push("/");
      })
      .catch((e) => {
        this.loading = false;
        this.error_msg = "";
        var err_msg = "";
        var msg = e.response.data["code"];
        this.$toast.error(msg[0]);
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

  mounted() {
    if (this.$route.query) {
      this.email = this.$route.query.email;
      this.auth_type = this.$route.query.auth_type;
      this.social_id = this.$route.query.social_id;
    }
    if (this.email === undefined || this.social_id === undefined) {
      this.$router.push({ name: "signin" });
    }
  }

  countDownTimer() {
    if (this.countDown > 0) {
      setTimeout(() => {
        this.countDown -= 1;
        this.countDownTimer();
      }, 1000);
    } else {
      this.disableResend = false;
    }
  }

  created() {
    this.countDownTimer();
  }
}
</script>

<style lang="scss" scoped>
.card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image-box {
    position: relative;

    .vemate-robot {
      width: 200px;
      height: 200px;
      margin-top: 20px;
    }

    .top-right-img {
      position: absolute;
      top: -12px;
      right: -54px;
      width: 78px;
    }

    .btm-left-img {
      position: absolute;
      bottom: -68px;
      left: -52px;
      width: 78px;
    }

    .btm-right-img {
      position: absolute;
      bottom: -18%;
      right: -7.5%;
    }
  }

  .mt-64 {
    margin-top: 64px;
  }

  .start-btn {
    position: relative;
    cursor: pointer;

    img {
      width: 65px;
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 14px;
      line-height: 130%;
      color: $primary-color;
    }
  }

  @media (max-width: 500px) {
    padding: 2.5rem 1rem;
  }
  @media (max-width: 360px) {
    padding: 2.5rem 0rem;
  }
}

.timer {
  font-size: 16px;

  .second {
    width: 20px;
  }
}

.disable-link {
  pointer-events: none;
}

// .resend-code {
// 	font-size: 14px;
// }

// .otp-input {
// 	font-size: 24px;
// 	border: 2px solid #fff;
// 	width: 44px;
// 	height: 44px;
// 	border-radius: 5px;
// 	padding: 0.6rem 0.6rem;
// 	text-align: center;
// 	margin-left: 5px;
// 	margin-right: 5px;
// }
</style>
