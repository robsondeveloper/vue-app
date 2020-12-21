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

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  computed: {
    ...mapGetters(["isAuthenticated", "name"]),
  },
  methods: {
    login() {
      this.$store.dispatch("login");
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
