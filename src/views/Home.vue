<template>
  <div>
    <navigation />
    <div class="pusher">
      <div class="ui inverted vertical masthead center aligned segment">
        <div class="ui text container">
          <h1 class="ui inverted header">
            {{ Name }} Explorer
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
import { NAME } from "../common/config";

@Component({
  components: {
    Search,
    Navigation
  }
})
export default class Home extends Vue {
  Name = NAME
  SearchVal: string = "";
  created () {
    console.log(process.env)
  }
}
</script>
<style scoped>
.searchBar {
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>