<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col
        v-for="card in cards"
        :key="card.title"
        :align="isMobile ? 'center' : ''"
      >
        <v-card class="mb-5" width="475" outlined :color="card.color">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h6 mb-1">
                {{ card.title }}
              </v-list-item-title>
              <v-list-item-subtitle
                class="text-h3 text-start"
                v-if="card.number"
                >{{ card.number }}</v-list-item-subtitle
              >
            </v-list-item-content>
            <v-icon color="black" size="80">{{ card.icon }}</v-icon>
          </v-list-item>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn outlined rounded text :to="card.link">
              {{ card.view }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data: () => ({
    summary: null,
    isMobile: false,
    cards: [
      {
        title: "Books",
        view: "View all books",
        icon: "mdi-book",
        color: "yellow",
        link: "/books",
        number: 0,
      },
      {
        title: "Members",
        view: "View all members",
        icon: "mdi-account",
        color: "blue",
        link: "/members",
        number: 0,
      },
      {
        title: "Issued",
        view: "View all issued",
        icon: "mdi-book-clock",
        color: "green",
        link: "/issued",
        number: 0,
      },
      {
        title: "Active reservations",
        view: "View active reservations",
        icon: "mdi-run",
        color: "red",
        link: "/reservation",
        number: 0,
      },
    ],
  }),
  mounted() {
    this.onResize();

    window.addEventListener("resize", this.onResize, { passive: true });
    this.getSummary();
  },
  beforeDestroy() {
    if (typeof window === "undefined") return;

    window.removeEventListener("resize", this.onResize, { passive: true });
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 1000;
    },
    async getSummary() {
      try {
        let res = await axios.get("/summary");

        this.cards[0].number = res.data.allBooks;
        this.cards[1].number = res.data.members;
        this.cards[2].number = res.data.issuedBooks;
        this.cards[3].number = res.data.activeReservations;
        //console.log(res.data);
        //console.log(this.cards);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.containerr {
  display: flex;
  justify-content: space-between;
}

.row {
  margin: 0 !important;
}
</style>
