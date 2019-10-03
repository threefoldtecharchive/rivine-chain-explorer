<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">Used output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ID</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(input.parentid)"
          >{{ input.parentid }}</td>
        </tr>

        <tr>
          <td>Address</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(input.unlockhash)">
              {{ input.unlockhash }}
          </td>
        </tr>

        <tr>
          <td>Value</td>
          <td>{{ renderValue(input.value) }}</td>
        </tr>
      </tbody>
    </table>

    <Fulfillment :fulfillment="input.fulfillment" />

  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UnlockhashCondition, Currency } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import Fulfillment from "../Fulfillments/Fulfillment.vue";

@Component({
  props: ["input"],
  name: "Input",
  components: {
    Fulfillment
  },
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
export default class Input extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>