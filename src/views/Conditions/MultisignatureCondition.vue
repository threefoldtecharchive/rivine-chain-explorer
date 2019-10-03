<template>
  <div>
    <tr>
      <td>Multisig Address</td>
      <td
        class="clickable"
        v-on:click="routeToHashPage(condition.multisigAddress)"
      >{{ condition.multisigAddress }}</td>
    </tr>

    <div v-for="(address, index) in unlockhashes" v-bind:key="index">
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
      <td>{{ condition.signatureCount }}</td>
    </tr>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UnlockhashCondition, Currency } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";

@Component({
  props: ["condition"],
  name: "MultisigCondition",
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    }
  }
})
export default class MultisigCondition extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>