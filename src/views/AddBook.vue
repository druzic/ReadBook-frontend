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
            :rules="fieldRulesNumber"
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

          <v-select
            v-model="category"
            :items="categories"
            :rules="fieldRules"
            label="Category"
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
    category: null,
    categories: [
      "Action and Adventure",
      "Classics",
      "Comic Book or Graphic Novel",
      "Detective and Mystery",
      "Fantasy",
      "Historical Fiction",
      "Horror",
      "Literary Fiction",
    ],
    fieldRules: [(v) => !!v || "Field is required"],
    fieldRulesNumber: [
      (v) => !!v || "Field is required",
      (v) => (v && v.length == 13) || "ISBN must be 13 numbers",
    ],
    books: [],
    newBook: [],
  }),

  methods: {
    async addBook() {
      try {
        this.$refs.form.validate();
        const res = await axios.post("/book/add", {
          title: this.title,
          author: this.author,
          isbn: this.isbn,
          quantity: this.quantity,
          category: this.category,
        });
        this.bookAdded();
        this.$refs.form.reset();
        console.log(res.data.newBook);
      } catch (error) {
        console.log(error);
      }
    },
    bookAdded() {
      this.$toast.success("New book successfully added.", {
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
