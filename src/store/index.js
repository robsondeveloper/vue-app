import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keycloak: null
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
    }
  },
  getters: {
    isAuthenticated: state => {
      return state.keycloak && state.keycloak.authenticated;
    },
    name: state => {
      return state.keycloak.tokenParsed.name;
    }
  }
});
