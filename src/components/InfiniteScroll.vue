<template>
  <div class="container">
    <div class="eachOne" v-for="item in articles" :key="item.name">
      <EachPokemon :item="item"></EachPokemon>
      <!-- <slot name="item" v-bind:item="item"></slot>
      <h3>{{ item.name }}</h3>
      <div>
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
          ><i class="fa-solid fa-heart" :class="{ active: isActive }"></i>
        </span>
      </div> -->
      <!-- <h1>{{ article.name }}</h1>
      <p>{{ article.email }}</p>
      <p>{{ article.body }}</p> -->
    </div>
    <div
      v-if="articles.length"
      v-observe-visibility="handleScrollToBottom"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import EachPokemon from "@/components/EachPokemon.vue";
@Component({
  components: {
    EachPokemon,
  },
})
export default class InfiniteScroll extends Vue {
  @Prop({ required: true }) articles!: [
    {
      name: string;
      url: string;
      sprites: { other: { dream_world: { front_default: string } } };
    }
  ];
  isActive = false;
  offset = 0;
  // limit = 100;
  async handleScrollToBottom(isVisible: boolean) {
    if (!isVisible) {
      return;
    }
    this.offset += 100;
    this.$emit("refetch", this.offset);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.eachOne {
  margin: 1rem auto;
  background: #ccc;
  width: 200px;
  border-radius: 1em;
}
img {
  width: 80%;
  height: 100px;
  object-fit: contain;
}
</style>
