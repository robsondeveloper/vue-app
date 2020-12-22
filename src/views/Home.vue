<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <br />
    <button
      type="button"
      @click="login"
      class="btn btn-primary me-3"
      v-if="!isAuthenticated"
    >
      Login
    </button>
    <button
      type="button"
      @click="logout"
      class="btn btn-secondary"
      v-if="isAuthenticated"
    >
      Logout
    </button>

    <h3 v-if="isAuthenticated">Usuário: {{ name }}</h3>

    <button
      type="button"
      @click="getUser"
      class="btn btn-info me-3"
      v-if="isAuthenticated"
    >
      USER
    </button>
    <button
      type="button"
      @click="getAdmin"
      class="btn btn-warning"
      v-if="isAuthenticated"
    >
      ADMIN
    </button>

    <div class="alert alert-dark" role="alert">
      {{ message }}
    </div>

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapGetters(["isAuthenticated", "name"]),
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("login");
    },
    logout() {
      this.$store.dispatch("logout");
    },
    getUser() {
      axios.get("//localhost:8181/users").then(({ data }) => {
        this.message = data;
      });
    },
    getAdmin() {
      axios.get("//localhost:8181/admins").then(({ data }) => {
        this.message = data;
      });
    },
  },
};
</script>
