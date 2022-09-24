<template>
  <div>
    <h1>{{ dataEach?.name?.toUpperCase() }}</h1>
    <img v-bind:src="dataEach?.sprites?.front_default" alt="images" />
  </div>
</template>
<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OnePokemon",
  props: ["data"],
  data() {
    return {
      dataEach: [],
    };
  },
  async created() {
    await axios.get(this.data.url).then((response) => {
      this.dataEach = response.data;
    });
  },
};
</script>
<style></style>
