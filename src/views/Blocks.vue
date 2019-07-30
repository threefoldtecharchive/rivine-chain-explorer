<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-head">
        <navigation />
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Search a specific block height
          </h1>
          <div class="columns is-centered is-mobile is is-vcentered">
            <div class="column is-narrow has-text-centered">
              <Search category="block" description="Block Heights" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <p>Current Block Height: {{ this.$store.getters.EXPLORER.height }}</p>
    <div :closable="false">
      <result-table :page="currentPage" v-if="this.loaded" />
      <b-pagination
        v-if="this.loaded"
        :total="this.$store.getters.EXPLORER.height"
        :current.sync="currentPage"
        :simple="true"
        :per-page="20"
        icon-pack="fa"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
      </b-pagination>
      <b-loading :is-full-page="true" :active.sync="!this.loaded"></b-loading>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import ResultTable from "@/components/ResultTable.vue";

@Component({
  components: {
    Navigation,
    Search,
    ResultTable
  }
})
export default class Blocks extends Vue {
  private loaded: boolean = false;
  private currentPage: Number = 1;
  beforeMount() {
    this.$store.dispatch("SET_EXPLORER").then(() => {
      this.$store.dispatch("GET_BLOCKS").then(() => {
        this.loaded = true;
      });
    });
  }
}
</script>
