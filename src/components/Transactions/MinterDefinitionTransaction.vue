<template>
  <div v-if="showOutputs">
    <div class="tx-v-simple-table dark">
      <h2>Minter Definition Fulfillment</h2>
      <Fulfillment :fulfillment="transaction.minterDefinitionFulfillment" />
    </div>
    <div class="tx-v-simple-table dark">
      <h2>New Mint Condition</h2>
      <v-simple-table dark >
        <Condition :condition="transaction.minterDefinitionCondition" />
      </v-simple-table>
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
.tx-v-simple-table dark {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>