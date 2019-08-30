<template>
  <div>
    <navigation />
    <Search category="block" description="Block Heights" class="searchBar" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";

@Component({
  components: {
    Navigation,
    Search
  }
})
export default class Blocks extends Vue {
  created() {
    this.$store.dispatch("SET_EXPLORER");
  }

  beforeCreate() {
    const { height } = this.$route.params;
    if (height) {
      this.$store.dispatch("SET_BLOCK_HEIGHT", height);
    }
  }
}
</script>
<style scoped>
.searchBar {
  width: 50%;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>