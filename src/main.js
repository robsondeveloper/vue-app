import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Keycloak from "keycloak-js";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.init();
  },
  methods: {
    init() {
      let keycloak = new Keycloak({
        url: "http://localhost:8080/auth",
        realm: "myrealm",
        clientId: "app-vue"
      });
      keycloak.init({ pkceMethod: "S256" });
      this.$store.dispatch("storeKeycloak", keycloak);
    }
  }
}).$mount("#app");
