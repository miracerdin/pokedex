<template>
  <div class="cover">
    <div class="container">
      <h1>{{ data.name }}</h1>
      <div>
        <h3>Abilities:</h3>
        <p v-for="inside in data.abilities" :key="inside.name">
          {{ inside.ability.name }}
        </p>
      </div>
      <hr />
      <p>Height:{{ data.height }}</p>
      <p>Weight:{{ data.weight }}</p>
      <p>Base experience: {{ data.base_experience }}</p>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class DetailPage extends Vue {
  data = {};
  async mounted() {
    this.data = this.$route.params.name;
    console.log(this.data);
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  justify-content: center;
}
.container {
  background-color: bisque;
  width: 400px;
  border-radius: 8px;
}
hr {
  border: 1px dashed grey;
}
</style>
