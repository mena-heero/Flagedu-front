<template>
  <div>
    <div class="content">
      <div v-if="isLoading == true" class="please-wait">Please wait ...</div>
      <div v-if="err_text" class="err-text" v-html="err_text"></div>
    </div>
    <client-only>
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="fullPage"
      ></loading>
    </client-only>
  </div>
</template>

<script>
import { Component, Vue, Action } from "nuxt-property-decorator";
import { FACEBOOK_SIGNUP } from "../../utils/store/action.names";
import { NS_USER } from "../../utils/store/namespace.names";
import { namespaced } from "../../utils/utils";

@Component({
  name: "FacebookSignin",
  components: {},
})
export default class FacebookSignin extends Vue {
  @Action(namespaced(NS_USER, FACEBOOK_SIGNUP)) facebookSignup;

  isLoading = false;
  fullPage = true;
  err_text = null;

  async asyncData({ route, $axios, store }) {}

  handleFacebookSignup() {
    this.isLoading = true;

    const code = this.$route.query.code;
    this.facebookSignup({ code: code })
      .then((data) => {
        this.isLoading = false;
        if (data.signin_status == true) {
          this.$router.push("/");
        } else {
          this.$router.push({
            name: "socialauth-complete-signup",
            query: { social_id: data.user_data.id, auth_type: 2 },
          });
        }
      })
      .catch((e) => {
        this.isLoading = false;
        if (e.response.status === 500) {
          this.err_text = `<div>Something went wrong! Please <a href='/signin'>try again</a></div>`;
        }
      });
  }

  mounted() {
    this.handleFacebookSignup();
  }
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}

.please-wait {
  font-size: 30px;
  font-weight: 600;
}

.err-text {
  font-size: 18px;
  font-weight: 600;
}
</style>
