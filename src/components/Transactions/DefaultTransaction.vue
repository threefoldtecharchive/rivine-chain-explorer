<template>
  <div class="tx-table">
    <div v-if="showOutputs">
      <div v-if="transaction.blockStakeInputs" class="tx-table">
        <h3 v-if="transaction.blockStakeInputs.length > 0">Blockstake Inputs</h3>
        <div
          v-for="(input, index) in transaction.blockStakeInputs"
          v-bind:key="index"
          class="tx-table"
        >
          <Input :input="input" />
        </div>
      </div>

      <div v-if="transaction.blockStakeOutputs" class="tx-table">
        <h3 v-if="transaction.blockStakeOutputs.length > 0">Blockstake Outputs</h3>

        <div
          v-for="(output, index) in transaction.blockStakeOutputs"
          v-bind:key="index"
          class="tx-table"
        >
          <Output :output="output" />
        </div>
      </div>

      <div v-if="transaction.coinInputs" class="tx-table">
        <h3 v-if="transaction.coinInputs.length > 0">Coin Inputs</h3>
        <div
          v-for="(input, index) in transaction.coinInputs"
          v-bind:key="index"
          class="tx-table"
        >
          <Input :input="input" />
        </div>
      </div>

      <div v-if="transaction.coinOutputs" class="tx-table">
        <h3 v-if="transaction.coinOutputs.length > 0">Coin Outputs</h3>
        <div
          v-for="(output, index) in transaction.coinOutputs"
          v-bind:key="index"
          class="tx-table"
        >
          <Output :output="output" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Input from '../Common/Input.vue'
import Output from '../Common/Output.vue'

@Component({
  props: ['transaction', 'showOutputs'],
  name: 'DefaultTransaction',
  components: {
    Input,
    Output
  }
})
export default class DefaultTransaction extends Vue {}
</script>
<style scoped>
.tx-table {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>