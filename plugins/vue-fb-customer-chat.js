import Vue from "vue";
import VueFbCustomerChat from "vue-fb-customer-chat";

Vue.use(VueFbCustomerChat, {
  page_id: "104198602648752", //  change 'null' to your Facebook Page ID,
  theme_color: "#333333", // theme color in HEX
  locale: "en_US", // default 'en_US'
});
