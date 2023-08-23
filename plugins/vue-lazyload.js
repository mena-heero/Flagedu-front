// plugins/vue-lazyload.js
import Vue from "vue";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  loading: "/assets/loading.gif", // Adjust the path to your loading image
  observer: true,
  preLoad: 1.3,
});
