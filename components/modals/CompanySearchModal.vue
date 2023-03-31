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
            <ValidationObserver v-slot="{ invalid }" tag="form">
              <ValidationProvider
                rules="required"
                v-slot="{ errors }"
                tag="div"
                class="mb-3"
              >
                <label>Search Company ({{ position }})</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    redborder: errors[0],
                  }"
                  placeholder="Search ..."
                  name="Company name"
                  v-model.trim="searchText"
                  v-debounce:400ms="debounceSearch"
                />
                <small v-if="errors[0]" class="error mt-1"
                  >Please enter company name</small
                >
              </ValidationProvider>

              <div class="results">
                <div
                  class="item"
                  v-for="(item, idx) in datas"
                  :key="'com_' + idx"
                  @click="handleCompanyClick(item)"
                >
                  <div class="image">
                    <img
                      :src="HOST + item.logo_detail.original.src"
                      :alt="item.logo_detail.original.alt"
                    />
                  </div>
                  <div class="content">
                    <div class="title">
                      {{ item.title }}
                    </div>
                    <div class="rating">
                      <i
                        v-for="(rate, ridx) in totalFullStar(item.rating)"
                        :key="'ratef_' + ridx"
                        class="bi bi-star-fill rating-color"
                      ></i>
                      <i
                        v-for="(rate, ridx) in totalHalfStar(item.rating)"
                        :key="'rateh_' + ridx"
                        class="bi bi-star-half rating-color"
                      ></i>
                      <i
                        v-for="(rate, ridx) in totalEmptyStar(item.rating)"
                        :key="'ratee_' + ridx"
                        class="bi bi-star rating-color"
                      ></i>
                      <div class="rating-value">({{ item.rating }})</div>
                    </div>
                  </div>
                </div>
              </div>
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
import { NS_COMPANY } from "../../utils/store/namespace.names";
import { namespaced } from "../../utils/utils";
import { FETCH_FIND_BROKER_COMPANY } from "../../utils/store/action.names";

@Component({
  name: "CompanySearchModal",
  components: {},
})
export default class CompanySearchModal extends Vue {
  @Prop() modalOpen;
  @Prop() position;

  @Action(namespaced(NS_COMPANY, FETCH_FIND_BROKER_COMPANY))
  fetchFindBrokerCompany;

  searchText = "";
  datas = [];

  error_msg = [];
  loading = false;

  debounceSearch() {
    if (this.searchText.length == 0) {
      this.datas = [];
    }
    if (this.searchText.length > 3) {
      this.fetchFindBrokerCompany({ title: this.searchText }).then((data) => {
        this.datas = data.results;
      });
    }
  }

  get HOST() {
    return this.$config.HOST;
  }

  mounted() {}

  handleCompanyClick(item) {
    this.$emit("hideModal", { item, position: this.position });
  }

  close() {
    this.$emit("hideModal");
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

.results {
  max-height: 250px;
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: hidden;
  overflow-y: scroll;
  .item {
    display: flex;
    gap: 10px;
    cursor: pointer;
    .image {
      height: 60px;
      width: 60px;
      img {
        flex-shrink: 0;
        -webkit-flex-shrink: 0;
        width: 100%;
        height: 100%;
        -o-object-fit: cover;
        object-fit: cover;
        border-radius: 8px;
      }
    }
    .content {
      .title {
        font-size: 16px;
        font-weight: 600;
        color: white;
      }
      .rating {
        display: flex;
        align-items: flex-start;
        justify-content: flex-end;
        gap: 5px;
        width: 100%;
        .rating-value {
          font-size: 18px;
          font-weight: 700;
          color: #fff;
          @media (max-width: 500px) {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
