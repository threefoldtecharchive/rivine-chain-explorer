<template>
  <div>
    <blocks />
    <p>{{ this.$store.getters.BLOCK }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Blocks from "@/views/Blocks.vue";

@Component({
  components: {
    Blocks
  }
})
export default class Block extends Vue {
  created() {
    if (
      !this.$route.params.block ||
      isNaN(parseInt(this.$route.params.block))
    ) {
      this.$router.push("/blocks/");
    }
  }
}
</script>
