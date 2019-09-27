<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th colspan="3">Atomic Swap output</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ID</td>
        <td
          class="clickable"
          v-on:click="routeToHashPage(output.id)"
        >{{ output.id }}</td>
      </tr>

      <tr>
        <td>Contract Address</td>
        <td
          class="clickable"
          v-on:click="routeToHashPage(output.condition.contractAddress)"
        >{{output.condition.contractAddress}}
        </td>
      </tr>

      <tr>
        <td>Sender</td>
        <td
          class="clickable"
          v-on:click="routeToHashPage(output.condition.sender)"
        >{{ output.condition.sender }}</td>
      </tr>

      <tr>
        <td>Receiver</td>
        <td
          class="clickable"
          v-on:click="routeToHashPage(output.condition.receiver)"
        >{{ output.condition.receiver }}</td>
      </tr>

      <tr>
        <td>Hashed Secret</td>
        <td>{{ output.condition.hashedSecret }}</td>
      </tr>

      <tr>
        <td>Timelock</td>
        <td>{{ output.condition.timelock }}</td>
      </tr>

      <tr>
        <td>Unlocked for refunding since</td>
        <td>{{ formatReadableDate(output.condition.timelock) }}</td>
      </tr>

      <tr>
        <td>Value</td>
        <td>
          {{ renderValue(output.value) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UnlockhashCondition, Currency } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import { formatReadableDate } from '../../common/helpers';

@Component({
  props: ["output"],
  name: "AtomicSwapOutputTable",
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    },
    renderValue: function(value: any) {
      return `${value} ${UNIT}`;
    },
    formatReadableDate: formatReadableDate
  }
})
export default class AtomicSwapOutputTable extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>