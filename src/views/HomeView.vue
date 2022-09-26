<template>
  <div class="home">
    <div v-if="!allDataList">Loading..</div>
    <div class="col">
      <input type="text" v-model="search" placeholder="Search" />
      <!-- <button v-on:click="filteredList">Search</button> -->
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
import { Component, Vue, Watch } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import OnePokemon from "./OnePokemon.vue";
import { Action, Getter } from "vuex-class";

@Component({
  components: {
    OnePokemon,
  },
  // props: {
  //   search: {
  //     type: String,
  //     default: "",
  //   },
  // },

  // computed: {
  //   ...mapGetters(["allDataList"]),
  //   filteredList() {
  //     if (!this.search) {
  //       return this.allDataList;
  //     } else {
  //       return this.allDataList.filter((post) => {
  //         return post.name.toLowerCase().includes(this.search.toLowerCase());
  //       });
  //     }
  //   },
  // },
  // methods: {
  //   ...mapActions(["fetchPokemon"]),
  // },
  // created() {
  //   this.fetchPokemon();
  // },
})
export default class HomeView extends Vue {
  search = "";
  dataList = [];

  // data() {
  //   return {
  //     dataList: [],
  //   };
  // }

  @Action("fetchPokemon")
  fetchPokemon!: () => any;
  @Getter("allDataList")
  allDataList!: { name: string }[];

  async mounted() {
    this.fetchPokemon();
    // console.log("all", this.allDataList);

    let local = JSON.parse(localStorage.getItem("liste") as string) as [];
    if (!local || local.length === 0) {
      localStorage.setItem("liste", JSON.stringify([]));
    }
  }
  // deneme() {
  //   this.allDataList.filter((item) =>
  //     item.name.toLowerCase().includes(this.search)
  //   );
  // }
  // @Watch("search")
  // filteredList() {
  //   if (!this.search) {
  //     return (this.dataList = this.allDataList);
  //   } else {
  //     return this.allDataList.filter((post): object => {
  //       console.log(this.search);
  //       return post.name.includes(this.search.toLowerCase());
  //     });
  //   }
  // }
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

  // set filteredList(value) {
  //   this.allDataList;
  // }
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
