<template>
  <v-container class="pa-8">
    <v-card>
      <v-card-title style="background-color: #2a5d7a; color: white"
        >Add new member</v-card-title
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            type="password"
            v-model="password"
            :rules="passRules"
            label="Password"
            required
          ></v-text-field>
          <v-select
            v-model="userType"
            :items="items"
            label="User type"
          ></v-select>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="addUser"
          >
            Add user
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "",
    passRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 5) || "Password must be more than 5 characters",
    ],
    select: null,
    items: ["Member", "Admin"],
    userType: "Member",
    checkbox: false,
  }),

  methods: {
    async addUser() {
      try {
        this.$refs.form.validate();
        await axios.post("/user/add", {
          name: this.name,
          email: this.email,
          password: this.password,
          userType: this.userType,
        });
        this.memberAdded();
        this.$refs.form.reset();
      } catch (error) {
        console.log(error);
      }
    },

    memberAdded() {
      this.$toast.success("New user successfully added.", {
        position: "bottom-right",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    },
  },
};
</script>

<style></style>
