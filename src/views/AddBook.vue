<template>
  <v-container class="pa-8">
    <v-card elevation="5">
      <v-card-title style="background-color: #2a5d7a; color: white"
        >Add new book</v-card-title
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="title"
            :rules="fieldRules"
            label="Book Title"
            required
          ></v-text-field>

          <v-text-field
            v-model="author"
            :rules="fieldRules"
            label="Author"
            required
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="isbn"
            :rules="fieldRules"
            label="ISBN"
            required
          ></v-text-field>

          <v-text-field
            type="number"
            v-model="quantity"
            :rules="fieldRules"
            label="Quantity"
            required
          ></v-text-field>

          <v-textarea
            label="Description"
            v-model="description"
            :rules="fieldRules"
            rows="1"
            auto-grow
          >
          </v-textarea>

          <v-select
            v-model="category"
            :items="items"
            :rules="fieldRules"
            label="Item"
            required
          ></v-select>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    description: "",
    category: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    fieldRules: [(v) => !!v || "Field is required"],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
      console.log(this.title);
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>

<style></style>
