<template lang="html">
  <div>
    <h1>Hash</h1>
    <div>
      <table class="ui celled table">
        <thead>
          <tr>
            <th colspan="3">Wallet Address</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Address</td>
            <td>{{ wallet.address }}</td>
          </tr>
          <tr>
            <td>Confirmed Coin Balance</td>
            <td>{{ wallet.confirmedCoinBalance.toString() }} {{ unit }}</td>
          </tr>
          <tr v-if="wallet.lastCoinSpent">
            <td>Last Coin Spend</td>
            <td>
              @ Block:
              <span
                class="clickable"
                v-on:click="routeToBlockPage(wallet.lastCoinSpent.height)"
                >{{ wallet.lastCoinSpent.height }}</span
              >
              Txid:
              <span
                class="clickable"
                v-on:click="routeToHashPage(wallet.lastCoinSpent.txid)"
                >{{ wallet.lastCoinSpent.txid }}</span
              >
            </td>
          </tr>
          <tr>
            <td>Confirmed Block Stake Balance</td>
            <td>{{ wallet.confirmedBlockstakeBalance }} BS</td>
          </tr>
          <tr v-if="wallet.lastBlockStakeSpent">
            <td>Last Block Stake Spend</td>
            <td>
              @ Block:
              <span
                class="clickable"
                v-on:click="routeToBlockPage(wallet.lastBlockStakeSpent.height)"
                >{{ wallet.lastBlockStakeSpent.height }}</span
              >
              Txid:
              <span
                class="clickable"
                v-on:click="routeToHashPage(wallet.lastBlockStakeSpent.txid)"
                >{{ wallet.lastBlockStakeSpent.txid }}</span
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div v-for="(coinOutput, idx) in wallet.coinOutputs" v-bind:key="idx">
        <CoinOutput :output="coinOutput" class="tx-table"/>
      </div>

       <!-- <div class="tx-table" v-if="isAtomicSwap">
          <table class="ui celled table">
            <tbody>
              <tr>
                <td>Block Height</td>
                <td
                  class="clickable"
                  v-on:click="routeToBlockPage(uco.blockHeight)"
                >
                  {{ uco.blockHeight }}
                </td>
              </tr>
              <tr>
                <td>Transaction ID</td>
                <td class="clickable" v-on:click="routeToHashPage(uco.txid)">
                  {{ uco.txid }}
                </td>
              </tr>
              <tr>
                <td>ID</td>
                <td
                  class="clickable"
                  v-on:click="routeToHashPage(uco.coinOutputId)"
                >
                  {{ uco.coinOutputId }}
                </td>
              </tr>
              <tr>
                <td>Contract Address</td>
                <td>
                  {{
                    $store.getters.HASH.transactions[uco.txidx]
                      .coinoutputunlockhashes[idx]
                  }}
                </td>
              </tr>
              <tr>
                <td>Sender</td>
                <td
                  class="clickable"
                  v-on:click="routeToHashPage(uco.condition.data.sender)"
                >
                  {{ uco.condition.data.sender }}
                </td>
              </tr>
              <tr>
                <td>Receiver</td>
                <td
                  class="clickable"
                  v-on:click="routeToHashPage(uco.condition.data.receiver)"
                >
                  {{ uco.condition.data.receiver }}
                </td>
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
                <td>
                  {{ toLocalDecimalNotation(uco.value / precision) }} {{ unit }}
                </td>
              </tr>
              <tr>
                <td>Has Been Spent</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

 -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UNIT } from '../../common/config'
import CoinOutput from '../Common/CoinOutput.vue'

@Component({
  props: ['wallet'],
  name: 'UnlockHash',
  components: {
    CoinOutput
  },
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
      this.$store.dispatch('SET_BLOCK_HEIGHT', val)
      this.$router.push('/block/' + val)
    }
  }
})
export default class UnlockHash extends Vue {
  unit = UNIT

  created () {
    window.scrollTo(0, 0)

    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash
      this.$store.dispatch('SET_HASH', hash)
    })
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
.container h1 {
  text-align: left;
  font-size: 30px;
}
</style>
