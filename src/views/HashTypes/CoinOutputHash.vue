<template lang="html">
  <div class="container">
    <table class="ui celled table">
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
          <td class="clickable" v-on:click="routeToHashPage(coinOutput.condition.unlockhash)">
            {{ coinOutput.condition.unlockhash }}
          </td>
        </tr>

        <tr v-if="isLegacy">
          <td>Value</td>
          <td>{{ coinOutput.value / precision }} {{ unit }}</td>
        </tr>
        <tr v-else>
          <td>Value</td>
          <td>{{ coinOutput.condition.value / precision }} {{ unit }}</td>
        </tr>

        <tr>
          <td>Has been spent</td>
          <td v-if="coinOutputSpent">Yes</td>
          <td v-else>No</td>
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

  created() {
    if (!this.$store.getters.HASH.hashtype) {
      this.$store.dispatch("SET_HASH", this.$route.params.hash).then(() => {
        this.getCoinOutput()
        this.getCoinInput()
      })
    } else {
      this.getCoinOutput()
      this.getCoinInput()
    }
  }

  @Watch("$route.params.hash")
  OnHashTypeChange(val: string, oldVal: string) {
    this.$store.dispatch("SET_HASH", val).then(() => {
      this.getCoinOutput()
      this.getCoinInput()
    })
  }

  getCoinOutput () {
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) {
      this.isBlockCreatorReward = true
      return this.getCoinOutputBlockCreatorReward()
    }

    const hashId = this.$route.params.hash
    let coinOutputIndexArray = transactions.map((tx:any) => {
      return tx.coinoutputids.findIndex((id:any) => id === hashId)
    })
    let transactionsIndex = coinOutputIndexArray.findIndex((idx:any) => idx !== -1)
    // if index is -1, no output is found. Return nothing
    if (transactionsIndex == -1) return

    const coinOutputIndex = coinOutputIndexArray.filter((v:any) => v !== -1)
    const coinoutput = transactions[transactionsIndex].rawtransaction.data.coinoutputs[coinOutputIndex]

    if (!coinoutput.condition) {
      this.isLegacy = true
    }

    this.coinOutput = {
      ...coinoutput,
      txid: transactions[transactionsIndex].id
    }
  }

  getCoinOutputBlockCreatorReward () {
    const blocks = this.$store.getters.HASH.blocks
    const hashId = this.$route.params.hash

    const minerPayoutsIndexArray = blocks.map((block:any) => {
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
      return tx.rawtransaction.data.coininputs.findIndex((ci:any) => ci.parentid === hashId)
    })
    let transactionsIndex = coinInputIndexArray.findIndex((idx:any) => idx !== -1)
    // if index is -1, no input is found. Return nothing
    if (transactionsIndex == -1) return

    const coinInputIndex = coinInputIndexArray.filter((v:any) => v !== -1)
    const coininput = transactions[transactionsIndex].rawtransaction.data.coininputs[coinInputIndex]

    // If input is found, it means this output is spent.
    this.coinOutputSpent = true

    if (!coininput.condition) {
      this.isLegacy = true
    }

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
  margin-top: 20px;
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>
