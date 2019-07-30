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
    {{ selectedBlock }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Blocks from "@/views/Blocks.vue";
import Navigation from "@/components/Navigation.vue";
import Search from "@/components/Search.vue";

@Component({
  components: {
    Blocks,
    Search,
    Navigation
  }
})
export default class Block extends Vue {
  created() {
    const { block } = this.$route.params;
    if (!block || isNaN(parseInt(block))) {
      this.$router.push("/blocks/");
    }
    if (block) {
      this.$nextTick(function() {
        this.loadBlocks(block);
      });
    }
  }

  async loadBlocks(block: string) {
    await this.$store.dispatch("SET_BLOCK_HEIGHT", block);
  }

  get selectedBlock() {
    return this.$store.getters.BLOCK;
  }
}
</script>
