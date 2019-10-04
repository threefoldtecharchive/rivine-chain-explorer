<template>
  <Fragment>
    <UnlockhashCondition :condition="condition" v-if="condition.getConditionType() === ConditionType.UnlockhashCondition" />
    <MultisignatureCondition :condition="condition" v-if="condition.getConditionType() === ConditionType.MultisignatureCondition"/>
    <AtomicSwapCondition :condition="condition" v-if="condition.getConditionType() === ConditionType.AtomicSwapCondition" />
  </Fragment>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ConditionType } from "rivine-ts-types";
import UnlockhashCondition from "./UnlockhashCondition.vue";
import MultisignatureCondition from "./MultisignatureCondition.vue";
import AtomicSwapCondition from "./AtomicSwapCondition.vue";
import { Fragment } from 'vue-fragment'

export default {
  data () {
    return {
      ConditionType
    }
  },
  props: ["condition"],
  components: {
    UnlockhashCondition,
    MultisignatureCondition,
    AtomicSwapCondition,
    Fragment
  },
  name: "condition"
}
</script>