<template>
  <div class="home">
    <div v-if="!allDataList">Loading..</div>
    <div class="col">
      <input type="text" v-model="search" placeholder="Search" />
    </div>
    <div class="cover">
      <div v-for="data in filteredList" :key="data.id">
        <OnePokemon :data="data"></OnePokemon>
      </div>
    </div>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
import OnePokemon from "./OnePokemon.vue";
@Component({
  computed: {
    ...mapGetters(["allDataList"]),
    filteredList() {
      if (!this.search) {
        return this.allDataList;
      } else {
        return this.allDataList.filter((post) => {
          return post.name.toLowerCase().includes(this.search.toLowerCase());
        });
      }
    },
  },
  methods: {
    ...mapActions(["fetchPokemon"]),
  },
  created() {
    this.fetchPokemon();
  },
  components: {
    // HelloWorld,
    OnePokemon,
  },
})
export default class HomeView extends Vue {
  data() {
    return {
      search: "",
    };
  }
}
</script>
<style>
.home {
}
</style>
