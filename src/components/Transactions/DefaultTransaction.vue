<template>
  <div class="tx-table">
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
          <td
            class="clickable"
            v-on:click="routeToHashPage(transaction.id)"
          >{{ transaction.id }}</td>
        </tr>
        <tr v-if="transaction.coinInputs.length > 0">
          <td>Coin Input Count</td>
          <td>
            {{ transaction.coinInputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.coinOutputs.length > 0">
          <td>Coin Output Count</td>
          <td>
            {{ transaction.coinOutputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.blockStakeInputs.length > 0">
          <td>Blockstake Input Count</td>
          <td>
            {{ transaction.blockStakeInputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.blockStakeOutputs.length > 0">
          <td>Blockstake Output Count</td>
          <td>
            {{ transaction.blockStakeOutputs.length }}
          </td>
        </tr>
        <tr v-if="transaction.arbitrarydata">
          <td>Arbitrary Data Byte</td>
          <td>
            {{ transaction.arbitrarydata.length }}
          </td>
        </tr>
      </tbody>
    </table>

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
import { UNIT } from '../../common/config'
import Input from '../Common/Input.vue'
import Output from '../Common/Output.vue'
import { toLocalDecimalNotation } from '../../common/helpers'

@Component({
  props: ['transaction', 'showOutputs'],
  name: 'DefaultTransaction',
  components: {
    Input,
    Output
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
export default class DefaultTransaction extends Vue {}
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