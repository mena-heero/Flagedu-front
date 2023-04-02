<template>
  <div class="container">
    <div
      class="auth-wrapper d-flex justify-content-center align-items-center py-5"
    >
      <div class="card-wrapper">
        <div class="text-center mb-5">
          <img src="/images/logo.png" alt="logo" class="auth-logo mb-4" />
          <h1 class="text-white fw-semibold">Create an Account</h1>
        </div>

        <ValidationObserver
          v-slot="{ invalid }"
          tag="form"
          @submit.prevent="handleSignup"
        >
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            tag="div"
            class="mb-3"
            v-if="formData.auth_type == 2"
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
                placeholder="Your Email"
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
              <option value="">Select country</option>
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
                placeholder="Phone number"
                v-model="formData.phone"
              />
            </div>
            <small v-if="errors.length" class="error">
              {{ errors[0] }}
            </small>
          </ValidationProvider>

          <div class="form-input text-center error my-2">
            <p class="error" v-html="error_msg"></p>
          </div>

          <button
            type="submit"
            class="btn btn-primary form-button"
            :disabled="invalid"
          >
            {{ loading ? "Please wait..." : "Next" }}
          </button>
        </ValidationObserver>
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
import { namespaced } from "../../utils/utils";
import { NS_USER, NS_COMMON } from "../../utils/store/namespace.names";
import {
  FETCH_COUNTRY,
  COMPLETE_SOCIAL_SIGNUP,
} from "../../utils/store/action.names";

@Component({
  name: "CompleteSignup",
  components: {},
  layout: "auth-layout",
})
export default class CompleteSignup extends Vue {
  @Action(namespaced(NS_COMMON, FETCH_COUNTRY)) fetchCountry;
  @Action(namespaced(NS_USER, COMPLETE_SOCIAL_SIGNUP)) completeSocialSignup;

  formData = {
    email: "",
    phone: "",
    country: "",
    auth_type: this.$route.query.auth_type,
  };
  error_msg = "";
  loading = false;

  handleSignup() {
    this.loading = true;

    if (this.formData.auth_type == 2) {
      this.formData["social_id"] = this.$route.query.social_id;
    }

    if (this.formData.auth_type == 1) {
      this.formData["email"] = this.$route.query.email;
    }

    this.completeSocialSignup(this.formData)
      .then((data) => {
        this.loading = false;
        if (data.auth_type == 2) {
          this.$router.push({
            name: "socialauth-validate-otp",
            query: {
              social_id: data.social_id,
              auth_type: data.auth_type,
              email: this.formData.email,
            },
          });
        } else if (data.auth_type == 1) {
          this.$router.push("/");
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
      title: "Complete Signup",
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
</style>
