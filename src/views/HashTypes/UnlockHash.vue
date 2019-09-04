<template lang="html">
  <div class="container">
    <h1>Hash</h1>
    <div>
      <h1 v-if="isAtomicSwap">Atomic Swap Contract</h1>
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
            <td>{{ toLocalDecimalNotation(availableBalance) }} {{ unit }}</td>
          </tr>
          <tr v-if="!isAtomicSwap">
            <td>Last Coin Spend</td>
            <td>
              @ Block:
              <span class="clickable" v-on:click="routeToBlockPage(lastCoinSpent.height)">{{ lastCoinSpent.height }}</span>
              Txid:
              <span class="clickable" v-on:click="routeToHashPage(lastCoinSpent.txid)">{{ lastCoinSpent.txid }}</span>
            </td>
          </tr>
          <tr>
            <td>Confirmed Block Stake Balance</td>
            <td>{{ availableBlockstakeBalance }} BS</td>
          </tr>
          <tr v-if="this.$store.getters.HASH.blocks">
            <td>Last Block Stake Spend</td>
            <td>
              @ Block:
              <span class="clickable" v-on:click="routeToBlockPage(lastBsSpent.height)">{{ lastBsSpent.height }}</span>
              Txid:
              <span class="clickable" v-on:click="routeToHashPage(lastBsSpent.txid)">{{ lastBsSpent.txid }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-for="(uco, idx) in ucos">
        <div class="tx-table" v-if="!isAtomicSwap">
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
              <td>{{ toLocalDecimalNotation(uco.value / precision) }} {{ unit }}</td>
            </tr>
            <tr>
              <td>Has Been Spent</td>
              <td>No</td>
            </tr>
            </tbody>
          </table>
        </div>

        <!-- atomic swap -->
        <div class="tx-table" v-if="isAtomicSwap">
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
            <tr>
              <td>Contract Address</td>
              <td >
                {{ $store.getters.HASH.transactions[uco.txidx].coinoutputunlockhashes[idx] }}
              </td>
            </tr>
            <tr>
              <td>Sender</td>
              <td class="clickable" v-on:click="routeToHashPage(uco.condition.data.sender)">{{ uco.condition.data.sender }}</td>
            </tr>
            <tr>
              <td>Receiver</td>
              <td class="clickable" v-on:click="routeToHashPage(uco.condition.data.receiver)">{{ uco.condition.data.receiver }}</td>
            </tr>
            <tr>
              <td>Hashed Secret</td>
              <td>{{ uco.condition.data.hashedsecret }}</td>
            </tr>
            <tr>
              <td>Timelock</td>
              <td>{{ uco.condition.data.timelock }}</td>
            </tr>
            <tr>
              <td>Unlocked for refunding since</td>
              <td>{{ formatReadableDate(uco.condition.data.timelock) }}</td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{{ toLocalDecimalNotation(uco.value / precision) }} {{ unit }}</td>
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
              <td>{{ toLocalDecimalNotation(sco.value / precision) }} {{ unit }}</td>
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
              <td>{{ toLocalDecimalNotation(unspentMp.value / precision) }} {{ unit }}</td>
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
              <td>{{ toLocalDecimalNotation(sco.value / precision) }} {{ unit }}</td>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from 'vuex';
import { PRECISION, UNIT } from "../../common/config"
import { flatten, toArray } from 'lodash'
import { toLocalDecimalNotation, formatReadableDate } from '../../common/helpers'

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
      debugger
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
  spentMinerPayouts:any = []
  unspentMinerPayouts:any = []
  spentCoinOutputsBlockCreator = []
  spentBlockStakesOutputsBlockCreator = []
  unspentBlockStakesOutputsBlockCreator = []
  toLocalDecimalNotation = toLocalDecimalNotation
  formatReadableDate = formatReadableDate
  isAtomicSwap:boolean = false
  lastCoinSpent:any = {}
  lastBsSpent:any = {}

  created() {
    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash
      this.$store.dispatch("SET_HASH", hash).then(() => {
        this.calculateTransactionList()
        this.calculateTransactionListForBlockCreator()
        this.checkIfAtomicSwap()
      })
    })

    this.calculateTransactionList()
    this.calculateTransactionListForBlockCreator()
    this.checkIfAtomicSwap()
  }

  checkIfAtomicSwap () {
    const txs = this.$store.getters.HASH.transactions
    if (!txs) return

    const idx = txs.findIndex((tx:any) => {
      if (!tx.rawtransaction.data.coinoutputs) return
      return tx.rawtransaction.data.coinoutputs.findIndex((co:any) => {
        if (!co.condition) return
        return co.condition.data.hashedsecret
      }) !== -1
    })
    if (idx !== -1) {
      this.isAtomicSwap = true
    }
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

    const ucos = transactions.map((tx:any, index:number) => {
      const ucoIndex = tx.coinoutputunlockhashes.findIndex((uh:any) => uh === address)
      const coinOutput = tx.rawtransaction.data.coinoutputs[ucoIndex]
      if (coinOutput) {
        return {
          ...coinOutput,
          coinOutputId: tx.coinoutputids[ucoIndex],
          blockHeight: tx.height,
          txid: tx.id,
          txidx: index
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
    let spentMinerPayouts:any = []
    const blocks = this.$store.getters.HASH.blocks
    const transactions = this.$store.getters.HASH.transactions
    if (!blocks || !transactions) return

    const unspentMinerPayouts = flatten(blocks.map((block:any) => {
      return block.rawblock.minerpayouts.map((mp:any, index:number) => {
        if (mp.unlockhash === address) {
          const minerPayout = block.rawblock.minerpayouts[index]
          if (minerPayout) {
            return {
              ...minerPayout,
              minerPayoutId: block.minerpayoutids[index],
              blockid: block.blockid,
              blockHeight: block.height
            }
          }
        }
      })
    })).filter(Boolean) as any

    transactions.forEach((tx:any) => {
      if (!tx.rawtransaction.data.coininputs) return
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
    this.txid = unspentMinerPayouts.length > 0 ? unspentMinerPayouts[0].blockid : ""
    this.blockHeight = unspentMinerPayouts.length > 0 ? unspentMinerPayouts[0].blockHeight : 0
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
    let lastCoinSpent:any
    transactions.forEach((tx:any) => {
      if (!tx.rawtransaction.data.coininputs) return
      const spentUcos = tx.rawtransaction.data.coininputs.map((ci:any) => {
        const existsInUcosIndex:number = ucos.findIndex((uco:any) => uco.coinOutputId === ci.parentid)
        if (existsInUcosIndex > -1) {

          // Save last coin spent
          if (lastCoinSpent && lastCoinSpent.height) {
            if (tx.height > lastCoinSpent.height) {
              lastCoinSpent = {
                height: tx.height,
                txid: tx.id
              }
            }
            // if it doesn't exist, initialize it
          } else {
            lastCoinSpent = {
              height: tx.height,
              txid: tx.id
            }
          }

          spentCoinOutputsBlockCreator.push(ucos[existsInUcosIndex])
          ucos.splice(existsInUcosIndex, 1)
        }
      })
    })
    this.lastCoinSpent = lastCoinSpent
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
    let lastBsSpent:any
    transactions.forEach((tx:any) => {
      if (!tx.rawtransaction.data.blockstakeinputs) return
      const spentUcos = tx.rawtransaction.data.blockstakeinputs.map((ci:any) => {
        const existsInBusIndex:number = ucos.findIndex((uco:any) => uco.blockstakeOutputId === ci.parentid)
        if (existsInBusIndex > -1) {
          // Save last bs spent
          if (lastBsSpent && lastBsSpent.height) {
            if (tx.height > lastBsSpent.height) {
              lastBsSpent = {
                height: tx.height,
                txid: tx.id
              }
            }
            // if it doesn't exist, initialize it
          } else {
            lastBsSpent = {
              height: tx.height,
              txid: tx.id
            }
          }

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
    this.lastBsSpent = lastBsSpent
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
.container h1 {
  text-align: left;
  font-size: 30px;
}
</style>
