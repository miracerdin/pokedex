<template>
  <div>
    <h3>Register</h3>
    <form @submit.prevent="register">
      <div class="mb-3">
        <!-- <label for="" class="form-label">Email</label> -->
        <input
          v-model="displayName"
          type="name"
          class="form-control"
          name="name"
          id="name"
          aria-describedby="emailHelpId"
          placeholder="Name"
        />
      </div>
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
  </div>
</template>

<script lang="ts">
import { createUser, signIn } from "@/store/db";
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class RegisterView extends Vue {
  email = "";
  password = "";
  displayName = "";
  register() {
    if (this.email && this.password) {
      createUser(this.email, this.password, this.displayName);
      this.email = "";
      this.password = "";
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
