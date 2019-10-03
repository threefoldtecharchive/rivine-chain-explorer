<template>
  <div>
    <tr>
      <td>Address</td>
      <td
        class="clickable"
        v-on:click="routeToHashPage(condition.unlockhash)"
      >{{ condition.unlockhash }}</td>
    </tr>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { PRECISION, UNIT } from "../../common/config";

@Component({
  props: ["condition"],
  name: "UnlockhashCondition",
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    }
  }
})
export default class UnlockhashCondition extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>