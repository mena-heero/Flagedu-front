<template>
  <div>
    <transition name="fade" appear>
      <div class="modal-overlay" v-if="modalOpen" @click="close"></div>
    </transition>

    <transition name="pop" appear>
      <div class="modal-container" role="dialog" v-if="modalOpen">
        <div class="password-wrapper">
          <button class="close-btn" @click="close">
            <img
              src="/images/close.png"
              alt="close icon"
              class="img-fuild"
              width="18"
              height="18"
            />
          </button>

          <div class="profile-card">
            <p class="title">Password Change</p>

            <ValidationObserver
              v-slot="{ invalid }"
              tag="form"
              @submit.prevent="handleChangePassword"
            >
              <ValidationProvider
                rules="required|min:8"
                v-slot="{ errors }"
                tag="div"
                class="mb-3"
              >
                <div class="form-input mb-1">
                  <input
                    type="password"
                    class="form-control"
                    :class="{
                      redborder: errors[0],
                    }"
                    placeholder="Old password"
                    ref="oldPassword"
                    name="Old Password"
                    v-model="passwordChangeForm.old_password"
                  />

                  <div @click="toggleOldPassword">
                    <img
                      src="/images/hide.png"
                      alt="show pass icon"
                      class="show-icon"
                      width="15"
                      height="12"
                      v-if="!showOldPassword"
                    />
                    <img
                      src="/images/show.png"
                      alt="show pass icon"
                      class="show-icon"
                      width="15"
                      height="12"
                      v-if="showOldPassword"
                    />
                  </div>
                </div>
                <small v-if="errors[0]" class="error m-0">
                  {{ errors[0] }}
                </small>
              </ValidationProvider>

              <ValidationProvider
                vid="password"
                rules="required"
                v-slot="{ errors }"
                tag="div"
                class="mb-3"
              >
                <div class="form-input mb-1">
                  <input
                    type="password"
                    class="form-control"
                    :class="{
                      redborder: errors[0],
                    }"
                    placeholder="New password"
                    ref="newPassword"
                    name="Password"
                    v-model="passwordChangeForm.new_password"
                  />

                  <div @click="toggleNewPassword">
                    <img
                      src="/images/hide.png"
                      alt="show pass icon"
                      class="show-icon"
                      width="15"
                      height="12"
                      v-if="!showNewPassword"
                    />
                    <img
                      src="/images/show.png"
                      alt="show pass icon"
                      class="show-icon"
                      width="15"
                      height="12"
                      v-if="showNewPassword"
                    />
                  </div>
                </div>
                <small v-if="errors[0]" class="error m-0">
                  {{ errors[0] }}
                </small>
              </ValidationProvider>

              <ValidationProvider
                rules="required|confirmed:password"
                v-slot="{ errors }"
                tag="div"
                :class="error_msg.length > 0 ? 'mb-3' : 'mb-5'"
              >
                <div class="form-input mb-1">
                  <input
                    type="password"
                    class="form-control"
                    :class="{
                      redborder: errors[0],
                    }"
                    placeholder="Confirm password"
                    ref="confirmPassword"
                    name="Confirm Password"
                    v-model="passwordChangeForm.new_password2"
                  />

                  <div @click="toggleConfirmPassword">
                    <img
                      src="/images/hide.png"
                      alt="show pass icon"
                      class="show-icon"
                      width="15"
                      height="12"
                      v-if="!showConfirmPassword"
                    />
                    <img
                      src="/images/show.png"
                      alt="show pass icon"
                      class="show-icon"
                      width="15"
                      height="12"
                      v-if="showConfirmPassword"
                    />
                  </div>
                </div>
                <small v-if="errors[0]" class="error m-0">
                  {{
                    errors.length &&
                    passwordChangeForm.new_password !=
                      passwordChangeForm.new_password2
                      ? "Password doesn't match"
                      : errors[0]
                  }}
                </small>
              </ValidationProvider>

              <div class="error mb-3" v-if="error_msg.length > 0">
                <small v-for="(msg, index) in error_msg" :key="index">
                  {{ msg[0] }}
                </small>
              </div>

              <button
                type="submit"
                class="btn btn-primary form-button mb-20"
                :disabled="invalid"
              >
                {{ loading ? "Please wait..." : "Reset Password" }}
              </button>

              <!-- <div class="outline-border">
                <button
                  type="button"
                  class="btn btn-outline-primary outline-btn"
                  @click="close"
                >
                  Cancel
                </button>
              </div> -->
            </ValidationObserver>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { Component, Vue, Prop, Action } from "nuxt-property-decorator";
import { CHANGE_PASSWORD } from "../../utils/store/action.names";
import { NS_AUTH } from "../../utils/store/namespace.names";
import { namespaced } from "../../utils/utils";

@Component({
  name: "PasswordChangeModal",
  components: {},
})
export default class PasswordChangeModal extends Vue {
  @Prop() modalOpen;
  @Action(namespaced(NS_AUTH, CHANGE_PASSWORD)) changePassword;

  passwordChangeForm = {
    old_password: "",
    new_password: "",
    new_password2: "",
  };
  error_msg = [];
  showOldPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  loading = false;

  toggleOldPassword() {
    this.showOldPassword = !this.showOldPassword;
    if (this.showOldPassword) {
      this.$refs.oldPassword.type = "text";
    } else {
      this.$refs.oldPassword.type = "password";
    }
  }

  toggleNewPassword() {
    this.showNewPassword = !this.showNewPassword;
    if (this.showNewPassword) {
      this.$refs.newPassword.type = "text";
    } else {
      this.$refs.newPassword.type = "password";
    }
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
    if (this.showConfirmPassword) {
      this.$refs.confirmPassword.type = "text";
    } else {
      this.$refs.confirmPassword.type = "password";
    }
  }

  handleChangePassword() {
    this.loading = true;
    this.changePassword(this.passwordChangeForm)
      .then((data) => {
        this.loading = false;
        var msg = `<div class='t-custom-class'><div>Password changed successfully!</div></div>`;
        this.$toast.success(msg);
        this.passwordChangeForm = {
          old_passwor: "",
          new_password: "",
          new_password2: "",
        };
        this.close();
      })
      .catch((e) => {
        this.loading = false;
        this.error_msg = [];
        if (e.response.status === 400) {
          for (const [key, value] of Object.entries(e.response.data)) {
            this.error_msg.push(value);
          }
        } else {
          var msg = `<div class='t-custom-class'><div>Something went wrong!</div></div>`;
          this.$toast.error(msg);
          this.close();
        }
      });
  }

  close() {
    console.log("+++++++");
    this.$emit("hideModal");
  }
}
</script>

<style scoped lang="scss">
.modal-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  border-radius: 1rem;
  background: #1f3241;
  z-index: 99999;
  transform: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;

  @media (max-width: 400px) {
    width: 90%;
  }
}

.modal-overlay {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.password-wrapper {
  padding: 50px;
  position: relative;

  .close-btn {
    position: absolute;
    top: 20px;
    right: 30px;
    background: none;
    border: none;
    display: none;

    @media (max-width: 430px) {
      display: block;
    }
  }

  .profile-card {
    border: 1px solid white;
    border-radius: 20px;
    padding: 50px 38px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 436px;

    .title {
      font-size: 20px;
      line-height: 20px;
      color: $primary-color;
      margin-bottom: 25px;
    }

    form {
      width: 100%;

      .form-input {
        position: relative;

        .form-control {
          font-family: $poppins-font, sans-serif;
          font-weight: 400;
          font-size: 13px;
          color: $placeholder-color;
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        .show-icon {
          position: absolute;
          top: calc(35%);
          right: 1rem;
          cursor: pointer;
        }
      }

      .mb-20 {
        margin-bottom: 20px;
      }

      .form-button {
        font-size: 14px;
        padding: 10px 0;
      }

      .outline-btn {
        font-size: 14px;
        padding: 10px 0;
      }
    }

    @media (max-width: 767px) {
      padding: 50px 30px;
      width: 360px;
    }

    @media (max-width: 575px) {
      padding: 40px 32px 50px;
      border: none;
      width: 348px;
    }

    @media (max-width: 400px) {
      padding: 40px 25px 50px;
      width: unset;
    }
  }

  @media (max-width: 767px) {
    padding: 35px;
  }

  @media (max-width: 575px) {
    padding: 0px;
  }
}

// modal open close animation
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.4s linear;
}

.pop-enter,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3);
}
</style>
