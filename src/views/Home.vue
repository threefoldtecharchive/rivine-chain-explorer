<template>
  <div>
    <navigation />
    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui text container">
          <h1 class="ui inverted header">
            Tfchain Explorer
          </h1>
          <h2>Search any hash or block.</h2>
          <div class="searchBar">
            <search />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@/components/Search.vue";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Search,
    Navigation
  }
})
export default class Home extends Vue {
  SearchVal: string = "";
}
</script>
<style scoped>
.searchBar {
  width: 30vw;
  margin-top: 10%;
}
</style>