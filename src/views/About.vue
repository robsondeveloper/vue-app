<template>
  <div class="about">
    <h1>This is an about page</h1>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      message: "",
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated", "name"]),
  },
  methods: {
    getAdmin() {
      axios.get("//localhost:8181/admins").then(({ data }) => {
        this.message = data;
      });
    },
  },
};
</script>
