<template lang="html">
  <div>
    <hashes />

    <div v-if="this.$store.getters.HASH.hashtype === 'blockstakeoutputid'">
      <BlockstakeOutputHash />
    </div>

    <div v-if="this.$store.getters.HASH.hashtype === 'coinoutputid'">
      <CoinOutputHash />
    </div>

    <div v-if="this.$store.getters.HASH.hashtype === 'unlockhash'">
      <UnlockHash />
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

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Hashes from './Hashes.vue'
import BlockstakeOutputHash from './HashTypes/BlockstakeOutputHash.vue'
import CoinOutputHash from './HashTypes/CoinOutputHash.vue'
import UnlockHash from './HashTypes/UnlockHash.vue'
import axios from "axios"
import { API_URL, PRECISION, UNIT } from "../common/config"
import { mapState } from 'vuex'

@Component({
  name: 'Hash',
  components: {
    Hashes,
    BlockstakeOutputHash,
    CoinOutputHash,
    UnlockHash
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

  created() {
    // If nothing in store (refreshed page), dispatch a request for the data
    if (!this.$store.getters.HASH.hashtype) {
      this.loading = true
      this.$store.dispatch("SET_HASH", this.$route.params.hash).then(() => {
        this.fetchExplorerBlock()
        this.loading = false
      })
    } else {
      this.fetchExplorerBlock()
      this.loading = false
    }
  }

  @Watch("$route.params.hash")
  OnHashTypeChange(val: string, oldVal: string) {
    this.$store.dispatch("SET_HASH", val).then(() => {
      this.fetchExplorerBlock()
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
