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
import { Component, Vue, Watch } from "vue-property-decorator";
import { UnlockhashCondition, Currency } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import { formatReadableDate } from '../../common/helpers';

@Component({
  props: ["condition"],
  name: "AtomicSwapOutputTable",
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
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