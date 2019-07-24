<template>
  <div>
    <sui-input v-model="SearchVal" placeholder="Search Blocks" icon="search" v-on:keyup.enter="handleSearch" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Search extends Vue {
  SearchVal: string = "";

  handleSearch() {
    console.log(this.SearchVal);
    this.$router.push("/blocks/" + this.SearchVal);
  }
}
</script>
