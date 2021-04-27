import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faLink,
  faCode,
  faQuoteRight,
  faFileAlt,
  faDownload,
  faPhotoVideo,
  faToggleOn,
  faToggleOff
} from "@fortawesome/free-solid-svg-icons";

library.add(faLink, faCode, faQuoteRight, faFileAlt, faDownload, faPhotoVideo, faToggleOn, faToggleOff);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
