<template>
  <section>
    <form v-on:submit.prevent="handleSearch">
      <div class="ui icon input">
        <i class="search icon"></i>
        <input
          class="searchBar"
          v-model="SearchVal"
          type="search"
          name="search"
          :error="this.error"
          :placeholder="getPlaceHolder()"
          v-on:keyup.enter="submit"
          icon-pack="fas"
          icon="search"
          v-validate="'required'"
        >
      </div>
      <p v-if="error">{{ error }}</p>
    </form>
    <!-- <button @click="handleSearch" class="ui primary basic button big searchButton">Search</button> -->
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class Search extends Vue {
  SearchVal: string = "";
  error: string = "";

  @Prop({ default: "all" })
  category!: string;
  @Prop({ default: "Blocks, Transactions..." })
  description!: string;

  getPlaceHolder() {
    return "Search " + this.description;
  }

  handleSearch() {
    this.checkSearchInput();
  }

  checkSearchInput() {
    if (this.SearchVal.length > 60 || this.category === "hash") {
      this.$store.dispatch("SET_HASH", this.SearchVal)
      this.$router.push("/hashes/" + this.SearchVal)
    } else if (parseInt(this.SearchVal) || this.category === "block") {
      this.$store.dispatch("SET_BLOCK_HEIGHT", this.SearchVal)
      this.$router.push("/block/" + this.SearchVal)
    }
  }

  created() {
    this.$store.dispatch("SET_EXPLORER", this.SearchVal);
  }
}
</script>

<style scoped>
.searchBar {
  width: 30vw;
  margin-top: 10%;
}
.searchButton {
  margin-top: 5%;
}
</style>
