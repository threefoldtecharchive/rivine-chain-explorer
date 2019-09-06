<template lang="html">
  <div class="container">
    <h1>Hash</h1>
    <table class="ui celled table" v-if="!isAtomicSwap">
      <thead>
        <tr>
          <th colspan="3">Coin Output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>ID</td>
          <td>{{ this.$route.params.hash }}</td>
        </tr>

        <tr v-if="isBlockCreatorReward">
          <td>Block ID</td>
          <td class="clickable" v-on:click="routeToBlockPage(coinOutput.blockId)">{{ coinOutput.blockId }}</td>
        </tr>
        <tr v-else>
          <td>Transaction ID</td>
          <td class="clickable" v-on:click="routeToHashPage(coinOutput.txid)">
            {{ coinOutput.txid }}
          </td>
        </tr>

        <tr v-if="isLegacy">
          <td>Address</td>
          <td class="clickable" v-on:click="routeToHashPage(coinOutput.unlockhash)">
            {{ coinOutput.unlockhash }}
          </td>
        </tr>
        <tr v-else>
          <td>Address</td>
          <td class="clickable" v-on:click="routeToHashPage(coinOutput.condition.data.unlockhash)">
            {{ coinOutput.condition.data.unlockhash }}
          </td>
        </tr>

        <tr v-if="isLegacy">
          <td>Value</td>
          <td>{{ toLocalDecimalNotation(coinOutput.value / precision) }} {{ unit }}</td>
        </tr>
        <tr v-else>
          <td>Value</td>
          <td>{{ toLocalDecimalNotation(coinOutput.value / precision) }} {{ unit }}</td>
        </tr>

        <tr>
          <td>Has been spent</td>
          <td v-if="coinOutputSpent">Yes</td>
          <td v-else>No</td>
        </tr>

      </tbody>
    </table>

    <table class="ui celled table" v-if="isAtomicSwap">
      <thead>
        <tr>
          <th colspan="3">Coin Output</th>
        </tr>
      </thead>
      <tbody>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage(this.$route.params.hash)">
              {{ this.$route.params.hash }}
            </td>
          </tr>
          <tr>
            <td>Contract Address</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transactions[coinOutput.transactionsIdx].coinoutputunlockhashes[coinOutput.coinOutputIdx])">
              {{ $store.getters.HASH.transactions[coinOutput.transactionsIdx].coinoutputunlockhashes[coinOutput.coinOutputIdx] }}
            </td>
          </tr>
          <tr>
            <td>Sender</td>
            <td class="clickable" v-on:click="routeToHashPage(coinOutput.condition.data.sender)">
              {{ coinOutput.condition.data.sender }}
            </td>
          </tr>
          <tr>
            <td>Receiver</td>
            <td class="clickable" v-on:click="routeToHashPage(coinOutput.condition.data.receiver)">
              {{ coinOutput.condition.data.receiver }}
            </td>
          </tr>
          <tr>
            <td>Hashed Secret</td>
            <td>{{ coinOutput.condition.data.hashedsecret }}</td>
          </tr>
          <tr>
            <td>Timelock</td>
            <td>{{ coinOutput.condition.data.timelock }}</td>
          </tr>
          <tr>
            <td>Unlocked for refunding since</td>
            <td>{{ formatReadableDate(coinOutput.condition.data.timelock) }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ toLocalDecimalNotation(coinOutput.value / precision) }} {{ unit }}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
            <td class="clickable" v-on:click="routeToHashPage(coinOutput.txid)">{{ coinOutput.txid }}</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>No</td>
          </tr>

      </tbody>
    </table>

    <table class="ui celled table" v-if="coinInput.txid">
      <thead>
        <tr>
          <th colspan="3">Coin Input</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td>ID</td>
          <td>{{ this.$route.params.hash }}</td>
        </tr>

        <tr>
          <td>Transaction ID</td>
          <td class="clickable" v-on:click="routeToHashPage(coinInput.txid)">
            {{ coinInput.txid }}
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from 'vuex';
import { PRECISION, UNIT } from "../../common/config"
import { toLocalDecimalNotation, formatReadableDate } from '../../common/helpers'

@Component({
  name: 'CoinOutputHash',
  watch: {
    "$route.params.block"(val) {
      // call the method which loads your initial state
      this.$store.dispatch("SET_BLOCK_HEIGHT", val);
    },
    '$store.state.block': function() {
      this.$router.push("/block/" + this.$store.state.block.block.height);
    }
  },
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    },
    routeToBlockPage: function(val) {
      this.$store.dispatch("SET_HASH", val)
      this.$router.push("/block/" + val);
    }
  }
})
export default class CoinOutputHash extends Vue {
  coinOutputSpent: boolean = false
  coinInput: object = {
    condition: {}
  }
  coinOutput: object = {
    condition: {}
  }
  isLegacy: boolean = false
  isBlockCreatorReward: boolean = false
  precision: number = Math.pow(10, PRECISION)
  unit: string = UNIT
  toLocalDecimalNotation = toLocalDecimalNotation
  formatReadableDate = formatReadableDate
  isAtomicSwap: boolean = false
  isLoading: boolean = false

  created() {
    window.scrollTo(0,0);

    this.isLoading = true
    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash
      this.$store.dispatch("SET_HASH", hash).then(() => {
        this.getCoinOutput()
        this.getCoinInput()
        this.checkIfAtomicSwap()
        this.isLoading = false
      })
    })
    this.getCoinOutput()
    this.getCoinInput()
    this.checkIfAtomicSwap()
    this.isLoading = false
  }

  checkIfAtomicSwap () {
    const txs = this.$store.getters.HASH.transactions
    if (!txs) return

    const idx = txs.findIndex((tx:any) => {
      if (!tx.rawtransaction.data.coinoutputs) return -1
      return tx.rawtransaction.data.coinoutputs.findIndex((co:any) => {
        if (!co.condition) return
        return co.condition.data.hashedsecret
      }) !== -1
    })
    if (idx !== -1) {
      this.isAtomicSwap = true
    }
  }

  getCoinOutput () {
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) {
      this.isBlockCreatorReward = true
      return this.getCoinOutputBlockCreatorReward()
    }

    const hashId = this.$route.params.hash
    let coinOutputIndexArray = transactions.map((tx:any) => {
      if (!tx.coinoutputids) return -1
      return tx.coinoutputids.findIndex((id:any) => id === hashId)
    })

    let transactionsIndex = coinOutputIndexArray.findIndex((idx:any) => idx !== -1)
    // if index is -1, no output is found. Return nothing
    if (transactionsIndex == -1) return

    const coinOutputIndex = coinOutputIndexArray.filter((v:any) => v !== -1)

    if (!transactions[transactionsIndex].rawtransaction.data.coinoutputs) return
    const coinoutput = transactions[transactionsIndex].rawtransaction.data.coinoutputs[coinOutputIndex]

    if (!coinoutput.condition) {
      this.isLegacy = true
    }

    this.coinOutput = {
      ...coinoutput,
      txid: transactions[transactionsIndex].id,
      transactionsIdx: transactionsIndex,
      coinOutputIdx: coinOutputIndex
    }
  }

  getCoinOutputBlockCreatorReward () {
    const blocks = this.$store.getters.HASH.blocks
    const hashId = this.$route.params.hash
    if (!blocks) return

    const minerPayoutsIndexArray = blocks.map((block:any) => {
      if (!block.minerpayoutids) return -1
      return block.minerpayoutids.findIndex((id:any) => id === hashId)
    })

    let transactionsIndex = minerPayoutsIndexArray.findIndex((idx:any) => idx !== -1)
    // if index is -1, no output is found. Return nothing
    if (transactionsIndex == -1) return

    const coinOutputIndex = minerPayoutsIndexArray.filter((v:any) => v !== -1)
    const coinoutput = blocks[transactionsIndex].rawblock.minerpayouts[coinOutputIndex]

    if (!coinoutput.condition) {
      this.isLegacy = true
    }

    this.coinOutput = {
      ...coinoutput,
      blockId: blocks[transactionsIndex].blockid
    }
  }

  getCoinInput () {
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) {
      this.isBlockCreatorReward = true
      return
    }

    const hashId = this.$route.params.hash
    let coinInputIndexArray = transactions.map((tx:any) => {
      if (!tx.rawtransaction.data.coininputs) return -1
      return tx.rawtransaction.data.coininputs.findIndex((ci:any) => ci.parentid === hashId)
    })
    let transactionsIndex = coinInputIndexArray.findIndex((idx:any) => idx !== -1)
    // if index is -1, no input is found. Return nothing
    if (transactionsIndex == -1) return

    const coinInputIndex = coinInputIndexArray.filter((v:any) => v !== -1)
    const coininput = transactions[transactionsIndex].rawtransaction.data.coininputs[coinInputIndex]

    // If input is found, it means this output is spent.
    this.coinOutputSpent = true

    this.coinInput = {
      ...coininput,
      txid: transactions[transactionsIndex].id
    }
  }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: 'auto';
  margin-top: 50px;
}
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
.container h1 {
  text-align: left;
  font-size: 30px;
}
</style>
