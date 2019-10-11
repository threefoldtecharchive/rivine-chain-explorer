<template>
  <div class="container">
    <h2 class="tx-table">Coin Creation Transaction</h2>
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">Transaction version {{ transaction.version }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block Height</td>
          <td v-if="transaction.blockHeight == 0">
            unconfirmed
          </td>
          <td
            v-else
            class="clickable"
            v-on:click="routeToBlockPage(transaction.blockHeight)"
          >
            {{ toLocalDecimalNotation(transaction.blockHeight) }}
          </td>
        </tr>
        <tr v-if="transaction.blockHeight !== 0">
          <td>Confirmations</td>
          <td>
            {{ this.$store.getters.EXPLORER.height - transaction.blockHeight + 1 }}
          </td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{{ transaction.id }}</td>
        </tr>
      </tbody>
    </table>
    <div class="tx-table">
      <h2>Coin Creation Fulfillment</h2>
      <Fulfillment :fulfillment="transaction.coinCreationFulfillment" />
    </div>
    <div class="tx-table">
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
import { UNIT } from '../../common/config'
import { toLocalDecimalNotation } from '../../common/helpers'
import Fulfillment from '../Fulfillments/Fulfillment.vue'
import Condition from '../Conditions/Condition.vue'
import Output from '../Common/Output.vue'

@Component({
  props: ['transaction'],
  name: 'CoinCreationTransaction',
  components: {
    Fulfillment,
    Condition,
    Output,
    Fragment
  },
  methods: {
    routeToHashPage: function (val: string) {
      this.$store.dispatch('SET_HASH', val)
      this.$router.push('/hashes/' + val)
    },
    toLocalDecimalNotation
  }
})
export default class CoinCreationTransaction extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
.tx-table {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>