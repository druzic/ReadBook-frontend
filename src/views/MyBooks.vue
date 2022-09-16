<template>
  <v-container class="pa-8">
    <v-data-table
      :headers="headers"
      :items="myBooks"
      :item-class="itemRowBackground"
      sort-by="calories"
      class="elevation-3"
      :search="search"
    >
      <template v-slot:top>
        <v-card flat>
          <v-card-title style="background-color: #2a5d7a; color: white"
            >My Books <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dark
            ></v-text-field
          ></v-card-title>
        </v-card>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    search: "",
    headers: [
      {
        text: "Book author",
        align: "start",
        sortable: true,
        value: "book.author",
      },
      {
        text: "Book title",
        align: "start",
        sortable: true,
        value: "book.title",
      },
      { text: "Date issued", value: "issuedDate" },
      { text: "Due date", value: "dueDate" },
    ],
    myBooks: [],
  }),

  created() {
    this.getMyBooks();
  },

  computed: {
    ...mapGetters({ user: "user" }),
  },

  methods: {
    // Date.Parse pretvara datum u brojeve --- da ne bude errora
    itemRowBackground: function (item) {
      const due = Date.parse(item.dueDate);
      const today = Date.parse(this.moment());
      const isLate = this.moment(today).isBefore(due);
      return isLate !== true ? "style-1" : "style-2";
    },

    async getMyBooks() {
      try {
        //console.log(this.user._id);
        let res = await axios.get(`/issued/${this.user._id}`);
        this.myBooks = res.data;
        this.myBooks.forEach((issue) => {
          issue.issuedDate = this.moment(issue.issuedDate).format(`LLL`);
          issue.dueDate = this.moment(issue.dueDate).format(`LLL`);
        });
        //console.log(this.myBooks);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.style-1 {
  background-color: #f44336;
  font-weight: bold;
}
.style-2 {
  background-color: #4caf50;
}
</style>
