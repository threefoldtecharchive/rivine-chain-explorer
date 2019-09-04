<template lang="html">
      <div class="container">
      <h1>Hash</h1>
      <table class="ui celled table">
        <thead>
          <tr>
            <th colspan="3">Hash type: {{ this.$store.getters.HASH.hashtype }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Block Height</td>
            <td class="clickable" v-on:click="routeToBlockPage($store.getters.HASH.transaction.height)">
              {{ toLocalDecimalNotation(this.$store.getters.HASH.transaction.height) }}
            </td>
          </tr>
          <tr>
            <td>Confirmations</td>
            <td>{{ this.$store.getters.EXPLORER.height - this.$store.getters.HASH.transaction.height + 1 }}</td>
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

      <div v-if="blockStakeInputs.length > 0" class="tx-table">
        <h3 >Blockstake Inputs</h3>
        <table class="ui celled table" v-for="(bsInput, index) in blockStakeInputs">
          <thead>
            <tr>
              <th colspan="3">Used output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage(bsInput.parentid)">
                {{ bsInput.parentid }}
              </td>
            </tr>

            <tr v-if="isLegacy">
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(blockStakeInputsOutputs[index].unlockhash)">
                {{ blockStakeInputsOutputs[index].unlockhash }}
              </td>
            </tr>
            <tr v-else>
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(blockStakeInputsOutputs[index].unlockhash)">
                {{ blockStakeInputsOutputs[index].unlockhash  }}
              </td>
            </tr>

            <tr v-if="isLegacy">
              <td>Value</td>
              <td>{{ blockStakeInputsOutputs[index].value }}</td>
            </tr>
            <tr v-else>
              <td>Value</td>
              <td>{{ blockStakeInputsOutputs[index].value }}</td>
            </tr>

          </tbody>

          <thead v-if="bsInput.fulfillment">
            <tr>
              <th colspan="3">Fulfillment</th>
            </tr>
          </thead>
          <tbody v-if="bsInput.fulfillment">
            <tr>
              <td>Type</td>
              <td>{{ bsInput.fulfillment.type }}</td>
            </tr>
            <tr>
              <td>Publickey</td>
              <td>{{ bsInput.fulfillment.data.publickey }}</td>
            </tr>
            <tr>
              <td>Signature</td>
              <td>{{ bsInput.fulfillment.data.signature }}</td>
            </tr>
          </tbody>

          <thead v-if="bsInput.unlocker">
            <tr>
              <th colspan="3">Unlocker</th>
            </tr>
          </thead>
          <tbody v-if="bsInput.unlocker">
            <tr>
              <td>Unlock Type</td>
              <td>
                {{ bsInput.unlocker.type }}
              </td>
            </tr>
          </tbody>
          <thead v-if="bsInput.unlocker">
            <tr>
              <th colspan="3">Condition</th>
            </tr>
          </thead>
          <tbody v-if="bsInput.unlocker">
            <tr>
              <td>Publickey</td>
              <td>
                {{ bsInput.unlocker.condition.publickey }}
              </td>
            </tr>
          </tbody>
          <thead v-if="bsInput.unlocker">
            <tr>
              <th colspan="3">Fulfillment</th>
            </tr>
          </thead>
          <tbody v-if="bsInput.unlocker">
            <tr>
              <td>Signature</td>
              <td>
                {{ bsInput.unlocker.fulfillment.signature }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="blockStakeOutputs.length > 0" class="tx-table">
        <h3>Blockstake Outputs</h3>

        <table v-for="(bsOut, index) in blockStakeOutputs" class="ui celled table">
          <tbody>

            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage(blockStakeOutputIds[index])">
                {{ blockStakeOutputIds[index] }}
              </td>
            </tr>

            <tr v-if="isLegacy">
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(bsOut.unlockhash)">
                {{ bsOut.unlockhash }}
              </td>
            </tr>
            <tr v-else>
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(bsOut.condition.data.unlockhash)">
                {{ bsOut.condition.data.unlockhash  }}
              </td>
            </tr>

            <tr v-if="isLegacy">
              <td>Value</td>
              <td>{{ bsOut.value }}</td>
            </tr>
            <tr v-else>
              <td>Value</td>
              <td>{{ bsOut.value }}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div v-if="coinInputs.length > 0" class="tx-table">
        <h3 >Coin Inputs</h3>
        <table class="ui celled table" v-for="(coinInput, index) in coinInputs">
          <thead>
            <tr>
              <th colspan="3">Used output</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>ID</td>
              <td class="clickable" v-on:click="routeToHashPage(coinInput.parentid)">
                {{ coinInput.parentid }}
              </td>
            </tr>

            <tr v-if="isLegacy">
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(coinInputsOutputs[index].unlockhash)">
                {{ coinInputsOutputs[index].unlockhash }}
              </td>
            </tr>
            <tr v-else>
              <td>Address</td>
              <td class="clickable" v-on:click="routeToHashPage(coinInputsOutputs[index].unlockhash)">
                {{ coinInputsOutputs[index].condition.data.unlockhash  }}
              </td>
            </tr>

            <tr v-if="isLegacy">
              <td>Value</td>
              <td>{{ toLocalDecimalNotation(coinInputsOutputs[index].value / precision) }} {{ unit }}</td>
            </tr>
            <tr v-else>
              <td>Value</td>
              <td>{{ toLocalDecimalNotation(coinInputsOutputs[index].value / precision) }} {{ unit }}</td>
            </tr>

          </tbody>

          <thead v-if="coinInput.fulfillment">
            <tr>
              <th colspan="3">Fulfillment</th>
            </tr>
          </thead>
          <tbody v-if="coinInput.fulfillment">
            <tr>
              <td>Type</td>
              <td>{{ coinInput.fulfillment.type }}</td>
            </tr>
            <tr>
              <td>Publickey</td>
              <td>{{ coinInput.fulfillment.data.publickey }}</td>
            </tr>
            <tr>
              <td>Signature</td>
              <td>{{ coinInput.fulfillment.data.signature }}</td>
            </tr>
          </tbody>

          <thead v-if="coinInput.unlocker">
            <tr>
              <th colspan="3">Unlocker</th>
            </tr>
          </thead>
          <tbody v-if="coinInput.unlocker">
            <tr>
              <td>Unlock Type</td>
              <td>
                {{ coinInput.unlocker.type }}
              </td>
            </tr>
          </tbody>
          <thead v-if="coinInput.unlocker">
            <tr>
              <th colspan="3">Condition</th>
            </tr>
          </thead>
          <tbody v-if="coinInput.unlocker">
            <tr>
              <td>Publickey</td>
              <td>
                {{ coinInput.unlocker.condition.publickey }}
              </td>
            </tr>
          </tbody>
          <thead v-if="coinInput.unlocker">
            <tr>
              <th colspan="3">Fulfillment</th>
            </tr>
          </thead>
          <tbody v-if="coinInput.unlocker">
            <tr>
              <td>Signature</td>
              <td>
                {{ coinInput.unlocker.fulfillment.signature }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="coinOutputs.length > 0" class="tx-table">
        <h3>Coin Outputs</h3>

        <div v-for="(coinOut, index) in coinOutputs" >

          <!-- if legacy or condition type 1 -->
          <table class="ui celled table" v-if="coinOut.value || coinOut.condition.type === 1">
            <tbody>

              <tr>
                <td>ID</td>
                <td class="clickable" v-on:click="routeToHashPage(coinOutputIds[index])">
                  {{ coinOutputIds[index] }}
                </td>
              </tr>

              <tr v-if="isLegacy">
                <td>Address</td>
                <td class="clickable" v-on:click="routeToHashPage(coinOut.unlockhash)">
                  {{ coinOut.unlockhash }}
                </td>
              </tr>
              <tr v-else>
                <td>Address</td>
                <td class="clickable" v-on:click="routeToHashPage(coinOut.condition.data.unlockhash)">
                  {{ coinOut.condition.data.unlockhash  }}
                </td>
              </tr>

              <tr v-if="isLegacy">
                <td>Value</td>
                <td>{{ coinOut.value / precision }} {{ unit }}</td>
              </tr>
              <tr v-else>
                <td>Value</td>
                <td>{{ coinOut.value / precision }} {{ unit }}</td>
              </tr>

            </tbody>
          </table>


          <!-- atomic swap -->
          <table class="ui celled table" v-else-if="coinOut.condition && coinOut.condition.type === 2">
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
              <td>{{ toLocalDecimalNotation(txFee / precision) }} {{ unit }} of a total payout of {{ toLocalDecimalNotation(feepayoutValue / precision) }} {{ unit }}</td>
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
      this.$router.push("/block/" + val);
    }
  }
})
export default class TransactionIdHash extends Vue {
  feepayoutAddress = ''
  feepayoutValue = 0
  feepayoutId = ''
  txFee = 0
  toLocalDecimalNotation = toLocalDecimalNotation
  formatReadableDate = formatReadableDate
  precision = Math.pow(10, PRECISION)
  unit = UNIT
  isLoading: boolean = false

  blockStakeOutputs:any = []
  blockStakeOutputIds:any = []
  blockStakeInputsOutputs:any = []
  blockStakeInputs:any = []
  coinOutputs:any = []
  coinOutputIds:any = []
  coinInputsOutputs:any = []
  coinInputs:any = []

  isLegacy:boolean = false

  created() {
    window.scrollTo(0,0);

    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash
      this.$store.dispatch("SET_HASH", hash).then(() => {
        this.fetchExplorerBlock()
        this.getBlockStakeOutputInputs()
        this.getCoinOutputInputs()
      })
    })
    this.fetchExplorerBlock()
    this.getBlockStakeOutputInputs()
    this.getCoinOutputInputs()
  }

  decodeString (str:any) {
    return atob(str)
  }

  getBlockStakeOutputInputs () {
    const transaction = this.$store.getters.HASH.transaction
    const bsOutputs = transaction.rawtransaction.data.blockstakeoutputs || []
    const bsInputs = transaction.rawtransaction.data.blockstakeinputs || []
    const bsInputsOutputs = transaction.blockstakeinputoutputs || []
    const bsOutputIds = transaction.blockstakeoutputids || []

    if (bsOutputs) {
      bsOutputs.forEach((bsout:any) => {
        if (!bsout.condition) {
          this.isLegacy = true
        }
      })
    }

    this.blockStakeOutputs = bsOutputs
    this.blockStakeInputs = bsInputs
    this.blockStakeInputsOutputs = bsInputsOutputs
    this.blockStakeOutputIds = bsOutputIds
  }

  getCoinOutputInputs () {
    const transaction = this.$store.getters.HASH.transaction
    const coinOutputs = transaction.rawtransaction.data.coinoutputs || []
    const coinInputs = transaction.rawtransaction.data.coininputs || []
    const coinInputsOutputs = transaction.coininputoutputs || []
    const coinOutputIds = transaction.coinoutputids || []

    if (coinOutputs) {
      coinOutputs.forEach((bsout:any) => {
        if (!bsout.condition) {
          this.isLegacy = true
        }
      })
    }

    this.coinOutputs = coinOutputs
    this.coinOutputIds = coinOutputIds
    this.coinInputs = coinInputs
    this.coinInputsOutputs = coinInputsOutputs
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
      this.feepayoutAddress = feePayout.unlockhash
      this.feepayoutValue = feePayout.value
      this.feepayoutId = feePayoutID

      // Sum all minerfees in the rawtransaction
      if (this.$store.getters.HASH.transaction.rawtransaction.data.minerfees) {
        let sumFee = 0
        this.$store.getters.HASH.transaction.rawtransaction.data.minerfees.map((fee:number) => {
          sumFee += fee
        })
        this.txFee = sumFee
      }
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
.container h1 {
  text-align: left;
  font-size: 30px;
}
</style>
