<template>
  <div class="wrapper">
    <div class="ui center aligned basic segment">
      <div class="ui left icon action input">
        <i class="search icon"></i>
        <input v-model="SearchVal" v-on:keyup.enter="handleSearch" type="text" placeholder="Search Heights, Blocks and transactions">
        <div class="ui blue submit button" @click="handleSearch">Search</div>
      </div>
      <sui-divider horizontal>Statistics</sui-divider>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@/components/Search.vue";
import GeneralStats from "@/components/GeneralStats.vue";

@Component({
  components: {
    Search,
    GeneralStats
  }
})
export default class Home extends Vue {
  SearchVal: string = "";

  handleSearch() {
    this.$router.push("/blocks/" + this.SearchVal);
  }
}
</script>

<style scoped>
    .wrapper {

    }
</style>

