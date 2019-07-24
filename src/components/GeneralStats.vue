<template>
    <div>
      <sui-table single-line>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell text-align="center">General Statistics</sui-table-header-cell>
            <sui-table-header-cell></sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>
        <sui-table-body>
          <sui-table-row>
            <sui-table-cell>Current Height</sui-table-cell>
            <sui-table-cell>{{ getExplorer().height }}</sui-table-cell>
          </sui-table-row>
          <sui-table-row>
            <sui-table-cell>Current Block</sui-table-cell>
            <sui-table-cell>{{ getExplorer().blockid }}</sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class GeneralStats extends Vue {
  getExplorer() {
    return this.$store.getters.getExplorer;
  }

  created() {
    this.$store.commit('loadExplorer');
  }
}
</script>

<style scoped>

</style>

