<template>
  <div>
    <div v-if="condition === conditionType.UnlockhashCondition">
      <UnlockhashCondition v-bind="condition" />
    </div>
    <div v-if="condition === conditionType.AtomicSwapCondition">
      <MultisignatureCondition v-bind="condition" />
    </div>
    <div v-if="condition === conditionType.MultisignatureCondition">
      <AtomicSwapCondition v-bind="condition" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ConditionType } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import UnlockhashCondition from "./UnlockhashCondition.vue";
import MultisignatureCondition from "./MultisignatureCondition.vue";
import AtomicSwapCondition from "./AtomicSwapCondition.vue";

export default {
  data () {
    return {
      conditionType: ConditionType
    }
  },
  props: ["condition"],
  components: {
    UnlockhashCondition,
    MultisignatureCondition,
    AtomicSwapCondition
  },
  name: "condition"
}
</script>