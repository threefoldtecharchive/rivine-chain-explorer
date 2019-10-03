<template>
  <div>
    <div v-if="fulfillment.getFulfillmentTypeAsString() === fulfillmentType.SingleSignatureFulfillment">
      <SingleSignatureFulfillment :fulfillment="fulfillment" />
    </div>
    <div v-if="fulfillment.getFulfillmentTypeAsString() === fulfillmentType.AtomicSwapFulfillment">
      <AtomicSwapFulfillment :fulfillment="fulfillment" />
    </div>
    <div v-if="fulfillment.getFulfillmentTypeAsString() === fulfillmentType.MultisignatureFulfillment">
      <MultiSigFulfillment :fulfillment="fulfillment" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { FulfillmentType } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import SingleSignatureFulfillment from "./SingleSignatureFulfillment.vue";
import AtomicSwapFulfillment from "./AtomicSwapFulfillment.vue";
import MultiSigFulfillment from "./MultiSigFulfillment.vue";

export default {
  data () {
    return {
      fulfillmentType: FulfillmentType
    }
  },
  props: ["fulfillment"],
  components: {
    SingleSignatureFulfillment,
    AtomicSwapFulfillment,
    MultiSigFulfillment
  },
  name: "Fulfillment",
  created () {
    console.log(this.fulfillment)
  }
}
</script>