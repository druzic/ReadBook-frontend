<template>
  <v-container fluid fill-height style="background-color: #962424"
    ><v-layout align-center justify-center
      ><v-card elevation="5" class="justify-center" width="500px"
        ><v-card-title style="background-color: #731919; color: white"
          >Login</v-card-title
        >
        <v-form class="pa-6">
          <v-text-field
            label="E-mail"
            type="email"
            v-model="email"
          ></v-text-field
          ><v-text-field
            label="Password"
            type="password"
            v-model="password"
          ></v-text-field
          ><v-btn color="primary" class="mr-4" @click="login">
            Login
          </v-btn></v-form
        >
      </v-card>
    </v-layout></v-container
  >
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      password: "",
      email: "",
    };
  },
  methods: {
    ...mapActions({ getUserData: "getUserData" }),
    async login() {
      try {
        const res = await axios.post("http://localhost:3000/user/login", {
          password: this.password,
          email: this.email,
        });
        const data = await res.data;
        localStorage.setItem("token", data.token);
        this.getUserData().then(() => {
          this.$router.push("/books");
        });
        console.log(data.token);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
