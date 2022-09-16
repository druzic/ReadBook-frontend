<template>
  <v-container class="pa-8">
    <v-data-table
      :headers="headers"
      :items="issued"
      sort-by="author"
      :item-class="itemRowBackground"
      class="elevation-3"
      :search="search"
    >
      <template v-slot:top>
        <v-card flat>
          <v-card-title style="background-color: #2a5d7a; color: white"
            >Issued <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              dark
            ></v-text-field
          ></v-card-title>

          <v-spacer></v-spacer>
        </v-card>
      </template>
      {{ /* eslint-disable */}}
      <template v-slot:item.actions="{ item }">
        <v-btn color="primary" @click="returnDialog(item)"> Returned </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="400px">
      <v-card>
        <v-card-title class="text-h5 justify-center"
          >Mark this book as returned?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="returnBook">Yes</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    search: "",

    dialogDelete: false,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
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
      { text: "User", value: "user.email" },
      { text: "Date issued", value: "issuedDate" },
      { text: "Due date", value: "dueDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    issued: [],

    editedIndex: -1,
    editedItem: {
      title: "",
      author: 0,
      isbn: 0,
      quantity: 0,
      category: 0,
    },
    defaultItem: {
      user: "",
      book: "",
      issuedDate: "",
      dueDate: "",
    },
  }),

  computed: {
    ...mapGetters({ user: "user" }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.getIssueds();
  },

  methods: {
    itemRowBackground: function (item) {
      const due = Date.parse(item.dueDate);
      const today = Date.parse(this.moment());
      const isLate = this.moment(today).isBefore(due);
      return isLate !== true ? "style-1" : "style-2";
    },

    rentBook(item) {
      console.log(item);
    },

    async getIssueds() {
      try {
        let res = await axios.get("/issued");
        this.issued = res.data;

        this.issued.forEach((issue) => {
          issue.issuedDate = this.moment(issue.issuedDate).format(`LLL`);
          issue.dueDate = this.moment(issue.dueDate).format(`LLL`);
        });
        //console.log(this.issued);
      } catch (error) {
        console.log(error);
      }
    },

    async returnBook(item) {
      try {
        //console.log(this.editedItem._id);
        const deleteIndex = this.issued.indexOf(item);
        console.log(this.editedItem);
        let res = await axios.patch(`/issued`, {
          id: this.editedItem._id,
          book: this.editedItem.book,
        });
        this.issued.splice(deleteIndex, 1);
        console.log(res.data);
        this.bookReturned();
        this.closeDelete();
      } catch (error) {
        console.log(error);
      }
    },

    initialize() {},

    returnDialog(item) {
      this.editedIndex = this.issued.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    bookReturned() {
      this.$toast.success("Book marked as returned.", {
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

<style>
.style-1 {
  background-color: #f44336;
  font-weight: bold;
}
.style-2 {
}
</style>
