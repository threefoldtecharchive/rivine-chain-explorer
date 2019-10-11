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

      <h3 v-if="wallet.minerPayouts.length > 0">
        Fee/Reward Payout Appearances
      </h3>
      <div v-for="(mp, idx) in wallet.minerPayouts" v-bind:key="mp.id">
        <MinerOutput :output="mp" class="tx-table" />
      </div>

      <h3 v-if="wallet.coinOutputsBlockCreator.length > 0">
        Coin Output Appearances
      </h3>
      <div v-for="(co, idx) in wallet.coinOutputsBlockCreator" v-bind:key="co.id">
         <CoinOutput :output="co" class="tx-table" />
      </div>

      <h3 v-if="wallet.blockStakesOutputsBlockCreator.length > 0">
        Blockstake Output Appearances
      </h3>
      <div
        v-for="(sbo, idx) in wallet.blockStakesOutputsBlockCreator"
        v-bind:key="sbo.id"
      >
        <BlockStakeOutput :output="sbo" class="tx-table" />
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { UNIT } from '../../common/config'
import MinerOutput from '../Common/MinerOutput.vue'
import CoinOutput from '../Common/CoinOutput.vue'
import BlockStakeOutput from '../Common/BlockStakeOutput.vue'

@Component({
  props: ['wallet'],
  components: {
    MinerOutput,
    CoinOutput,
    BlockStakeOutput
  },
  name: 'UnlockHash',
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
