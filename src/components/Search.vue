<template>
  <section>
    <form v-on:submit.prevent="handleSearch">
      <b-field
        :type="{ 'is-danger': errors.has('search') }"
        :message="errors.first('search')"
      >
        <b-input
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
        </b-input>
        <b-button @click="handleSearch">Search</b-button>
      </b-field>
      <p v-if="error">{{ error }}</p>
    </form>
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
    this.$validator.validateAll().then(result => {
      if (result) {
        if (
          (this.category === "blocks" ||
            this.category === "block" ||
            this.category === "all") &&
          !isNaN(parseInt(this.SearchVal))
        ) {
          this.$store.dispatch("SET_BLOCK_HEIGHT", this.SearchVal).then(() => {
            this.$router.push("/block/" + this.SearchVal);
            this.error = "";
          });
        } else {
          this.error =
            "Can't find any " +
            this.category +
            " that matches " +
            this.SearchVal;
        }
        return;
      }
    });
  }
}
</script>

<style scoped>
.searchBar {
  width: 100%;
}
</style>
