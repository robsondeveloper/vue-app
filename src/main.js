import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Keycloak from "keycloak-js";
import axios from "axios";
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
      keycloak.onAuthSuccess = () => {
        this.$store.dispatch("axiosToken", keycloak.token);
        this.$store.dispatch(
          "isAdmin",
          keycloak.realmAccess.roles.includes("admin")
        );
      };

      axios.interceptors.response.use(
        response => response,
        error => {
          if (error.response.status === 401) {
            this.$store.dispatch("logout");
          }
          if (error.response.status === 403) {
            if (this.$router.currentRoute.path != "/") {
              this.$router.push("/");
            }
          }
          return Promise.reject(error);
        }
      );
    }
  }
}).$mount("#app");
