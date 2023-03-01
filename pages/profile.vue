<template>
  <div class="wrapper">
    <div class="profile-wrapper" v-if="getProfile">
      <div class="profile-container">
        <div class="profile-menu">
          <a @click.prevent="showProfileUpdateModal = true" href="#">
            Edit Profile
            <i class="bi bi-pencil-square bicon"></i>
          </a>
          <a @click.prevent="handleSignOut" href="#" class="red-btn">
            Sign out
            <i class="bi bi-box-arrow-right bicon"></i>
          </a>
        </div>
        <div class="profile-info">
          <div class="image">
            <img
              v-if="getProfile.profile_image_detail"
              :src="HOST + getProfile.profile_image_detail.original.src"
              :alt="getProfile.profile_image_detail.original.alt"
            />
            <img v-else src="/images/avatar.png" alt="profile" />
          </div>
          <div class="full-name">
            {{ getProfile.full_name }}
          </div>
          <div class="email">
            {{ getProfile.email }}
          </div>
        </div>
      </div>
    </div>
    <ProfileUpdateModal
      v-if="showProfileUpdateModal"
      :modalOpen="showProfileUpdateModal"
      @hideModal="hideModal"
    />
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
import { NS_COMMON, NS_AUTH } from "../utils/store/namespace.names";
import { FETCH_CURRENT_PAGE } from "../utils/store/action.names";
import { namespaced } from "../utils/utils";
import { GET_PROFILE } from "../utils/store/getter.names";
import { SET_TOKEN_ERROR } from "../utils/store/mutation.names";
import ProfileUpdateModal from "../components/modals/ProfileUpdate.vue";

@Component({
  name: "Profile",
  components: {
    ProfileUpdateModal,
  },
})
export default class Profile extends Vue {
  @Getter(namespaced(NS_AUTH, GET_PROFILE)) getProfile;

  @Mutation(namespaced(NS_AUTH, SET_TOKEN_ERROR)) setTokenError;

  showProfileUpdateModal = false;

  hideModal() {
    this.showProfileUpdateModal = false;
  }

  get HOST() {
    return this.$config.HOST;
  }

  handleSignOut() {
    this.$router.push("/");
    this.setTokenError();
  }

  async asyncData({ route, $axios, store }) {}
  mounted() {}
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.profile-wrapper {
  width: 100%;
  background-color: #d7e1ec;
}
.profile-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: space-evenly;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  .profile-menu {
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    a {
      height: 44px;
      width: 155px;
      background-color: $primary-btn-color;
      color: $primary-color;
      font-size: 14px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 8px;
    }
    .red-btn {
      background-color: red;
    }
  }
  .profile-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: flex-end;
    .image {
      margin-bottom: 60px;
      img {
        height: 128px;
        width: 128px;
        border-radius: 128px;
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }
    .full-name {
      font-weight: 500;
      font-size: 28px;
      line-height: 34px;
      text-align: center;
      color: #000000;
    }
    .email {
      font-weight: 500;
      font-size: 20px;
      text-align: center;
      color: #000000;
    }
  }
}
.bicon {
  font-size: 16px;
}
</style>
