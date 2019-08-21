<template lang="html">
  <div>
    <hashes />
    <p>{{ this.$store.getters.HASH }}</p>
    <div class="container" v-if="this.$store.getters.HASH">
      <table class="ui celled table">
        <thead>
          <tr>
            <th colspan="3">Hash</th>
          </tr>
        </thead>
        <tbody>
          <!-- <tr>
            <td>Block Height</td>
            <td>{{ this.$store.getters.BLOCK.block.height }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.BLOCK.block.blockid)">{{ this.$store.getters.BLOCK.block.blockid }}</td>
          </tr>
          <tr>
            <td>Confirmations</td>
            <td>{{ this.$store.getters.EXPLORER.height }}</td>
          </tr>
          <tr>
            <td>Previous Block</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.BLOCK.block.rawblock.parentid)">{{ this.$store.getters.BLOCK.block.rawblock.parentid }}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{{ this.$store.getters.BLOCK.block.rawblock.timestamp }}</td>
          </tr>
          <tr>
            <td>Active Blockstake</td>
            <td>{{ this.$store.getters.BLOCK.block.estimatedactivebs }} BS</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Hashes from './Hashes.vue';

@Component({
  name: 'Hash',
  components: {
    Hashes
  },
  watch: {
    "$route.params.hash"(val) {
      // call the method which loads your initial state
      this.$store.dispatch("SET_HASH", val);
    },
  }
})
export default class Hash extends Vue {
  created() {
    if (!this.$route.params.hash || isNaN(parseInt(this.$route.params.hash))) {
      this.$router.push("/");
    }
    this.$store.dispatch("SET_HASH", this.$route.params.hash);
  }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: 'auto';
  margin-top: 50px;
}
.tx-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>
