<template>
  <v-container class="pa-8">
    <v-data-table
      :headers="headers"
      :items="reservations"
      sort-by="author"
      :item-class="itemRowBackground"
      class="elevation-3"
      :search="search"
    >
      <template v-slot:top>
        <v-card flat>
          <v-card-title style="background-color: #2a5d7a; color: white"
            >Reservations <v-spacer></v-spacer>
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
        <v-btn color="primary" @click="issueDialog(item)"> Issue </v-btn>
        <v-icon class="ml-4" @click="deleteDialog(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="520px">
      <v-card>
        <v-card-title class="text-h5 justify-center"
          >Are you sure you want to delete this reservation?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteReservation"
            >Yes</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogIssue" max-width="400px">
      <v-card>
        <v-card-title class="text-h5 justify-center"
          >Mark this reservation as issued?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeIssue">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="rentBook">Yes</v-btn>
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

    dialogIssue: false,
    dialogDelete: false,
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
        sortable: false,
        value: "book.title",
      },
      { text: "User", value: "user.email" },
      { text: "Date issued", value: "reservationDate" },
      { text: "Due date", value: "dueDate" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    reservations: [],

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
      reservationDate: "",
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
    dialogIssue(val) {
      val || this.closeIssue();
    },
  },

  mounted() {
    this.getReservations();
  },

  methods: {
    itemRowBackground: function (item) {
      const due = Date.parse(item.dueDate);
      const today = Date.parse(this.moment());
      const isLate = this.moment(today).isBefore(due);
      return isLate !== true ? "style-1" : "style-2";
    },

    async rentBook() {
      try {
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);
        console.log(this.editedItem);
        await axios.post("/issued/reservation", {
          user: this.editedItem.user._id,
          book: this.editedItem.book._id,
          issuedDate: Date.now(),
          dueDate: dueDate,
          reservationID: this.editedItem._id,
        });
        this.bookIssued();
        this.reservations.splice(this.editedIndex, 1);
        this.closeIssue();
      } catch (error) {
        console.log(error);
      }
    },

    async getReservations() {
      try {
        let res = await axios.get("/reservation");
        this.reservations = res.data;

        this.reservations.forEach((reservation) => {
          reservation.reservationDate = this.moment(
            reservation.reservationDate
          ).format(`LLL`);
          reservation.dueDate = this.moment(reservation.dueDate).format(`LLL`);
        });
        //console.log(this.issued);
      } catch (error) {
        console.log(error);
      }
    },

    issueDialog(item) {
      this.editedIndex = this.reservations.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogIssue = true;
    },

    closeIssue() {
      this.dialogIssue = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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
    deleteDialog(item) {
      this.editedIndex = this.reservations.indexOf(item);
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
    async deleteReservation() {
      let res = await axios.delete(
        `/reservation/delete/${this.editedItem._id}`
      );
      console.log(res.data);
      this.reservations.splice(this.editedIndex, 1);
      this.closeDelete();
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
