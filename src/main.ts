import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueObserveVisibility from "vue-observe-visibility";
import { firestorePlugin } from "vuefire";
import { auth } from "./store/db";

Vue.use(firestorePlugin);

Vue.use(VueObserveVisibility);
Vue.config.productionTip = false;

let app: any;

auth.onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
