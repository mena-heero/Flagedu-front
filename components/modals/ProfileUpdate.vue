<template>
  <div class="modal-backdrop">
    <div
      class="modal-container"
      :class="{ 'open-modal': modalOpen }"
      role="dialog"
      v-on-clickaway="close"
    >
      <div class="modal-body">
        <div class="udpate-wrapper">
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
            <div class="image-wrapper">
              <!-- <img
								:src="getAppropriateImage(getProfile.profile_image, 'user')"
								alt="profile-image"
								class="profile-pic img-fluid"
							/> -->
              <img
                v-if="getProfile.profile_image_detail"
                :src="HOST + getProfile.profile_image_detail.original.src"
                :alt="getProfile.profile_image_detail.original.alt"
                class="profile-pic img-fluid"
              />
              <img
                v-else-if="getProfile.social_image_url"
                :src="getProfile.social_image_url"
                :alt="getProfile.full_name"
                class="profile-pic img-fluid"
              />
              <img
                v-else
                src="/images/avatar.png"
                class="profile-pic img-fluid"
                alt="profile"
              />
              <button class="camera-btn" @click="$refs.file.click()">
                <img
                  src="/images/camera.png"
                  alt="camera icon"
                  class="img-fluid"
                />
              </button>
            </div>

            <input
              type="file"
              ref="file"
              hidden
              accept="image/*"
              @change="onFileChange"
            />

            <ValidationObserver
              v-slot="{ invalid }"
              tag="form"
              @submit.prevent="handleUpdateProfile"
            >
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                tag="div"
                class="mb-3"
              >
                <label>Full name</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    redborder: errors[0],
                  }"
                  placeholder="Full name"
                  name="Full name"
                  v-model="profileUpdateForm.full_name"
                />
                <small v-if="errors[0]" class="error mt-1"
                  >Please enter your full name</small
                >
              </ValidationProvider>

              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                tag="div"
                :class="error_msg.length > 0 ? 'mb-3' : 'mb-5'"
              >
                <label>E-mail</label>
                <input
                  type="email"
                  class="form-control"
                  :class="{
                    redborder: errors[0],
                  }"
                  placeholder="Your Email"
                  v-model="profileUpdateForm.email"
                />
                <small v-if="errors[0]" class="error mt-1"
                  >Please enter your email</small
                >
              </ValidationProvider>

              <div class="error mb-3" v-if="error_msg.length > 0">
                <small v-for="(msg, index) in error_msg" :key="index">{{
                  msg[0]
                }}</small>
              </div>

              <button
                type="submit"
                class="btn btn-primary form-button"
                :disabled="invalid"
              >
                {{ loading ? "Please wait..." : "Update" }}
              </button>
            </ValidationObserver>
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
  Prop,
  Getter,
  Action,
  Mutation,
} from "nuxt-property-decorator";
import { NS_USER } from "../../utils/store/namespace.names";
import { namespaced } from "../../utils/utils";
import { GET_PROFILE } from "../../utils/store/getter.names";
import {
  CHANGE_PROFILE,
  CHANGE_PROFILE_IMAGE,
} from "../../utils/store/action.names";
import { SET_TOKEN_ERROR } from "../../utils/store/mutation.names";

@Component({
  name: "ProfileUpdateModal",
  components: {},
})
export default class ProfileUpdateModal extends Vue {
  @Prop() modalOpen;
  @Getter(namespaced(NS_USER, GET_PROFILE)) getProfile;
  @Action(namespaced(NS_USER, CHANGE_PROFILE)) changeProfile;
  @Action(namespaced(NS_USER, CHANGE_PROFILE_IMAGE)) changeProfileImage;
  @Mutation(namespaced(NS_USER, SET_TOKEN_ERROR)) setTokenError;

  file = null;
  fileUrl = "/images/profile-image.png";
  fileName = null;

  profileUpdateForm = {
    full_name: "",
    email: "",
  };
  error_msg = [];
  loading = false;

  onFileChange(event) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.fileUrl = URL.createObjectURL(this.file);

    // upload the file
    const formData = new FormData();
    formData.append("image", this.file);
    this.changeProfileImage(formData)
      .then((data) => {
        var msg = `<div class='t-custom-class'><div>Profile picture uploaded successfully!</div></div>`;
        this.$toast.success(msg);
      })
      .catch((e) => {
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

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {
    this.profileUpdateForm = {
      full_name: this.getProfile.full_name,
      email: this.getProfile.email,
    };
  }

  handleUpdateProfile() {
    this.loading = true;
    this.changeProfile(this.profileUpdateForm)
      .then((data) => {
        this.loading = false;
        this.error_msg = [];
        var userData = this.getProfile;
        this.$toast.success("Profile Updated!");
        if (userData.email !== data.email) {
          this.setTokenError();
          this.$router.push({
            name: "validate-otp",
            query: {
              email: data.email,
              mode: "verification",
              from: "email_change",
            },
          });
        } else {
          this.close();
        }
      })
      .catch((e) => {
        this.loading = false;
        this.error_msg = [];
        if (e.response.status === 400) {
          for (const [key, value] of Object.entries(e.response.data)) {
            this.error_msg.push(value);
          }
        } else {
          this.$toast.error("Something went wrong!");
          this.close();
        }
      });
  }

  close() {
    this.$emit("hideModal");
  }
}
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.modal-container {
  position: relative;
  min-height: 168px;
  background-color: #1f3241;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  // transform: scale(0);
  opacity: 0;

  @media (max-width: 400px) {
    width: 90%;
  }
}

.close {
  animation: close 0.8s forwards;
}

.udpate-wrapper {
  padding: 50px;
  position: relative;

  .close-btn {
    position: absolute;
    top: 30px;
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
    padding: 25px 44px 35px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;

    .image-wrapper {
      position: relative;

      .profile-pic {
        width: 80px;
        height: 80px;
        border-radius: 100%;
        margin-bottom: 30px;
        object-fit: cover;
      }

      .camera-btn {
        position: absolute;
        bottom: 30px;
        right: 0;
        background: linear-gradient(180deg, #dc5ced 0%, #25e1fb 100%);
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 15px;
          height: 15px;
        }
      }
    }

    form {
      width: 100%;

      label {
        font-family: $poppins-font, sans-serif;
        font-weight: 400;
        font-size: 13px;
        margin-bottom: 5px;
        padding-left: 15px;
        color: $primary-color;
      }

      .form-control {
        font-family: $poppins-font, sans-serif;
        font-weight: 400;
        font-size: 13px;
        color: $placeholder-color;
        border: 1px solid rgba(255, 255, 255, 0.6);
      }

      .form-button {
        font-size: 14px;
        padding: 10px 0;
      }
    }

    @media (max-width: 767px) {
      padding: 25px 30px 35px;
      width: 350px;
    }

    @media (max-width: 575px) {
      padding: 80px 25px 100px;
      border: none;
      width: 360px;
    }

    @media (max-width: 400px) {
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

// modal overlay show animation
@keyframes bounceUp {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  70% {
    transform: scale(0.95);
  }
  95% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes close {
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  30% {
    transform: scale(0.95);
  }
  5% {
    transform: scale(1.1);
  }
  0% {
    transform: scale(1);
  }
}
// modal overlay show animation
</style>
