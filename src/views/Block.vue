<template>
  <div>
    <Navigation name="Block" />
    {{ this.$store.getters.BLOCK }}
    <result-table />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@/components/Search.vue";
import ResultTable from "@/components/ResultTable.vue";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    ResultTable,
    Navigation
  }
})
export default class Block extends Vue {
  beforeCreate() {
    const { height } = this.$route.params;
    if (height) {
      this.$store.dispatch("SET_BLOCK_HEIGHT", height);
    }
  }
}
</script>
