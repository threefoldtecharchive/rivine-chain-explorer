<template>
  <div v-if="showOutputs">
    <div class="tx-table">
      <h2>Minter Definition Fulfillment</h2>
      <Fulfillment :fulfillment="transaction.minterDefinitionFulfillment" />
    </div>
    <div class="tx-table">
      <h2>New Mint Condition</h2>
      <table class="ui celled table">
        <Condition :condition="transaction.minterDefinitionCondition" />
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Fulfillment from '../Fulfillments/Fulfillment.vue'
import Condition from '../Conditions/Condition.vue'

@Component({
  props: ['transaction', 'showOutputs'],
  name: 'MinterDefinitionTransaction',
  components: {
    Fulfillment,
    Condition
  }
})
export default class MinterDefinitionTransaction extends Vue {}
</script>
<style scoped>
.tx-table {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>