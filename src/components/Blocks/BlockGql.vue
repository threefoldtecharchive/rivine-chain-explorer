<template lang="html">
  <!-- Apollo watched Graphql query -->
  <ApolloQuery
    class="container"
    :query="query"
    :variables="{ id }"
  >
    <template slot-scope="{ result: { loading, error, data } }" >
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <div v-else-if="data">
        <h1>Block</h1>
        <v-simple-table class="table">
          <thead>
            <tr>
              <th colspan="3" class="text-left">Block statistics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Block Height</td>
              <td>
                {{ toLocalDecimalNotation(data.block.Header.BlockHeight) }}
              </td>
            </tr>
            <tr>
              <td>ID</td>
              <td
                class="clickable"
                v-on:click="routeToBlockPage(data.block.Header.ID)"
              >
                {{ data.block.Header.ID }}
              </td>
            </tr>
            <tr>
              <td>Confirmations</td>
              <td>
                {{ toLocalDecimalNotation($store.getters.EXPLORER.height) }}
              </td>
            </tr>
            <tr v-if="data.block.Header.Parent">
              <td>Previous Block</td>
              <td
                class="clickable"
                v-on:click="routeToBlockPage(data.block.Header.Parent.Header.ID)"
              >
                {{ data.block.Header.Parent.Header.ID }}
              </td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{{ formatReadableDate(data.block.Header.BlockTime) }}</td>
            </tr>
            <tr>
              <td>Active Blockstake</td>
              <td>
                {{ toLocalDecimalNotation(data.block.Facts.ChainSnapshot.EstimatedActiveBlockStakes) }} BS
              </td>
            </tr>
          </tbody>
        </v-simple-table>

        <div v-if="data.block.Header.Payouts">
          <h2> Block creator rewards </h2>
          <div
            v-for="(output, index) in data.block.Header.Payouts"
            v-bind:key="index"
          >
            <MinerPayout :output="output" class="table"/>
          </div>
        </div>

        <div v-if="data.block.Transactions">
          <h2> Transactions </h2>
          <div
            v-for="(tx, index) in data.block.Transactions"
            v-bind:key="index"
          >
            <TransactionSummary :transaction="tx" class="table"/>
          </div>
        </div>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import TransactionSummary from '../Transactions/TransactionSummary.vue'
import MinerPayout from '../Common/MinerOutput.vue'
import { formatReadableDate, toLocalDecimalNotation } from '../../common/helpers'
import blockByHeightQuery from '../../graphql/BlockByHeight.gql'
import blockByHashQuery from '../../graphql/BlockByHash.gql'

@Component({
  name: 'Block',
  props: ['block'],
  components: {
    TransactionSummary,
    MinerPayout
  },
  watch: {
    '$route.params.block' (val) {
      this.id = val
    }
  },
  methods: {
    routeToHashPage: function (val) {
      this.$store.dispatch('SET_HASH', val)
      this.$router.push('/hashes/' + val)
    },
    routeToBlockPage: function (val) {
      // this.$store.dispatch('SET_HASH', val)
      this.query = blockByHashQuery
      this.id = val
      this.$router.push('/block/' + val)
    },
    formatReadableDate
  },
  data () {
    return {
      id: this.$route.params.block,
      query: blockByHeightQuery
    }
  }
})
export default class Block extends Vue {
  blockDate = ''
  toLocalDecimalNotation = toLocalDecimalNotation

  created () {
    window.scrollTo(0, 0)
    debugger
    const id = this.$route.params.block
    if (id.length === 64 || id.length === 78) {
      this.query = blockByHashQuery
      this.id = id
      return
    }
    this.query = blockByHeightQuery
    this.id = id
  }
}
</script>
<style scoped>
.table {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.container h2 {
  text-align: left;
  font-size: 26px;
}
</style>
