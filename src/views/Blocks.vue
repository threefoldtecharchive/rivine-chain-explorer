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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";

@Component({
  components: {
    Navigation,
    Search
  }
})
export default class Blocks extends Vue {
  created() {
    this.$store.dispatch("SET_EXPLORER");
  }

  beforeCreate() {
    const { height } = this.$route.params;
    if (height) {
      this.$store.dispatch("SET_BLOCK_HEIGHT", height);
    }
  }
}
</script>
