<template>
  <div class="container">
    <h2 class="tx-table">Minter Definition Transaction</h2>
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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UNIT } from '../../common/config'
import Fulfillment from '../Fulfillments/Fulfillment.vue'
import Condition from '../Conditions/Condition.vue'
import { toLocalDecimalNotation } from '../../common/helpers'

@Component({
  props: ['transaction', 'showOutputs'],
  name: 'MinterDefinitionTransaction',
  components: {
    Fulfillment,
    Condition
  },
  methods: {
    routeToHashPage: function (val: string) {
      this.$store.dispatch('SET_HASH', val)
      this.$router.push('/hashes/' + val)
    },
    routeToBlockPage: function (val) {
      this.$store.dispatch('SET_BLOCK_HEIGHT', val)
      this.$router.push('/block/' + val)
    },
    toLocalDecimalNotation
  }
})
export default class MinterDefinitionTransaction extends Vue {}
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