<template>
  <div>
    <h3>Login</h3>
    <form @submit.prevent="pressed">
      <div class="mb-3">
        <!-- <label for="" class="form-label">Email</label> -->
        <input
          v-model="email"
          type="email"
          class="form-control"
          name="email"
          id="email"
          aria-describedby="emailHelpId"
          placeholder="email"
        />
      </div>

      <div class="mb-3">
        <!-- <label for="" class="form-label">Password</label> -->
        <input
          v-model="password"
          type="password"
          class="form-control"
          name="password"
          id="password"
          placeholder="password"
        />
      </div>
      <button type="submit">Send</button>
    </form>
    <span
      >Need an account? Click here to
      <router-link to="/RegisterView">Register</router-link></span
    >
  </div>
</template>

<script lang="ts">
import { auth, signIn } from "@/store/db";

import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class LoginView extends Vue {
  email = "";
  password = "";

  pressed() {
    if (this.email && this.password) {
      signIn(this.email, this.password);
      this.email = "";
      this.password = "";
      console.log(auth);
      //   this.$router.push({ name: "home" }); eğer vue içinde olsaydı bu şekilde yazacaktık. Ancak db.ts içinde yönlendirme yaptım.Bu yüzden router.push({name:"home"}) şeklinde yazdım.
    }
  }
}
</script>

<style scoped>
div {
  color: inherit;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 100px;
  height: 45px;
  font-size: 100%;
}
.error {
  color: red;
}
</style>
