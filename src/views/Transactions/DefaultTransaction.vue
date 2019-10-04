<template>
  <div class="container">
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">Transaction version {{ transaction.version }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block Height</td>
          <td v-if="transaction.blockHeight == 0">
            unconfirmed
          </td>
          <td
            v-else
            class="clickable"
            v-on:click="routeToBlockPage(transaction.blockHeight)"
          >
            {{ toLocalDecimalNotation(transaction.blockHeight) }}
          </td>
        </tr>
        <tr v-if="transaction.blockHeight !== 0">
          <td>Confirmations</td>
          <td>
            {{ this.$store.getters.EXPLORER.height - transaction.blockHeight + 1 }}
          </td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{{ transaction.id }}</td>
        </tr>
        <tr v-if="transaction.coinInputs.length > 0">
          <td>Coin Input Count</td>
          <td>
            {{ transaction.coinInputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.coinOutputs.length > 0">
          <td>Coin Output Count</td>
          <td>
            {{ transaction.coinOutputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.blockStakeInputs.length > 0">
          <td>Blockstake Input Count</td>
          <td>
            {{ transaction.blockStakeInputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.blockStakeOutputs.length > 0">
          <td>Blockstake Output Count</td>
          <td>
            {{ transaction.blockStakeOutputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.arbitrarydata">
          <td>Arbitrary Data Byte</td>
          <td>
            {{ transaction.arbitrarydata.length }}
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="transaction.blockStakeInputs.length > 0" class="tx-table">
      <h3>Blockstake Inputs</h3>
      <div
        v-for="(input, index) in transaction.blockStakeInputs"
        v-bind:key="index"
      >
        <Input :input="input" />
      </div>
    </div>

    <div v-if="transaction.blockStakeOutputs.length > 0" class="tx-table">
      <h3>Blockstake Outputs</h3>

      <div
        v-for="(output, index) in transaction.blockStakeOutputs"
        v-bind:key="index"
      >
        <Output :output="output" />
      </div>
    </div>

    <div v-if="transaction.coinInputs.length > 0" class="tx-table">
      <h3>Coin Inputs</h3>
      <div
        v-for="(input, index) in transaction.coinInputs"
        v-bind:key="index"
      >
        <Input :input="input" />
      </div>
    </div>

    <div v-if="transaction.coinOutputs.length > 0" class="tx-table">
      <h3>Coin Outputs</h3>

      <div
        v-for="(output, index) in transaction.coinOutputs"
        v-bind:key="index"
      >
        <Output :output="output" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UnlockhashCondition, Currency } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import Input from "../Common/Input.vue"
import Output from "../Common/Output.vue"
import {
  toLocalDecimalNotation,
  formatReadableDate
} from "../../common/helpers";

@Component({
  props: ["transaction"],
  name: "DefaultTransaction",
  components: {
    Input,
    Output
  },
  methods: {
    routeToHashPage: function(val: string) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    },
    renderValue: function(value: any) {
      return `${value} ${UNIT}`;
    },
    toLocalDecimalNotation: toLocalDecimalNotation
  }
})
export default class DefaultTransaction extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>