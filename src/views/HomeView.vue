<template>
  <div class="home">
    <div v-if="!allDataList">Loading..</div>
    <div class="col">
      <input type="text" v-model="search" placeholder="Search" />
    </div>
    <div class="cover">
      <div v-for="data in filteredList" :key="data.name">
        <OnePokemon :data="data"></OnePokemon>
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
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    OnePokemon,
  },
})
export default class HomeView extends Vue {
  search = "";

  @Action("fetchPokemon")
  fetchPokemon!: () => any;
  @Getter("allDataList")
  allDataList!: { name: string }[];

  async mounted() {
    this.fetchPokemon();
    let local = JSON.parse(localStorage.getItem("liste") as string) as [];
    if (!local || local.length === 0) {
      localStorage.setItem("liste", JSON.stringify([]));
    }
  }

  get filteredList() {
    if (!this.search) {
      return this.allDataList;
    } else {
      return this.allDataList.filter((post) => {
        console.log(this.search);
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
}
.item {
  text-align: center;
}
</style>
