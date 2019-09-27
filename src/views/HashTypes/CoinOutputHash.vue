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

        <tr v-if="coinOutputInfo.output.isBlockCreatorReward">
          <td>Block ID</td>
          <td
            class="clickable"
            v-on:click="routeToBlockPage(coinOutputInfo.output.blockId)"
          >
            {{ coinOutputInfo.output.blockId }}
          </td>
        </tr>
        <tr v-else>
          <td>Transaction ID</td>
          <td class="clickable" v-on:click="routeToHashPage(coinOutputInfo.output.txId)">
            {{ coinOutputInfo.output.txId }}
          </td>
        </tr>

        <tr>
          <td>Address</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(unlockhash)"
          >
            {{ unlockhash }}
          </td>
        </tr>

        <tr>
          <td>Value</td>
          <td>
            {{ toLocalDecimalNotation(coinOutputInfo.output.value) }}
            {{ unit }}
          </td>
        </tr>

        <tr>
          <td>Has been spent</td>
          <td v-if="coinOutputInfo.input">Yes</td>
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
          <td
            class="clickable"
            v-on:click="routeToHashPage(this.$route.params.hash)"
          >
            {{ this.$route.params.hash }}
          </td>
        </tr>
        <tr>
          <td>Contract Address</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(coinOutputInfo.output.condition.contractAddress)"
          >
            {{ coinOutputInfo.output.condition.contractAddress }}
          </td>
        </tr>
        <tr>
          <td>Sender</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(coinOutputInfo.output.condition.sender)"
          >
            {{ coinOutputInfo.output.condition.sender }}
          </td>
        </tr>
        <tr>
          <td>Receiver</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(coinOutputInfo.output.condition.receiver)"
          >
            {{ coinOutputInfo.output.condition.receiver }}
          </td>
        </tr>
        <tr>
          <td>Hashed Secret</td>
          <td>{{ coinOutputInfo.output.condition.hashedSecret }}</td>
        </tr>
        <tr>
          <td>Timelock</td>
          <td>{{ coinOutputInfo.output.condition.timelock }}</td>
        </tr>
        <tr>
          <td>Unlocked for refunding since</td>
          <td>{{ formatReadableDate(coinOutputInfo.output.condition.timelock) }}</td>
        </tr>
        <tr>
          <td>Value</td>
          <td>
            {{ toLocalDecimalNotation(coinOutputInfo.output.value) }}
            {{ unit }}
          </td>
        </tr>
        <tr>
          <td>Transaction ID</td>
          <td class="clickable" v-on:click="routeToHashPage(coinOutputInfo.output.txId)">
            {{ coinOutputInfo.output.txId }}
          </td>
        </tr>
        <tr>
          <td>Has been spent</td>
          <td v-if="coinOutputInfo.input">Yes</td>
          <td v-else>No</td>
        </tr>
      </tbody>
    </table>

    <table class="ui celled table" v-if="coinOutputInfo.input">
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
          <td class="clickable" v-on:click="routeToHashPage(coinOutputInfo.input.txId)">
            {{ coinOutputInfo.input.txId }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from "vuex";
import { PRECISION, UNIT } from "../../common/config";
import { ConditionType, UnlockhashCondition, AtomicSwapCondition, TimelockCondition, CoinOutputInfo } from "rivine-ts-types"
import { getUnlockHash } from "../../common/helpers";

import {
  toLocalDecimalNotation,
  formatReadableDate
} from "../../common/helpers";

@Component({
  name: "CoinOutputHash",
  watch: {
    "$route.params.block"(val) {
      // call the method which loads your initial state
      this.$store.dispatch("SET_BLOCK_HEIGHT", val);
    },
    "$store.state.block": function() {
      this.$router.push("/block/" + this.$store.state.block.block.height);
    }
  },
  methods: {
    routeToHashPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/hashes/" + val);
    },
    routeToBlockPage: function(val) {
      this.$store.dispatch("SET_HASH", val);
      this.$router.push("/block/" + val);
    }
  }
})
export default class CoinOutputHash extends Vue {
  precision: number = Math.pow(10, PRECISION);
  unit: string = UNIT;
  toLocalDecimalNotation = toLocalDecimalNotation;
  formatReadableDate = formatReadableDate;
  isAtomicSwap: boolean = false;
  isLoading: boolean = false;

  coinOutputInfo?: CoinOutputInfo;
  unlockhash?: string;

  created() {
    window.scrollTo(0, 0);
    this.coinOutputInfo = this.$store.getters.HASH as CoinOutputInfo;
    // this.renderUnlockHash(this.coinOutputInfo);
    this.unlockhash = getUnlockHash(this.coinOutputInfo)
    this.isLoading = true;
    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash;
      this.$store.dispatch("SET_HASH", hash).then(() => {
        this.checkIfAtomicSwap();
        this.isLoading = false;
        this.coinOutputInfo = this.$store.getters.HASH as CoinOutputInfo;
        // this.renderUnlockHash(this.coinOutputInfo);
        this.unlockhash = getUnlockHash(this.coinOutputInfo)
      });
    });
    this.checkIfAtomicSwap();
    this.isLoading = false;
  }

  checkIfAtomicSwap() {
    if (this.coinOutputInfo) {
      if (this.coinOutputInfo.output.condition) {
        this.isAtomicSwap = this.coinOutputInfo.output.condition.getConditionType() === ConditionType.AtomicSwapCondition
      }
    }
  }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: "auto";
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
