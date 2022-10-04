<template>
  <div class="home">
    <div v-if="!datalist">Loading..</div>
    <div class="col">
      <input type="text" v-model="search" placeholder="Search" />
    </div>
    <div class="cover">
      <div>
        <InfiniteScroll :articles="filteredList" @refetch="fetch">
        </InfiniteScroll>
      </div>
    </div>

    <div class="item error" v-if="search && !filteredList.length">
      <p>No results found!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OnePokemon from "./OnePokemon.vue";
// import { Action, Getter } from "vuex-class";
// import DetailPage from "./DetailPage.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import { db } from "../store/db";
import PokemonModule from "@/store/Pokemon";
import axios from "axios";

@Component({
  components: {
    // OnePokemon,
    InfiniteScroll,
  },
})
export default class HomeView extends Vue {
  search = "";
  datalist: Array<string | object> = [];
  articles: string[] = [];
  favorites = [];
  offset = 20;
  lastpokemon = 20;

  // firestore:{
  //   favorites:db.collection("favorites")
  // }
  created() {
    PokemonModule.SetDatas(this.filteredList);
  }
  async fetch(offset: number) {
    if (this.lastpokemon >= 1200) {
      return;
    }
    let articles = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
      .then((response) => {
        // console.log("response", response.data.results);
        for (let i of response.data.results) {
          let datas = axios.get(i.url).then((response) => {
            // console.log("response", response.data);
            this.articles.push(response.data);
          });
        }
      })
      .catch((error) => console.log(error));
    this.lastpokemon += 20;
    // console.log("articles", this.articles);
  }

  // this.$store.dispatch("fetchPokemon");
  // }
  async mounted() {
    this.fetch(0);
    console.log("favorites", PokemonModule.favorites);
    // this.datalist = this.$store.getters.allDataList;
    let local = JSON.parse(localStorage.getItem("liste") as string) as [];
    if (!local || local.length === 0) {
      localStorage.setItem("liste", JSON.stringify([]));
    }
  }

  get filteredList() {
    if (!this.search) {
      return this.articles;
    } else {
      return this.articles.filter((post: any) => {
        return post.name.includes(this.search.toLowerCase());
      });
    }
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item {
  text-align: center;
}
.col {
  width: 100%;

  margin: auto;
}
input {
  width: 40%;
  height: 2rem;
  margin: auto;
  font-size: 1.5rem;
}
</style>
