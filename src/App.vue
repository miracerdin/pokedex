<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/FavoritesPage">FavoritesPage</router-link> |
      <router-link to="/LoginView">Login</router-link> |
      <router-link to="/RegisterView">Register</router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import HeaderComponent from "@/components/HeaderComponent.vue";
@Component({
  components: {
    HeaderComponent,
  },
})
export default class App extends Vue {}
</script>
<style>
html,
body {
  margin: 0px !important;
  padding: 0px !important;
  background-color: #95e9c4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  font-size: 1.5rem;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
