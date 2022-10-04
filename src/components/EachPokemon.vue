<template>
  <div class="container">
    <slot name="item" v-bind:item="item"></slot>
    <h3>{{ item.name }}</h3>
    <div class="imgDiv">
      <img
        :src="item.sprites.other.dream_world.front_default"
        alt="pokemonImage"
      />
    </div>
    <div class="spans">
      <router-link
        class="link"
        :to="{ name: 'DetailPage', params: { name: item } }"
        >Detail</router-link
      >
      <span class="addFavoriteFunc" v-on:click="addToFavorites"
        ><i
          class="fa-solid fa-heart"
          :class="{ active: isActive }"
          @click="chooseFavorite(item.id)"
        ></i>
      </span>
    </div>
    <ChooseFavorite
      class="component"
      :class="{ active: isActive }"
      :id="item.id"
    ></ChooseFavorite>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import ChooseFavorite from "./ChooseFavorite.vue";
@Component({
  components: {
    ChooseFavorite,
  },
})
export default class EachPokemon extends Vue {
  @Prop({ required: true }) item!: {
    id: number;
    name: string;
    sprites: { other: { dream_world: { front_default: string } } };
  };
  liste = [];
  isActive = false;

  addToFavorites() {
    // this.isActive = true;
    PokemonModule.SET_TITLE(this.item);
    // this.$store.dispatch("addFavorites", this.item);
    let local = JSON.parse(localStorage.getItem("liste") as string);
    if (local && local.some((res) => res.id === this.item.id)) {
      null;
    } else {
      local.push(this.item);
    }
    localStorage.setItem("liste", JSON.stringify(local));
  }
  chooseFavorite(id: number) {
    console.log(this.isActive);
    this.isActive = !this.isActive;
    console.log(this.isActive);
    console.log(id, event);

    // this.isActive = !this.isActive;
  }
  closeFavorite() {
    console.log(event);
    this.isActive = false;
  }
}
</script>

<style scoped>
.container {
  position: relative;
}
h3 {
  width: 100%;
  text-align: center;
}
.imgDiv {
  width: 100%;
}
.eachOne {
  margin: 1rem auto;
  background: #ccc;
  width: 200px;
  border-radius: 1em;
  z-index: 3;
}
img {
  width: 80%;
  height: 100px;
  object-fit: contain;
}
i {
  cursor: pointer;
}
.spans {
  padding: 1rem;
  margin: auto;
}
.component {
  position: absolute;
  z-index: -1;
}
.active {
  z-index: 2;
}
</style>
