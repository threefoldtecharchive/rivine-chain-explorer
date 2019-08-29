<template lang="html">
      <div class="container">
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
              <td>{{ toLocalDecimalNotation($store.getters.HASH.transaction.coininputoutputs[0].value / precision) }} {{ unit }}</td>
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
              <td>Type</td>
              <td>{{ input.unlocker.type }}</td>
            </tr>
            <tr v-else>
              <td>Type</td>
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
        <table class="ui celled table" v-if="output.condition.type === 1">
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
              <td>{{ toLocalDecimalNotation(output.value / precision)  }} {{ unit }}</td>
            </tr>
          </tbody>
        </table>

        <!-- atomic swap -->
        <table class="ui celled table" v-else-if="output.condition.type === 2">
          <thead>
            <tr>
              <th colspan="3">Coin output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.coinoutputids[index])">
                {{ $store.getters.HASH.transaction.coinoutputids[index] }}
              </td>
            </tr>
            <tr v-if="output.condition">
              <td>Contract Address</td>
              <td class="clickable" v-on:click="routeToHashPage($store.getters.HASH.transaction.coinoutputunlockhashes[index])">
                {{ $store.getters.HASH.transaction.coinoutputunlockhashes[index] }}
              </td>
            </tr>
            <tr v-if="output.condition.data.sender">
              <td>Sender</td>
              <td class="clickable" v-on:click="routeToHashPage(output.condition.data.sender)">
                {{ output.condition.data.sender }}
              </td>
            </tr>
            <tr v-if="output.condition.data.receiver">
              <td>Receiver</td>
              <td class="clickable" v-on:click="routeToHashPage(output.condition.data.receiver)">
                {{ output.condition.data.receiver }}
              </td>
            </tr>
            <tr v-if="output.condition.data.hashedsecret">
              <td>Hashed Secret</td>
              <td>{{ output.condition.data.hashedsecret }}</td>
            </tr>
            <tr v-if="output.condition.data.timelock">
              <td>Timelock</td>
              <td>{{ output.condition.data.timelock }}</td>
            </tr>
            <tr v-if="output.condition.data.timelock">
              <td>Unlocked for refunding since</td>
              <td>{{ formatReadableDate(output.condition.data.timelock) }}</td>
            </tr>
            <tr>
              <td>Value</td>
              <td>
                {{ toLocalDecimalNotation(output.value / precision)  }} {{ unit }}
              </td>
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
              <td>{{ toLocalDecimalNotation(feepayoutValue / precision) }} {{ unit }} of a total payout of {{ toLocalDecimalNotation(feepayoutValue / precision) }} {{ unit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from 'vuex';
import axios from "axios"
import { API_URL, PRECISION, UNIT } from "../../common/config"
import { toLocalDecimalNotation, formatReadableDate } from '../../common/helpers'

@Component({
  name: 'TransactionIdHash',
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
export default class TransactionIdHash extends Vue {
  feepayoutAddress = ''
  feepayoutValue = 0
  feepayoutId = ''
  toLocalDecimalNotation = toLocalDecimalNotation
  formatReadableDate = formatReadableDate
  precision = Math.pow(10, PRECISION)
  unit = UNIT
  isLoading: boolean = false

  created() {
    this.isLoading = true
    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash
      this.$store.dispatch("SET_HASH", hash).then(() => {
        this.fetchExplorerBlock()
      })
    })
    this.fetchExplorerBlock()
    this.isLoading = false
  }

  decodeString (str:any) {
    return atob(str)
  }

  fetchExplorerBlock () {
    // Call explorer for transaction fee payouts
    const parentId = this.$store.getters.HASH.transaction.parent
    // means there is no parent id
    if (parentId === "0000000000000000000000000000000000000000000000000000000000000000") return
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
    }, error => {
      console.error(error);
    })
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
