<template>
  <v-container class="pa-8">
    <v-data-table
      :headers="headers"
      :items="desserts"
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
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <!-- <v-card>
      <v-card-title style="background-color: #2a5d7a; color: white"
        >Members <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="text-white"
          dark
        ></v-text-field
      ></v-card-title>

      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :items-per-page="10"
        class="elevation-1"
      ></v-data-table></v-card
  > --></v-container
  >
</template>

<script>
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
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
    desserts: [],
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
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          title: "Gospodar prstenova",
          author: 159,
          isbn: 6.0,
          quantity: 24,
          category: 4.0,
        },
        {
          title: "Šegrt Hlapić",
          author: "Ivana Brlić-Mažuranić",
          isbn: 9541564181,
          quantity: 37,
          category: "Item 1",
        },
        {
          title: "Vlak u snijegu",
          author: 262,
          isbn: 16.0,
          quantity: 23,
          category: 6.0,
        },
        {
          title: "Cupcake",
          author: 305,
          isbn: 3.7,
          quantity: 67,
          category: 4.3,
        },
        {
          title: "Gingerbread",
          author: 356,
          isbn: 16.0,
          quantity: 49,
          category: 3.9,
        },
        {
          title: "Jelly bean",
          author: 375,
          isbn: 0.0,
          quantity: 94,
          category: 0.0,
        },
        {
          title: "Lollipop",
          author: 392,
          isbn: 0.2,
          quantity: 98,
          category: 0,
        },
        {
          title: "Honeycomb",
          author: 408,
          isbn: 3.2,
          quantity: 87,
          category: 6.5,
        },
        {
          title: "Donut",
          author: 452,
          isbn: 25.0,
          quantity: 51,
          category: 4.9,
        },
        {
          title: "KitKat",
          author: 518,
          isbn: 26.0,
          quantity: 65,
          category: 7,
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style></style>
