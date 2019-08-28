<template lang="html">
  <div>
    <hashes />

    <div v-if="this.$store.getters.HASH.hashtype === 'blockstakeoutputid'">
      <BlockstakeOutputHash />
    </div>

    <div v-if="this.$store.getters.HASH.hashtype === 'coinoutputid'">
      <CoinOutputHash />
    </div>

    <div class="container" v-else-if="this.$store.getters.HASH.hashtype === 'transactionid'">
      <table class="ui celled table">
        <thead>
          <tr>
            <th colspan="3">Hash type: {{ this.$store.getters.HASH.hashtype }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage($store.getters.HASH.transaction.height)">{{ this.$store.getters.HASH.transaction.height }}</td>
          </tr>
          <tr>
            <td>Confirmations</td>
            <td>{{ this.$store.getters.EXPLORER.height - this.$store.getters.HASH.transaction.height }}</td>
          </tr>
          <tr>
            <td>ID</td>
            <td>{{ this.$store.getters.HASH.transaction.id }}</td>
          </tr>
          <tr v-if="this.$store.getters.HASH.transaction.rawtransaction.data.coininputs && this.$store.getters.HASH.transaction.rawtransaction.data.coininputs.length > 0">
            <td>Coin Input Count</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.coininputs.length }}</td>
          </tr>
          <tr v-if="this.$store.getters.HASH.transaction.rawtransaction.data.coinoutputs">
            <td>Coin Output Count</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.coinoutputs.length }}</td>
          </tr>
          <tr v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs">
            <td>Blockstake Input Count</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs.length }}</td>
          </tr>
          <tr v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs">
            <td>Blockstake Output Count</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs.length  }}</td>
          </tr>
          <tr v-if="this.$store.getters.HASH.transaction.rawtransaction.data.arbitrarydata">
            <td>Arbitrary Data Byte</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.arbitrarydata.length }}</td>
          </tr>
        </tbody>
      </table>
      <h3 v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs">Blockstake Inputs</h3>
      <table class="ui celled table" v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs">
        <thead>
          <tr>
            <th colspan="3">Used output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].parentid)">
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].parentid }}
            </td>
          </tr>
          <tr v-if="$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].condition">
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].condition.data.unlockhash)">
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].condition.data.unlockhash  }}
            </td>
          </tr>
          <tr v-else>
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].unlockhash)">
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].unlockhash  }}
            </td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].value }}</td>
          </tr>
        </tbody>
        <thead v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].fulfillment">
          <tr>
            <th colspan="3">Fulfillment</th>
          </tr>
        </thead>
        <tbody v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].fulfillment">
          <tr>
            <td>Type</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].fulfillment.type }}</td>
          </tr>
          <tr>
            <td>Publickey</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].fulfillment.data.publickey }}</td>
          </tr>
          <tr>
            <td>Signature</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].fulfillment.data.signature }}</td>
          </tr>
        </tbody>

        <thead v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker">
          <tr>
            <th colspan="3">Unlocker</th>
          </tr>
        </thead>
        <tbody v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker">
          <tr>
            <td>Unlock Type</td>
            <td>
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker.type }}
            </td>
          </tr>
        </tbody>
        <thead v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker">
          <tr>
            <th colspan="3">Condition</th>
          </tr>
        </thead>
        <tbody v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker">
          <tr>
            <td>Publickey</td>
            <td>
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker.condition.publickey }}
            </td>
          </tr>
        </tbody>
        <thead v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker">
          <tr>
            <th colspan="3">Fulfillment</th>
          </tr>
        </thead>
        <tbody v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker">
          <tr>
            <td>Signature</td>
            <td>
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeinputs[0].unlocker.fulfillment.signature }}
            </td>
          </tr>
        </tbody>
      </table>
      <h3 v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs">Blockstake Outputs</h3>
      <table class="ui celled table" v-if="this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs">
        <tbody>
          <tr>
            <td>ID</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.blockstakeoutputids[0])">
              {{ this.$store.getters.HASH.transaction.blockstakeoutputids[0] }}
            </td>
          </tr>
          <tr v-if="$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].condition">
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].condition.data.unlockhash)">
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].condition.data.unlockhash  }}
            </td>
          </tr>
          <tr v-else>
            <td>Address</td>
            <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].unlockhash)">
              {{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].unlockhash  }}
            </td>
          </tr>
          <tr>
            <td>Value</td>
            <td>{{ this.$store.getters.HASH.transaction.rawtransaction.data.blockstakeoutputs[0].value }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="this.$store.getters.HASH.transaction.rawtransaction.data.coininputs">
        <h3 class="tx-table" v-if="this.$store.getters.HASH.transaction.rawtransaction.data.coininputs.length > 0">Coin Inputs</h3>
      </div>
      <div class="tx-table" v-for="(input, index) in this.$store.getters.HASH.transaction.rawtransaction.data.coininputs">
        <table class="ui celled table" v-if="$store.getters.HASH.transaction.rawtransaction.data.coininputs">
          <thead>
            <tr>
              <th colspan="3">Used output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage(input.parentid)">{{ input.parentid }}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.coininputoutputs[0].unlockhash)">
                {{ $store.getters.HASH.transaction.coininputoutputs[0].unlockhash }}
              </td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{{ $store.getters.HASH.transaction.coininputoutputs[0].value / precision }} {{ unit }}</td>
            </tr>
          </tbody>
        </table>
        <table class="ui celled table">
          <thead>
            <tr>
              <th colspan="3">Fulfillment</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="input.unlocker">
              <td>Unlock type</td>
              <td>{{ input.unlocker.type }}</td>
            </tr>
            <tr v-else>
              <td>Unlock type</td>
              <td>{{ input.fulfillment.type }}</td>
            </tr>
            <tr v-if="input.unlocker">
              <td>Publickey</td>
              <td>{{ input.unlocker.condition.publickey }}</td>
            </tr>
             <tr v-else>
              <td>Publickey</td>
              <td>{{ input.fulfillment.data.publickey  }}</td>
            </tr>
            <tr v-if="input.unlocker">
              <td>Signature</td>
              <td>{{ input.unlocker.fulfillment.signature }}</td>
            </tr>
            <tr v-else>
              <td>Signature</td>
              <td>{{ input.fulfillment.data.signature  }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="this.$store.getters.HASH.transaction.rawtransaction.data.coinoutputs">
        <h3 class="tx-table" v-if="this.$store.getters.HASH.transaction.rawtransaction.data.coinoutputs.length > 0">Coin Outputs</h3>
      </div>
      <div class="tx-table" v-for="(output, index) in this.$store.getters.HASH.transaction.rawtransaction.data.coinoutputs">
        <table class="ui celled table">
          <thead>
            <tr>
              <th colspan="3">Coin output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.coinoutputids[index])">{{ $store.getters.HASH.transaction.coinoutputids[index] }}</td>
            </tr>
            <tr v-if="output.condition">
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(output.condition.data.unlockhash)">{{ output.condition.data.unlockhash  }}</td>
            </tr>
            <tr v-else>
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(output.unlockhash)">{{ output.unlockhash  }}</td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{{ output.value / precision  }} {{ unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tx-table" v-if="this.$store.getters.HASH.transaction.rawtransaction.data.arbitrarydata">
        <h3>Arbitrary Data</h3>
        <table class="ui celled table">
          <tbody>
            <tr>
              <td>Base64-decoded Data</td>
              <td>{{decodeString(this.$store.getters.HASH.transaction.rawtransaction.data.arbitrarydata)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tx-table" v-if="feepayoutId !== ''">
        <h3 >Transaction Fee Payouts</h3>
        <table class="ui celled table">
          <tbody>
            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage(feepayoutId)">{{ feepayoutId }}</td>
            </tr>
            <tr>
              <td>Payout Address</td>
              <td class="clickable" v-on:click="routeToHashPage(feepayoutAddress)">{{ feepayoutAddress }}</td>
            </tr>
            <tr>
              <td>Value</td>
              <td>{{ feepayoutValue / precision }} {{ unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="container" v-else-if="this.$store.getters.HASH.hashtype === 'unlockhash'">
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
import { Component, Vue, Watch } from "vue-property-decorator"
import Hashes from './Hashes.vue'
import BlockstakeOutputHash from './HashTypes/BlockstakeOutputHash.vue'
import CoinOutputHash from './HashTypes/CoinOutputHash.vue'
import axios from "axios"
import { API_URL, PRECISION, UNIT } from "../common/config"
import { mapState } from 'vuex'

@Component({
  name: 'Hash',
  components: {
    Hashes,
    BlockstakeOutputHash,
    CoinOutputHash
  },
  watch: {
    '$store.state.block': function() {
      this.$router.push("/block/" + this.$store.state.block.block.height)
    }
  }
})

export default class Hash extends Vue {
  feepayoutAddress = ''
  feepayoutValue = 0
  feepayoutId = ''
  loading = false
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
    // If nothing in store (refreshed page), dispatch a request for the data
    if (!this.$store.getters.HASH.hashtype) {
      this.loading = true
      this.$store.dispatch("SET_HASH", this.$route.params.hash).then(() => {
        this.fetchExplorerBlock()
        this.calculateTransactionList()
        this.calculateTransactionListForBlockCreator()
        this.loading = false
      })
    } else {
      this.fetchExplorerBlock()
      this.calculateTransactionList()
      this.calculateTransactionListForBlockCreator()
      this.loading = false
    }
  }

  @Watch("$route.params.hash")
  OnHashTypeChange(val: string, oldVal: string) {
    this.$store.dispatch("SET_HASH", val).then(() => {
      this.fetchExplorerBlock()
      this.calculateTransactionList()
      this.calculateTransactionListForBlockCreator()
      this.loading = false
    })
  }

  beforeRouteEnter(to:any, from:any, next:any) {
    this.fetchExplorerBlock()
    next()
  }

  routeToHashPage (val:any) {
    this.$store.dispatch("SET_HASH", val).then(() => {
      this.$router.push("/hashes/" + val);
    })
  }

  routeToBlockPage (val:any) {
    this.$store.dispatch("SET_BLOCK_HEIGHT", val)
  }

  decodeString (str:any) {
    return atob(str)
  }

  fetchExplorerBlock () {
    if (this.$store.getters.HASH.transaction && this.$store.getters.HASH.hashtype === "coinoutputid" || this.$store.getters.HASH.hashtype === "transactionid") {
      // Call explorer for transaction fee payouts
      const parentId = this.$store.getters.HASH.transaction.parent
      // means there is no parent id
      if (parentId === "0000000000000000000000000000000000000000000000000000000000000000") return
      this.loading = true
      axios({ method: "GET", url: API_URL + "/explorer/hashes/" + parentId}).then(result => {
        const explorerBlock = result.data.block
        if (explorerBlock.rawblock.minerpayouts == null || explorerBlock.rawblock.minerpayouts.length < 2) {
          return null
        }
        if (explorerBlock.transactions == null) {
          return null
        }
        const feePayout = explorerBlock.rawblock.minerpayouts[1]
        const feePayoutID = explorerBlock.minerpayoutids[1]
        this.feepayoutAddress = feePayout.unlockhash,
        this.feepayoutValue = feePayout.value,
        this.feepayoutId = feePayoutID
        this.loading = false
      }, error => {
        console.error(error);
        this.loading = false
      })
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
.spinner {
  margin: 'auto';
  margin-top: 50px;
  height: 500px;
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
