<template>
  <div class="cover">
    <div class="container">
      <h2 v-if="dataEach.name">{{ dataEach.name.toUpperCase() }}</h2>
      <div class="imgDiv">
        <img
          v-if="dataEach.sprites"
          v-bind:src="dataEach.sprites.front_default"
          alt="images"
        />
      </div>
      <div class="spans">
        <router-link
          class="link"
          :to="{ name: 'DetailPage', params: { name: dataEach } }"
          >Detail</router-link
        >
        <span class="addFavoriteFunc" v-on:click="addToFavorites"
          ><i class="fa-solid fa-heart" :class="{ active: isActive }"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { LocalTypes } from "../types/index";
@Component({
  // props: {
  //   data: {
  //     type: Object,
  //     default: true,
  //   },
  // },
  // methods: {
  //   ...mapActions(["addFavorites"]),
  // },
  // computed: {
  //   ...mapGetters(["allfavorites"]),
  // },
})
export default class OnePokemon extends Vue {
  dataEach = {} as LocalTypes;
  favoriteList = "";
  isActive = false;
  @Prop() data!: object;

  async created() {
    const { data } = await axios.get(`${this.data}`);

    this.dataEach = {
      url: data.url,
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      sprites: data.sprites,
      abilities: data.abilities,
      base_experience: data.base_experience,
    };
  }
  addToFavorites() {
    this.isActive = true;
    this.$store.dispatch("addFavorites", this.dataEach);
    let local = JSON.parse(localStorage.getItem("liste") as string);
    if (local && local.some((item) => item.id === this.dataEach.id)) {
      null;
    } else {
      local.push(this.dataEach);
    }
    localStorage.setItem("liste", JSON.stringify(local));
  }
}
</script>
<!-- <script>
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
    await axios.get(this.data?.url).then((response) => {
      this.dataEach = response.data;
    });
  },
};
</script> -->
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
.active {
  color: red;
}
.poke {
  text-align: center;

  width: 100px;
  height: 100px;
}
.alt {
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.spans {
  font-size: 1.2rem;
}
.link {
  transition: color 0.3s ease;
}
.link:hover {
  color: rgb(244, 63, 8);
}
.spans span {
  margin: 1rem;
}
img {
  width: 100%;
  object-fit: cover;
}
h1 {
  max-width: 80%;
}
</style>
