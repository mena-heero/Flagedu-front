<template>
  <div>
    <div class="content">
      <div v-if="isLoading == true" class="please-wait">Please wait ...</div>
      <div v-if="err_text" class="err-text" v-html="err_text"></div>
    </div>
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :is-full-page="fullPage"
    ></loading>
  </div>
</template>

<script>
import { Component, Vue, Action } from "nuxt-property-decorator";
import { GOOGLE_SIGNUP } from "../../utils/store/action.names";
import { NS_USER } from "../../utils/store/namespace.names";
import { namespaced } from "../../utils/utils";

@Component({
  name: "GoogleSignin",
  components: {},
})
export default class GoogleSignin extends Vue {
  @Action(namespaced(NS_USER, GOOGLE_SIGNUP)) googleSignup;

  userData = null;
  isLoading = false;
  fullPage = true;
  err_text = null;

  async asyncData({ route, $axios, store }) {}

  handleGoogleSignup() {
    this.isLoading = true;

    const code = this.$route.query.code;
    this.googleSignup({ code: code })
      .then((data) => {
        this.userData = data;
        this.isLoading = false;

        if (data.phone && data.country) {
          this.$router.push("/");
        } else {
          this.$router.push({
            name: "socialauth-complete-signup",
            query: { email: data.email, auth_type: 1 },
          });
        }
      })
      .catch((e) => {
        this.isLoading = false;
        if (e.response.status === 400) {
          console.log(e.response.data.auth_type);
          if (e.response.data) {
            var auth_type = e.response.data.auth_type;
            if (auth_type == 0) {
              this.err_text = `<div>This email already registered! Please <a href='/'>signin</a></div>`;
            } else if (auth_type == 2) {
              this.err_text = `<div>This email already registered with facebook! Please <a href='/'>signin</a> with facebook</div>`;
            }
          }
        } else if (e.response.status === 500) {
          this.err_text = `<div>Something went wrong! Please <a href='/signin'>try again</a></div>`;
        }
      });
  }

  mounted() {
    this.handleGoogleSignup();
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
