<template>
  <div class="cover">
    <div class="info" v-if="datas.length === 0">
      There is no favorite pokemon.
    </div>
    <div class="container" v-for="data in datas" :key="data.id">
      <h2 class="h2">{{ data.name.toUpperCase() }}</h2>
      <div class="imgDiv">
        <img
          v-bind:src="data.sprites.other.dream_world.front_default"
          alt="images"
        />
      </div>
      <div class="spans">
        <span class="deleteSpan" @click="deletefavorite(data)">
          <i class="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
// import { mapGetters, mapActions } from "vuex";

@Component
export default class FavoritesPage extends Vue {
  datas = [];

  async created() {
    let local = JSON.parse(localStorage.getItem("liste"));
    this.datas = local;
    console.log("bu local", local);
  }
  async deletefavorite(data) {
    let local = JSON.parse(localStorage.getItem("liste"));
    let filtered = local.filter((item) => item.id !== data.id);
    localStorage.setItem("liste", JSON.stringify(filtered));
    this.datas = filtered;
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.container {
  width: 200px;
  height: 200px;
  margin: 1rem;
  background-color: burlywood;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
}
.container:hover {
  transform: scale(1.02);
}
.info {
  justify-content: center;
}
.imgDiv {
  width: 200px;
  height: 90%;
}
img {
  width: 150px;
  height: 100px;
  object-fit: fill;
}
</style>
