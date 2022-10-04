<template>
  <div>
    Logged in
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <div>
      <button @click="signOut">Sign out</button>
    </div>
  </div>
</template>

<script lang="ts">
import { auth, logOut } from "@/store/db";
import Vue from "vue";

export default class HaederComponent extends Vue {
  loggedIn = false;

  mounted() {
    this.setupFirebase();
  }
  setupFirebase() {
    auth.onAuthStateChanged((user) => {
      //   this.loggedIn = !!user;
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  async signOut() {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<style scoped></style>
