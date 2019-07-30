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
    <p>Current Block Height: {{ latestHeight }}</p>
    <div :closable="false">
      <result-table :blocks="blocks" :page="currentPage" v-if="!this.loading" />
      <b-pagination
        v-if="!this.loading"
        :total="50"
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
      <b-loading :is-full-page="false" :active.sync="this.loading"></b-loading>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import ResultTable from "@/components/ResultTable.vue";
import Axios from "axios";
import { API_URL } from "@/common/config";

@Component({
  components: {
    Navigation,
    Search,
    ResultTable
  }
})
export default class Blocks extends Vue {
  private loading: boolean = true;
  private currentPage: Number = 1;
  private blocks: any[] = [];
  private latestHeight: Number = 0;

  async loadBlocks() {
    const self = this;
    await Axios({
      method: "GET",
      url: API_URL + "/explorer/blocks/" + (Math.random() * (800 - 1) + 1)
    }).then(
      result => {
        self.blocks.push(result.data.block);
      },
      error => {
        console.error(error);
      }
    );
    await Axios({
      method: "GET",
      url: API_URL + "/explorer/"
    }).then(
      result => {
        self.latestHeight = result.data.height;
      },
      error => {
        console.error(error);
      }
    );
    this.loading = false;
  }

  mounted() {
    this.$nextTick(function() {
      this.loadBlocks();
    });
    setInterval(() => {
      this.loadBlocks();
    }, 5000);
  }
}
</script>
