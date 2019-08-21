<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-head">
        <navigation />
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Search a specific hash
          </h1>
          <div class="columns is-centered is-mobile is is-vcentered">
            <div class="column is-narrow has-text-centered">
              <Search category="hash" description="Hash" />
            </div>
          </div>
        </div>
      </div>
    </section>
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
    const { hash } = this.$route.params;
    if (hash) {
      this.$store.dispatch("SET_HASH", hash);
    }
  }
}
</script>
