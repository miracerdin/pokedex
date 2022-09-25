<template>
  <div>
    <h1>{{ data.name }}</h1>
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
@Component({
  //   props: ["dataEach"],
})
export default class HomeView extends Vue {
  data = "";
  async mounted() {
    this.data = this.$route.params.name;
    console.log(this.data);
  }
}
</script>
