<template>
  <v-container class="pa-8">
    <v-card>
      <v-card-title style="background-color: #2a5d7a; color: white"
        >Issue book to user</v-card-title
      >
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-autocomplete
            v-model="user"
            :rules="userRules"
            label="User"
            required
            :items="users"
            item-text="fullname"
            return-object
          ></v-autocomplete>

          <v-autocomplete
            v-model="book"
            :rules="bookRules"
            label="Book"
            required
            :items="books"
            item-text="fullname"
            return-object
          ></v-autocomplete>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="IssueBook"
          >
            Issue
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
    user: null,
    userRules: [(v) => !!v || "User is required"],
    book: "",
    bookRules: [(v) => !!v || "Book is required"],

    select: null,
    checkbox: false,
    books: [],
    users: [],
  }),
  mounted() {
    this.getBooks();
    this.getUsers();
  },

  methods: {
    async IssueBook() {
      try {
        this.$refs.form.validate();
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);

        await axios.post("/issued/add", {
          user: this.user._id,
          book: this.book._id,
          issuedDate: Date.now(),
          dueDate: dueDate,
        });
        this.bookIssued();
        this.$refs.form.reset();
      } catch (error) {
        console.log(error);
      }
    },

    async getBooks() {
      try {
        let res = await axios.get("/book/available");
        this.books = res.data;
        this.books.forEach(
          (book) => (book.fullname = `${book.author}, ${book.title}`)
        );
        //console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    },
    async getUsers() {
      try {
        let res = await axios.get("/user");
        this.users = res.data;
        this.users.forEach(
          (user) => (user.fullname = `${user.name}, ${user.email}`)
        );
        // console.log(this.users);
      } catch (error) {
        console.log(error);
      }
    },
    bookIssued() {
      this.$toast.success("Book successfully issued.", {
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
  beforeDestroy() {},
};
</script>

<style></style>
