<template>
  <section>
    <b-field>
      <b-input
        class="searchField"
        v-model="SearchVal"
        type="search"
        :error="this.error"
        :placeholder="getPlaceHolder()"
        v-on:keyup.enter="handleSearch()"
        icon-pack="fas"
        icon="search"
      >
      </b-input>
      <b-button @click="handleSearch">Search</b-button>
    </b-field>
    <p v-if="error">{{ error }}</p>
  </section>
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
    if (
      (category === "Blocks" || category === "Block") &&
      !isNaN(parseInt(this.SearchVal)) &&
      parseInt(this.$store.getters.EXPLORER.height) > parseInt(this.SearchVal)
    ) {
      this.$store.dispatch("SET_BLOCK_HEIGHT", this.SearchVal);
      this.$router.push("/block/" + this.SearchVal);
      this.error = "";
    } else {
      this.error =
        "Can't find any " + category + " that matches " + this.SearchVal;
    }
  }

  get searchVal(): string {
    this.checkSearchInput();
    return this.searchVal;
  }

  created() {
    this.$store.dispatch("SET_EXPLORER", this.SearchVal);
  }
}
</script>

<style scoped>
.searchField {
  width: 15rem;
}
</style>
