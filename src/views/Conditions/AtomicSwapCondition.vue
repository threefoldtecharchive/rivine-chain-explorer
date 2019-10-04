<template>
  <div>
    <tr>
      <td>Contract Address</td>
      <td
        class="clickable"
        v-on:click="routeToHashPage(condition.contractAddress)"
      >{{condition.contractAddress}}
      </td>
    </tr>

    <tr>
      <td>Sender</td>
      <td
        class="clickable"
        v-on:click="routeToHashPage(condition.sender)"
      >{{ condition.sender }}</td>
    </tr>

    <tr>
      <td>Receiver</td>
      <td
        class="clickable"
        v-on:click="routeToHashPage(condition.receiver)"
      >{{ condition.receiver }}</td>
    </tr>

    <tr>
      <td>Hashed Secret</td>
      <td>{{ condition.hashedSecret }}</td>
    </tr>

    <tr>
      <td>Timelock</td>
      <td>{{ condition.timelock }}</td>
    </tr>

    <tr>
      <td>Unlocked for refunding since</td>
      <td>{{ formatReadableDate(condition.timelock) }}</td>
    </tr>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { formatReadableDate } from '../../common/helpers';

@Component({
  props: ["condition"],
  name: "AtomicSwapOutputTable",
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    },
    formatReadableDate
  }
})
// Export as class because Vue will understand this.$store etc..
export default class AtomicSwapOutputTable extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>