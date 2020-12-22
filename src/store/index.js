import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keycloak: null,
    isAdmin: false
  },
  mutations: {
    SET_KEYCLOAK(state, keycloak) {
      state.keycloak = keycloak;
    },
    LOGIN(state) {
      state.keycloak.login();
    },
    LOGOUT(state) {
      state.keycloak.logout();
    },
    SET_AXIOS_TOKEN(state, token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    SET_IS_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    }
  },
  actions: {
    storeKeycloak({ commit }, keycloak) {
      commit("SET_KEYCLOAK", keycloak);
    },
    login({ commit }) {
      commit("LOGIN");
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
    axiosToken({ commit }, token) {
      commit("SET_AXIOS_TOKEN", token);
    },
    isAdmin({ commit }, isAdmin) {
      commit("SET_IS_ADMIN", isAdmin);
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.keycloak && state.keycloak.authenticated;
    },
    name: state => {
      return state.keycloak.tokenParsed.name;
    },
    isAdmin: state => {
      return state.isAdmin;
    }
  }
});
