<template>
  <table class="ui celled table">
    <tbody>
      <tr>
        <td>ID</td>
        <td class="clickable" v-on:click="routeToHashPage(output.id)">{{ output.id }}</td>
      </tr>

      <tr>
        <td>Multisig Address</td>
        <td
          class="clickable"
          v-on:click="routeToHashPage(output.condition.multisigAddress)"
        >{{ output.condition.multisigAddress }}</td>
      </tr>

      <div v-for="(address, index) in output.unlockhashes" v-bind:key="index">
        <tr>
          <td>Unlock Hash #{{ index + 1 }}</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(address)"
          >{{ address }}</td>
        </tr>
      </div>

      <tr>
        <td>Minimum Signature Count</td>
        <td>{{ output.condition.signatureCount }}</td>
      </tr>

      <tr>
        <td>Value</td>
        <td>{{ renderValue(output.value) }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UnlockhashCondition, Currency } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";

@Component({
  props: ["output"],
  name: "MultisigOutputTable",
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    },
    renderValue: function(value: any) {
      return `${value} ${UNIT}`;
    }
  }
})
export default class MultisigOutputTable extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>