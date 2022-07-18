<template>
  <v-container class="pa-8">
    <v-data-table
      :headers="headers"
      :items="users"
      sort-by="calories"
      class="elevation-3"
      :search="search"
    >
      <template v-slot:top>
        <v-card flat>
          <v-card-title style="background-color: #2a5d7a; color: white"
            >Members <v-spacer></v-spacer>
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
              <v-card-title>Edit member</v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="editUser">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="550px">
            <v-card>
              <v-card-title class="text-h5 justify-center"
                >Are you sure you want to delete this member?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteUser">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </template>
      {{ /* eslint-disable-next-line */}}
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "name" },
      { text: "email", value: "email" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      email: "",
      password: "",
    },
    defaultItem: {
      name: "",
      email: "",
      password: "",
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
    this.getUsers();
  },

  methods: {
    async getUsers() {
      try {
        let res = await axios.get("http://localhost:3000/user");
        this.users = res.data;
        //console.log(this.users);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteUser() {
      try {
        console.log(this.editedItem._id);

        let res = await axios.delete(
          `http://localhost:3000/user/delete/${this.editedItem._id}`
        );
        console.log(res.data);
        this.users.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) {
        console.log(error);
      }
    },

    async editUser() {
      try {
        if (this.editedIndex > -1) {
          await axios.patch(
            `http://localhost:3000/user/update/${this.editedItem._id}`,
            { doc: this.editedItem }
          );
          Object.assign(this.users[this.editedIndex], this.editedItem);
        } else {
          this.users.push(this.editedItem);
        }
        this.close();
      } catch (error) {
        console.log(error);
      }
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
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
  },
};
</script>

<style></style>
