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
            v-model="mail"
          ></v-text-field
          ><v-text-field
            label="Password"
            type="password"
            v-model="pass"
          ></v-text-field
          ><v-btn color="primary" class="mr-4" to="/"> Login </v-btn></v-form
        >
      </v-card>
    </v-layout></v-container
  >
</template>

<script>
export default {
  data() {
    return {
      pass: "",
      mail: "",
    };
  },
};
</script>

<style></style>
