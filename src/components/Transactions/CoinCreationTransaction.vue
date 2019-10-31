<template>
  <div v-if="showOutputs">
    <div class="tx-v-simple-table dark">
      <h2>Coin Creation Fulfillment</h2>
      <Fulfillment :fulfillment="transaction.coinCreationFulfillment" />
    </div>
    <div class="tx-v-simple-table dark">
      <h2>Coin Creation Outputs</h2>
      <Fragment v-for="(output, index) in transaction.coinCreationOutputs" v-bind:key="index">
        <Output :output="output" />
      </Fragment>
    </div>
  </div>
</template>
<script lang="ts">
import { Fragment } from 'vue-fragment'
import { Component, Vue } from 'vue-property-decorator'
import Fulfillment from '../Fulfillments/Fulfillment.vue'
import Condition from '../Conditions/Condition.vue'
import Output from '../Common/Output.vue'

@Component({
  props: ['transaction', 'showOutputs'],
  name: 'CoinCreationTransaction',
  components: {
    Fulfillment,
    Condition,
    Output,
    Fragment
  }
})
export default class CoinCreationTransaction extends Vue {}
</script>
<style scoped>
.tx-v-simple-table dark {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>