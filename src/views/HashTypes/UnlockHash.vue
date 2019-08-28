<template lang="html">
  <div class="container">
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">Wallet Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Address</td>
          <td>{{ this.$route.params.hash }}</td>
        </tr>
        <tr>
          <td>Confirmed Coin Balance</td>
          <td>{{ availableBalance }} {{ unit }}</td>
        </tr>
        <tr>
          <td>Last Coin Spend</td>
          <td>@ Block: {{ blockHeight }} Txid: {{ txid }} </td>
        </tr>
        <tr>
          <td>Confirmed Block Stake Balance</td>
          <td>{{ availableBlockstakeBalance }} BS</td>
        </tr>
        <tr v-if="this.$store.getters.HASH.blocks">
          <td>Last Block Stake Spend</td>
          <td>@ Block: {{ blockHeight }} Txid: {{ txid }} </td>
        </tr>
      </tbody>
    </table>
    <div v-for="uco in ucos">
      <div class="tx-table">
        <table class="ui celled table">
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage(uco.blockHeight)">{{ uco.blockHeight }}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
            <td class="clickable" v-on:click="routeToHashPage(uco.txid)">{{ uco.txid }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage(uco.coinOutputId)">{{ uco.coinOutputId }}</td>
          </tr>
          <tr v-if="uco.condition">
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage(uco.condition.data.unlockhash)">{{ uco.condition.data.unlockhash }}</td>
          </tr>
          <tr v-else>
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage(uco.unlockhash)">{{ uco.unlockhash }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ uco.value / precision }} {{ unit }}</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>No</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-for="sco in scos">
      <div class="tx-table">
        <table class="ui celled table tx-table">
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage(sco.blockHeight)">{{ sco.blockHeight }}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
            <td class="clickable"  v-on:click="routeToHashPage(sco.txid)">{{ sco.txid }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage(sco.coinOutputId)">{{ sco.coinOutputId }} </td>
          </tr>
          <tr v-if="sco.condition">
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage(sco.condition.data.unlockhash)">{{ sco.condition.data.unlockhash }}</td>
          </tr>
          <tr v-else>
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage(sco.unlockhash)">{{ sco.unlockhash }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ sco.value / precision }} {{ unit }}</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>Yes</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h3 v-if="unspentMinerPayouts.length > 0">Fee/Reward Payout Appearances</h3>
    <div v-for="unspentMp in unspentMinerPayouts">
      <div class="tx-table">
        <table class="ui celled table tx-table">
        <tbody>
          <tr>
            <td>Block ID</td>
            <td class="clickable"  v-on:click="routeToBlockPage(unspentMp.blockHeight)">{{ unspentMp.blockid }}</td>
          </tr>
          <tr>
            <td>Payout (Coin Output) ID</td>
            <td class="clickable" v-on:click="routeToHashPage(unspentMp.minerPayoutId)">{{ unspentMp.minerPayoutId }} </td>
          </tr>
          <tr>
            <td>Source Description</td>
            <td>Block Creator Reward</td>
          </tr>
          <tr>
            <td>Payout Address</td>
            <td>{{ unspentMp.unlockhash }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ unspentMp.value / precision }} {{ unit }}</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>No</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h3 v-if="spentCoinOutputsBlockCreator.length > 0">Coin Output Appearances</h3>
    <div v-for="sco in spentCoinOutputsBlockCreator">
      <div class="tx-table">
        <table class="ui celled table tx-table">
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage(sco.blockHeight)">{{ sco.blockHeight }}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
            <td class="clickable"  v-on:click="routeToHashPage(sco.txid)">{{ sco.txid }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage(sco.coinOutputId)">{{ sco.coinOutputId }} </td>
          </tr>
          <tr>
            <td>Address</td>
            <td >{{ sco.unlockhash }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ sco.value / precision }} {{ unit }}</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>Yes</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h3 v-if="spentBlockStakesOutputsBlockCreator.length > 0">Blockstake Output Appearances</h3>
    <div v-for="sbo in spentBlockStakesOutputsBlockCreator">
      <div class="tx-table">
        <table class="ui celled table tx-table">
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage(sbo.blockHeight)">{{ sbo.blockHeight }}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
            <td class="clickable"  v-on:click="routeToHashPage(sbo.txid)">{{ sbo.txid }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage(sbo.blockstakeOutputId)">{{ sbo.blockstakeOutputId }} </td>
          </tr>
          <tr>
            <td>Address</td>
            <td >{{ sbo.unlockhash }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ sbo.value }} BS</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>Yes</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h3 v-if="unspentBlockStakesOutputsBlockCreator.length > 0">Blockstake Output Appearances</h3>
    <div v-for="usbo in unspentBlockStakesOutputsBlockCreator">
      <div class="tx-table">
        <table class="ui celled table tx-table">
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage(usbo.blockHeight)">{{ usbo.blockHeight }}</td>
          </tr>
          <tr>
            <td>Transaction ID</td>
            <td class="clickable"  v-on:click="routeToHashPage(usbo.txid)">{{ usbo.txid }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage(usbo.blockstakeOutputId)">{{ usbo.blockstakeOutputId }} </td>
          </tr>
          <tr>
            <td>Address</td>
            <td >{{ usbo.unlockhash }}</td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ usbo.value }} BS</td>
          </tr>
          <tr>
            <td>Has Been Spent</td>
            <td>Yes</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from 'vuex';
import { PRECISION, UNIT } from "../../common/config"

@Component({
  name: 'UnlockHash',
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
      this.$store.dispatch("SET_BLOCK_HEIGHT", val)
    }
  }
})
export default class UnlockHash extends Vue {
  precision = Math.pow(10, PRECISION)
  unit = UNIT
  availableBalance = 0
  availableBlockstakeBalance = 0
  blockHeight = 0
  txid = 0
  ucos = []
  scos = []
  blockCreatorRewardIsSpent = false
  blockstakeOutputIsSpent = false
  spentMinerPayouts = []
  unspentMinerPayouts = []
  spentCoinOutputsBlockCreator = []
  spentBlockStakesOutputsBlockCreator = []
  unspentBlockStakesOutputsBlockCreator = []

  created() {
    if (!this.$store.getters.HASH.hashtype) {
      this.$store.dispatch("SET_HASH", this.$route.params.hash).then(() => {
        this.calculateTransactionList()
        this.calculateTransactionListForBlockCreator()
      })
    } else {
      this.calculateTransactionList()
      this.calculateTransactionListForBlockCreator()
    }
  }

  @Watch("$route.params.hash")
  OnHashTypeChange(val: string, oldVal: string) {
    this.$store.dispatch("SET_HASH", val).then(() => {
      this.calculateTransactionList()
      this.calculateTransactionListForBlockCreator()
    })
  }

  calculateTransactionList () {
    const hashtype = this.$store.getters.HASH.hashtype
    if (hashtype === "coinoutputid") return
    if (hashtype === "blockstakeoutputid") {
      return this.calculateBlockstakeOutputSpent()
    }

    const address = this.$route.params.hash
    const scos:any = []
    const transactions = this.$store.getters.HASH.transactions
    const blocks = this.$store.getters.HASH.blocks
    if (!transactions) return this.calculateCoinoutSpentForBlockCreatorReward()

    // If blocks field is populated then the address is probably the address of a blockcreator
    if (blocks) return this.calculateTransactionListForBlockCreator()

    const ucos = transactions.map((tx:any) => {
      const ucoIndex = tx.coinoutputunlockhashes.findIndex((uh:any) => uh === address)
      const coinOutput = tx.rawtransaction.data.coinoutputs[ucoIndex]
      if (coinOutput) {
        return {
          ...coinOutput,
          coinOutputId: tx.coinoutputids[ucoIndex],
          blockHeight: tx.height,
          txid: tx.id
        }
      }
    }).filter(Boolean)
    transactions.forEach((tx:any) => {
      const spentUcos = tx.rawtransaction.data.coininputs.map((ci:any) => {
        const existsInUcosIndex:number = ucos.findIndex((uco:any) => uco.coinOutputId === ci.parentid)
        if (existsInUcosIndex > -1) {
          scos.push(ucos[existsInUcosIndex])
          ucos.splice(existsInUcosIndex, 1)
        }
      })
    })
    let sum = 0
    ucos.map((uco:any) => {
      sum += parseInt(uco.value)
    })

    this.scos = scos
    this.ucos = ucos
    this.availableBalance = sum / this.precision
    this.txid = ucos[0].txid
    this.blockHeight = ucos[0].blockHeight
  }

  calculateCoinoutSpentForBlockCreatorReward () {
    const address = this.$route.params.hash
    const scos:any = []
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) {
      this.blockCreatorRewardIsSpent = false
      return
    }

    const ucos = transactions.map((tx:any) => {
      const ucoIndex = tx.coinoutputunlockhashes.findIndex((uh:any) => uh === address)
      const coinOutput = tx.rawtransaction.data.coinoutputs[ucoIndex]
      if (coinOutput) {
        return {
          ...coinOutput,
          coinOutputId: tx.coinoutputids[ucoIndex],
          blockHeight: tx.height,
          txid: tx.id
        }
      }
    })
    transactions.forEach((tx:any) => {
      const spentUcos = tx.rawtransaction.data.coininputs.map((ci:any) => {
        const existsInUcosIndex:number = ucos.findIndex((uco:any) => uco.coinOutputId === ci.parentid)
        if (existsInUcosIndex > -1) {
          scos.push(ucos[existsInUcosIndex])
          ucos.splice(existsInUcosIndex, 1)
        }
      })
    })
    this.blockCreatorRewardIsSpent = scos.length > 0
  }

  calculateBlockstakeOutputSpent () {
    const address = this.$route.params.hash
    const scos:any = []
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) {
      this.blockstakeOutputIsSpent = false
    }

    const bos = transactions.map((tx:any) => {
      const boindex = tx.blockstakeoutputids.findIndex((id:any) => id === address)
      if (boindex) {
        return tx
      }
    })

    this.blockstakeOutputIsSpent = bos.length > 0
  }

  calculateTransactionListForBlockCreator () {
    const address = this.$route.params.hash
    const spentMinerPayouts:any = []
    const blocks = this.$store.getters.HASH.blocks
    const transactions = this.$store.getters.HASH.transactions
    if (!blocks || !transactions) return

    const unspentMinerPayouts = blocks.map((block:any) => {
      const mineyPayoutIdIndex = block.rawblock.minerpayouts.findIndex((mp:any) => mp.unlockhash === address)
      const minerPayout = block.rawblock.minerpayouts[mineyPayoutIdIndex]
      if (minerPayout) {
        return {
          ...minerPayout,
          minerPayoutId: block.minerpayoutids[mineyPayoutIdIndex],
          blockid: block.blockid,
          blockHeight: block.height
        }
      }
    }).filter(Boolean)

    transactions.forEach((tx:any) => {
      const spentMinerFees = tx.rawtransaction.data.coininputs.map((ci:any) => {
        const existsInUcosIndex:number = unspentMinerPayouts.findIndex((uco:any) => uco.minerPayoutId === ci.parentid)
        if (existsInUcosIndex > -1) {
          spentMinerPayouts.push(unspentMinerPayouts[existsInUcosIndex])
          unspentMinerPayouts.splice(existsInUcosIndex, 1)
        }
      })
    })
    let sum = 0
    unspentMinerPayouts.map((uco:any) => {
      sum += parseInt(uco.value)
    })

    const testIndex = unspentMinerPayouts.findIndex((x:any) => x.blockHeight === 328)
    this.spentMinerPayouts = spentMinerPayouts
    this.unspentMinerPayouts = unspentMinerPayouts
    this.availableBalance = sum / this.precision
    this.txid = unspentMinerPayouts[0].blockid
    this.blockHeight = unspentMinerPayouts[0].blockHeight
    this.calculateCoinOutputOutputAppearances()
    this.calculateBlockStakeOutputOutputAppearances()
  }

  calculateCoinOutputOutputAppearances () {
    const address = this.$route.params.hash
    const spentCoinOutputsBlockCreator:any = []
    const transactions = this.$store.getters.HASH.transactions

    const ucos = transactions.map((tx:any) => {
      if (!tx.coinoutputunlockhashes) return
      const ucoIndex = tx.coinoutputunlockhashes.findIndex((uh:any) => uh === address)
      const coinOutput = tx.rawtransaction.data.coinoutputs[ucoIndex]
      if (coinOutput) {
        return {
          ...coinOutput,
          coinOutputId: tx.coinoutputids[ucoIndex],
          blockHeight: tx.height,
          txid: tx.id
        }
      }
    }).filter(Boolean)
    transactions.forEach((tx:any) => {
      const spentUcos = tx.rawtransaction.data.coininputs.map((ci:any) => {
        const existsInUcosIndex:number = ucos.findIndex((uco:any) => uco.coinOutputId === ci.parentid)
        if (existsInUcosIndex > -1) {
          spentCoinOutputsBlockCreator.push(ucos[existsInUcosIndex])
          ucos.splice(existsInUcosIndex, 1)
        }
      })
    })
    this.spentCoinOutputsBlockCreator = spentCoinOutputsBlockCreator
  }

  calculateBlockStakeOutputOutputAppearances () {
    const address = this.$route.params.hash
    const spentBlockStakesOutputsBlockCreator:any = []
    const transactions = this.$store.getters.HASH.transactions

    const ucos = transactions.map((tx:any) => {
      if (!tx.blockstakeunlockhashes) return
      const buIndex = tx.blockstakeunlockhashes.findIndex((uh:any) => uh === address)
      const blockstakeOutput = tx.rawtransaction.data.blockstakeoutputs[buIndex]
      if (blockstakeOutput) {
        return {
          ...blockstakeOutput,
          blockstakeOutputId: tx.blockstakeoutputids[buIndex],
          blockHeight: tx.height,
          txid: tx.id
        }
      }
    }).filter(Boolean)
    transactions.forEach((tx:any) => {
      if (!tx.rawtransaction.data.blockstakeinputs) return
      const spentUcos = tx.rawtransaction.data.blockstakeinputs.map((ci:any) => {
        const existsInBusIndex:number = ucos.findIndex((uco:any) => uco.blockstakeOutputId === ci.parentid)
        if (existsInBusIndex > -1) {
          spentBlockStakesOutputsBlockCreator.push(ucos[existsInBusIndex])
          ucos.splice(existsInBusIndex, 1)
        }
      })
    })

    let sum = 0
    ucos.map((uco:any) => {
      sum += parseInt(uco.value)
    })
    this.availableBlockstakeBalance = sum
    this.spentBlockStakesOutputsBlockCreator = spentBlockStakesOutputsBlockCreator
    this.unspentBlockStakesOutputsBlockCreator = ucos
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
