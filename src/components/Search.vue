<template>
  <div>
    <b-form inline @submit.stop.prevent>
      <b-form-input 
        min="1"
        class="searchField" 
        v-model="SearchVal"  
        type="text"
        :error="this.error" 
        :placeholder="getPlaceHolder()"
        v-on:keyup.enter="handleSearch"/>
      <b-button variant="primary" @click="handleSearch">Search</b-button>
    </b-form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  props: {
    name: String
  },
  methods: {
    getPlaceHolder() {
      return "Search " + this.$props.name;
    }
  }
})
export default class Search extends Vue {
  SearchVal: string = "";
  error: string = "";

  handleSearch() {
    this.checkSearchInput();
  }

  checkSearchInput() {
    const category = this.$props.name;
    if ((category === "Blocks" || category === "Block") && !isNaN(parseInt(this.SearchVal)) && parseInt(this.$store.getters.EXPLORER.height) > parseInt(this.SearchVal)) {
      this.$store.dispatch('SET_BLOCK_HEIGHT', this.SearchVal);
      this.$router.push("/blocks/" + this.SearchVal);
      this.error = "";
    } else {
      this.error = "Can't find any " + category + " that matches " + this.SearchVal;
    }
  }

  get searchVal() : string {
    this.checkSearchInput();
    return this.searchVal;
  }

  created() {
    this.$store.dispatch('SET_EXPLORER', this.SearchVal);
  }
}
</script>

<style scoped>
.searchField {
  width: 15rem;
}
</style>
