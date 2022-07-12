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
            @click="addBook"
          >
            Add book
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
    title: "",
    author: "",
    isbn: "",
    quantity: "",
    description: "",
    category: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    fieldRules: [(v) => !!v || "Field is required"],
    books: [],
    newBook: [],
  }),

  methods: {
    async addBook() {
      try {
        this.$refs.form.validate();
        const res = await axios.post("http://localhost:3000/book/add", {
          title: this.title,
          author: this.author,
          isbn: this.isbn,
          quantity: this.quantity,
          description: this.description,
          category: this.category,
        });
        this.$refs.form.reset();
        console.log(res.data.newBook);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
