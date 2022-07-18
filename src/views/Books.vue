<template>
  <v-container class="pa-8">
    <v-data-table
      :headers="headers"
      :items="books"
      sort-by="author"
      class="elevation-3"
      :search="search"
    >
      <template v-slot:top>
        <v-card flat>
          <v-card-title style="background-color: #2a5d7a; color: white"
            >Books <v-spacer></v-spacer>
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
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>Edit book</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.author"
                        label="Author"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.isbn"
                        label="ISBN"
                        maxlength="13"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.quantity"
                        label="Quantity"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.category"
                        :items="items"
                        label="Category"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="editBook">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="520px">
            <v-card>
              <v-card-title class="text-h5 justify-center"
                >Are you sure you want to delete this book?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteBook">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </template>
      {{ /* eslint-disable */}}
      <template v-slot:item.actions="{ item }" v-if="user && user.isAdmin">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:item.actions="{ item }" v-else>
        <v-btn color="primary" @click="reserveItem(item)"> Reservation </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogReserve" max-width="520px">
      <v-card>
        <v-card-title class="text-h5 justify-center"
          >Are you sure you want to reserve this book?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeReserve">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="reservation">OK</v-btn>
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
    dialog: false,
    dialogDelete: false,
    dialogReserve: false,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    headers: [
      {
        text: "Title",
        align: "start",
        sortable: false,
        value: "title",
      },
      { text: "Author", value: "author" },
      { text: "ISBN", value: "isbn" },
      { text: "Quantity", value: "quantity" },
      { text: "Category", value: "category" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    books: [],

    editedIndex: -1,
    editedItem: {
      title: "",
      author: 0,
      isbn: 0,
      quantity: 0,
      category: 0,
    },
    defaultItem: {
      title: "",
      author: 0,
      isbn: 0,
      quantity: 0,
      category: 0,
    },
  }),

  computed: {
    ...mapGetters({ user: "user" }),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    dialogReserve(val) {
      val || this.closeReserve();
    },
  },

  created() {
    this.initialize();
  },

  mounted() {
    this.getBooks();
  },

  methods: {
    async reservation() {
      try {
        console.log(this.user._id, this.editedItem._id, dueDate, Date.now());
        console.log(this.editedItem);
        let dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 1);

        await axios.post("http://localhost:3000/reservation/add", {
          user: this.user._id,
          book: this.editedItem._id,
          reservationDate: Date.now(),
          dueDate: dueDate,
        });
        this.closeReserve();
      } catch (error) {
        console.log(error);
      }
    },

    async getBooks() {
      try {
        let res = await axios.get("http://localhost:3000/book");
        this.books = res.data;
        //console.log(this.books);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteBook() {
      try {
        console.log(this.editedItem._id);

        let res = await axios.delete(
          `http://localhost:3000/book/delete/${this.editedItem._id}`
        );
        console.log(res.data);
        this.books.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) {
        console.log(error);
      }
    },

    async editBook() {
      try {
        if (this.editedIndex > -1) {
          await axios.patch(
            `http://localhost:3000/book/update/${this.editedItem._id}`,
            { doc: this.editedItem }
          );
          Object.assign(this.books[this.editedIndex], this.editedItem);
        } else {
          this.books.push(this.editedItem);
        }
        this.close();
      } catch (error) {
        console.log(error);
      }
    },

    initialize() {},

    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    reserveItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogReserve = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeReserve() {
      this.dialogReserve = false;
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>

<style></style>
