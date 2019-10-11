<template lang="html">
  <div>
    <!-- <p>{{ this.$store.getters.BLOCK }}</p> -->
    <div class="container" v-if="this.$store.getters.BLOCK.block">
      <h1>Block</h1>
      <table class="ui celled tablet stackable table">
        <thead>
          <tr>
            <th colspan="3">Block statistics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Block Height</td>
            <td>
              {{
                toLocalDecimalNotation(this.$store.getters.BLOCK.block.height)
              }}
            </td>
          </tr>
          <tr>
            <td>ID</td>
            <td
              class="clickable"
              v-on:click="routeToBlockPage($store.getters.BLOCK.block.blockid)"
            >
              {{ this.$store.getters.BLOCK.block.blockid }}
            </td>
          </tr>
          <tr>
            <td>Confirmations</td>
            <td>
              {{ toLocalDecimalNotation(this.$store.getters.EXPLORER.height) }}
            </td>
          </tr>
          <tr>
            <td>Previous Block</td>
            <td
              class="clickable"
              v-on:click="
                routeToBlockPage($store.getters.BLOCK.block.rawblock.parentid)
              "
            >
              {{ this.$store.getters.BLOCK.block.rawblock.parentid }}
            </td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{{ formatBlockDate() }}</td>
          </tr>
          <tr>
            <td>Active Blockstake</td>
            <td>
              {{
                toLocalDecimalNotation(
                  this.$store.getters.BLOCK.block.estimatedactivebs
                )
              }}
              BS
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="this.$store.getters.BLOCK.block.minerpayoutids">
        <h2 v-if="this.$store.getters.BLOCK.block.minerpayoutids.length > 0">
          Reward and Fee Payouts
        </h2>
      </div>
      <div
        class="tx-table"
        v-for="(mp, index) in this.$store.getters.BLOCK.block.rawblock
          .minerpayouts"
        v-bind:key="index"
      >
        <table class="ui celled table">
          <thead>
            <tr>
              <th colspan="3">Transaction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td
                class="clickable"
                v-on:click="
                  routeToHashPage(
                    $store.getters.BLOCK.block.minerpayoutids[index]
                  )
                "
              >
                {{ $store.getters.BLOCK.block.minerpayoutids[index] }}
              </td>
            </tr>
            <tr>
              <td>Payout address</td>
              <td class="clickable" v-on:click="routeToHashPage(mp.unlockhash)">
                {{ mp.unlockhash }}
              </td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{{ parseInt(mp.value) / 1000000000 }} TFT</td>
            </tr>
            <tr v-if="index === 0">
              <td>Source Description</td>
              <td>Block Creator Reward (New Coins)</td>
            </tr>
            <tr v-if="index === 1">
              <td>Source Description</td>
              <td>All Transaction Fees Combined</td>
            </tr>
            <tr
              v-if="
                index === 1 && $store.getters.BLOCK.block.transactions[index]
              "
            >
              <td>Source Transaction Identifiers</td>
              <td
                class="clickable"
                v-on:click="
                  routeToHashPage(
                    $store.getters.BLOCK.block.transactions[index].id
                  )
                "
              >
                {{ $store.getters.BLOCK.block.transactions[index].id }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.$store.getters.BLOCK.block.transactions">
        <h2 v-if="this.$store.getters.BLOCK.block.transactions.length > 0">
          Transactions
        </h2>
        <div
          v-for="(tx, index) in this.$store.getters.BLOCK.block.transactions"
          v-bind:key="index"
        >
          <div
            class="tx-table"
            v-if="tx.rawtransaction.data.coininputs != null"
          >
            <table
              v-if="
                tx.rawtransaction.data.coininputs.length > 0 &&
                  tx.rawtransaction.data.coinoutputs.length > 0
              "
              class="ui celled table"
            >
              <thead>
                <tr>
                  <th colspan="3">Transaction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td class="clickable" v-on:click="routeToHashPage(tx.id)">
                    {{ tx.id }}
                  </td>
                </tr>
                <tr v-if="tx.rawtransaction.version === 0">
                  <td>Type</td>
                  <td>Regular Transaction</td>
                </tr>
                <tr v-if="tx.rawtransaction.data.coininputs">
                  <td>Coin Input Count</td>
                  <td>{{ tx.rawtransaction.data.coininputs.length }}</td>
                </tr>
                <tr v-if="tx.rawtransaction.data.coinoutputs">
                  <td>Coin Output Count</td>
                  <td>{{ tx.rawtransaction.data.coinoutputs.length }}</td>
                </tr>
                <tr v-if="tx.rawtransaction.data.arbitrarydata">
                  <td>Arbitrary Data Byte Count</td>
                  <td>{{ tx.rawtransaction.data.arbitrarydata.length }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="tx-table" v-if="tx.rawtransaction.data.coinoutputs">
            <table
              v-if="tx.rawtransaction.data.coinoutputs.length > 0"
              class="ui celled table"
            >
              <thead>
                <tr>
                  <th colspan="3">Transaction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td class="clickable" v-on:click="routeToHashPage(tx.id)">
                    {{ tx.id }}
                  </td>
                </tr>
                <tr v-if="tx.rawtransaction.version === 0">
                  <td>Type</td>
                  <td>Regular Transaction</td>
                </tr>
                <tr>
                  <td>Coin Ouput Count</td>
                  <td>{{ tx.rawtransaction.data.coinoutputs.length }}</td>
                </tr>
                <tr v-if="tx.rawtransaction.data.blockstakeoutputs">
                  <td>Blockstake Ouput Count</td>
                  <td>{{ tx.rawtransaction.data.blockstakeoutputs.length }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="tx-table"
            v-if="
              tx.rawtransaction.data.blockstakeinputs &&
                tx.rawtransaction.data.blockstakeoutputs
            "
          >
            <table
              v-if="
                tx.rawtransaction.data.blockstakeinputs.length > 0 ||
                  tx.rawtransaction.data.blockstakeoutputs.length > 0
              "
              class="ui celled table"
            >
              <thead>
                <tr>
                  <th colspan="3">Transaction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ID</td>
                  <td class="clickable" v-on:click="routeToHashPage(tx.id)">
                    {{ tx.id }}
                  </td>
                </tr>
                <tr v-if="tx.rawtransaction.version === 0">
                  <td>Type</td>
                  <td>Regular Transaction</td>
                </tr>
                <tr>
                  <td>BlockStake Input Count</td>
                  <td>{{ tx.rawtransaction.data.blockstakeinputs.length }}</td>
                </tr>
                <tr>
                  <td>BlockStake Output Count</td>
                  <td>{{ tx.rawtransaction.data.blockstakeoutputs.length }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { toLocalDecimalNotation } from '../../common/helpers'

@Component({
  name: 'Block',
  watch: {
    '$route.params.block' (val) {
      // call the method which loads your initial state
      this.$store.dispatch('SET_BLOCK_HEIGHT', val)
    },
    '$store.state.block': function () {
      this.$router.push('/block/' + this.$store.state.block.block.height)
    }
  },
  methods: {
    routeToHashPage: function (val) {
      this.$store.dispatch('SET_HASH', val)
      this.$router.push('/hashes/' + val)
    },
    routeToBlockPage: function (val) {
      this.$store.dispatch('SET_HASH', val)
    }
  }
})
export default class Block extends Vue {
  blockDate = ''
  toLocalDecimalNotation = toLocalDecimalNotation

  created () {
    window.scrollTo(0, 0)
    if (
      !this.$route.params.block ||
      isNaN(parseInt(this.$route.params.block, 10))
    ) {
      this.$router.push('/blocks/')
    }
    if (!this.$store.getters.BLOCK.block) {
      this.$store.dispatch('SET_BLOCK_HEIGHT', this.$route.params.block)
    }
  }

  formatBlockDate () {
    const blockDate = new Date(
      this.$store.getters.BLOCK.block.rawblock.timestamp * 1000
    )
    const day = blockDate.getDate()
    const month = blockDate.toLocaleString('default', { month: 'long' })
    const year = blockDate.getFullYear()
    const hours = blockDate.getHours()
    const tempMinutes = blockDate.getMinutes()
    const minutes = tempMinutes < 10 ? `0${tempMinutes}` : tempMinutes

    return `${hours}:${minutes}, ${month} ${day}, ${year}`
  }
}
</script>
<style scoped>
.tx-table {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
.container {
  width: 80%;
  margin: auto;
  margin-top: 50px;
  text-align: center;
}
.container h1 {
  text-align: left;
  font-size: 30px;
}
</style>
