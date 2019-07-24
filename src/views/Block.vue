<template>
  <div>
    <search v-on:keyup.enter="handleSearch" />
    {{ getblock() }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@/components/Search.vue";
import ResultTable from "@/components/ResultTable.vue"

@Component({
  components: {
    Search,
    ResultTable
  }
})
export default class Block extends Vue {
  getblock() {
    return this.$route.params.height;
  }

  handleSearch() {
    this.$store.commit('loadBlocks', { 'height': this.getblock()});
  }

  created() {
    this.$store.commit('loadBlocks', { 'height': this.getblock()});
  }
}
</script>
