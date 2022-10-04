<template>
  <div class="container">
    <ul>
      <li v-for="(list, index) in liste" :key="index">
        <span>{{ list }}</span>
        <span v-if="list" class="icon">+</span>
      </li>
      <!-- <li>Group 1</li>
      <li>Group 1</li> -->
    </ul>
    <input type="text" v-model="inputValue" />
    <button @click="create">Create new group</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";

@Component
export default class chooseFavorite extends Vue {
  @Prop({ required: true }) id!: number;
  inputValue = "";
  liste: string[] = [];
  created() {
    this.liste = PokemonModule.GetListe;
    // console.log("cereted func", this.liste);
  }
  create() {
    PokemonModule.SET_LİSTE(this.inputValue);
    // console.log("cereted func", this.liste);

    // const li = document.createElement("li");
    // const node = document.createTextNode(this.inputValue);
    // li.appendChild(node);
    // const ulli = document.querySelector("ul");
    // ulli?.appendChild(li);
    // this.liste.push(li);
    // this.liste.push(this.inputValue);
    this.inputValue = "";
  }
}
</script>

<style scoped>
.container {
  background-color: #cccccc;
  width: 100%;
  top: 200px;
  border-radius: 1rem;
}
li {
  list-style-type: none;
}
.icon {
  margin-left: 1rem;
  cursor: pointer;
}
</style>
