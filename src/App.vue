<template>
  <v-app>
    <v-app-bar
      app
      color="#1D3B56"
      dark
      clipped-left
      v-if="$route.name !== 'Login'"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        v-if="isMobile"
      ></v-app-bar-nav-icon>
      <v-icon class="mr-2" x-large>mdi-book-open-variant x-large</v-icon>
      <span class="text-h4"> ReadBook</span>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="#2F6888"
      v-if="$route.name !== 'Login'"
    >
      <v-list-item>
        <v-list-item-content>
          <v-icon size="150" color="white">mdi-book-open-variant</v-icon>
          <v-list-item-subtitle style="color: white; text-align: center">
            Welcome!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
          @click="menuActionClick(item.action)"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: white">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "App",

  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard", link: "/" },
        { title: "Add member", icon: "mdi-account-plus", link: "/addMember" },
        { title: "Members", icon: "mdi-account", link: "/members" },
        { title: "Add book", icon: "mdi-book-plus", link: "/addBook" },
        { title: "All books", icon: "mdi-book", link: "/books" },
        { title: "All issued", icon: "mdi-book-clock", link: "/issued" },
        { title: "Report", icon: "mdi-poll", link: "/report" },
        {
          title: "Logout",
          icon: "mdi-logout",

          action: "logout",
        },
      ],
      right: null,
      drawer: true,
      isMobile: false,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    ...mapActions({ getUserData: "getUserData" }),
    ...mapMutations({ logout: "logout" }),
    onResize() {
      this.windowWidth = window.innerWidth;
    },
    menuActionClick(action) {
      if (action === "logout") {
        this.logout();
        localStorage.clear("token");
        this.$router.push("/login");
      }
    },
  },
  watch: {
    windowWidth() {
      if (this.windowWidth <= 1263) {
        this.isMobile = true;
      } else this.isMobile = false;
    },
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    this.getUserData();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
};
</script>

<style scoped></style>
