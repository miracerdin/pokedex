<template>
  <div class="cover">
    <div class="container" v-for="data in datas" :key="data.id">
      <h2>{{ data?.name?.toUpperCase() }}</h2>
      <div class="imgDiv">
        <img v-bind:src="data?.sprites?.front_default" alt="images" />
      </div>
      <div class="spans">
        <!-- <span>Detail</span>

        <span v-on:click="addToFavorites"
          ><i class="fa-solid fa-heart" :class="{ active: isActive }"></i>
        </span> -->
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
  async mounted() {
    let local = JSON.parse(localStorage.getItem("liste"));
    this.datas = local;
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  flex-wrap: wrap;
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
</style>
