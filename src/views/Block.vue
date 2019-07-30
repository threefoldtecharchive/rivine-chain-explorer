<template>
  <div>
    <p>{{ this.$store.getters.BLOCK }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Blocks from "@/views/Blocks.vue";
import ResultTable from "@/components/ResultTable.vue";

@Component({
  components: {
    ResultTable,
    Blocks
  }
})
export default class Block extends Vue {
  beforeCreate() {
    const { block } = this.$route.params;
    if (!block || isNaN(parseInt(block))) {
      this.$router.push("/blocks/");
    }
    if (block) {
      this.$store.dispatch("SET_BLOCK_HEIGHT", block);
    }
  }
}
</script>
