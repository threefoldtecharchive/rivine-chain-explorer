<template lang="html">
  <div class="container">
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">BlockStake Output</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td>ID</td>
          <td>{{ this.$route.params.hash }}</td>
        </tr>

        <tr>
          <td>Transaction ID</td>
          <td class="clickable" v-on:click="routeToHashPage(blockstakeInput.txid)">
            {{ blockstakeInput.txid }}
          </td>
        </tr>

        <tr v-if="v0">
          <td>Address</td>
          <td class="clickable" v-on:click="routeToHashPage(blockstakeOutput.unlockhash)">
            {{ blockstakeOutput.unlockhash }}
          </td>
        </tr>
        <tr v-else-if="v2">
          <td>Address</td>
          <td class="clickable" v-on:click="routeToHashPage(blockstakeOutput.condition.data.unlockhash)">
            {{ blockstakeOutput.condition.data.unlockhash }}
          </td>
        </tr>
        <tr v-else>
          <td>Address</td>
          <td class="clickable" v-on:click="routeToHashPage(blockstakeOutput.condition.unlockhash)">
            {{ blockstakeOutput.condition.unlockhash }}
          </td>
        </tr>

        <tr v-if="v0 || v2">
          <td>Value</td>
          <td>{{ blockstakeOutput.value }}</td>
        </tr>
        <tr v-else>
          <td>Value</td>
          <td>{{ blockstakeOutput.condition.value }}</td>
        </tr>

        <tr>
          <td>Has been spent</td>
          <td v-if="blockCreatorRewardIsSpent">Yes</td>
          <td v-else>No</td>
        </tr>
      </tbody>
    </table>

    <table class="ui celled table" v-if="blockstakeInput.txid">
      <thead>
        <tr>
          <th colspan="3">BlockStake Input</th>
        </tr>
      </thead>
      <tbody>

        <tr>
          <td>ID</td>
          <td>{{ this.$route.params.hash }}</td>
        </tr>

        <tr>
          <td>Transaction ID</td>
          <td class="clickable" v-on:click="routeToHashPage(blockstakeInput.txid)">
            {{ blockstakeInput.txid }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState } from 'vuex';

@Component({
  name: 'BlockstakeOutputHash',
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
export default class BlockstakeOutputHash extends Vue {
  blockCreatorRewardIsSpent: boolean = false
  blockstakeInput: object = {
    condition: {}
  }
  blockstakeOutput: object = {
    condition: {}
  }
  v0: boolean = false
  v2: boolean = false
  isLoading: boolean = false

  created() {
    this.isLoading = true
    // If users navigates, recalculate lists
    this.$router.afterEach((newLocation: any) => {
      const hash = newLocation.params.hash
      this.$store.dispatch("SET_HASH", hash).then(() => {
        this.getBlockStakeOutput()
        this.getBlockStakeInput()
      })
    })
    this.getBlockStakeOutput()
    this.getBlockStakeInput()
    this.isLoading = false
  }

  @Watch("$route.params.hash")
  OnHashTypeChange(val: string, oldVal: string) {
    this.$store.dispatch("SET_HASH", val).then(() => {
      this.getBlockStakeOutput()
      this.getBlockStakeInput()
    })
  }

  getBlockStakeOutput () {
    if (!this.$store.getters.HASH.hashtype) return
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) return

    const hashId = this.$route.params.hash
    let blockstakeOutputIndexArray = transactions.map((tx:any) => {
      return tx.blockstakeoutputids.findIndex((id:any) => id === hashId)
    })
    let transactionsIndex = blockstakeOutputIndexArray.findIndex((idx:any) => idx !== -1)
    if (transactionsIndex == -1) return

    const blockstakeOutputIndex = blockstakeOutputIndexArray.filter((v:any) => v !== -1)
    const blockstakeOutput = transactions[transactionsIndex].rawtransaction.data.blockstakeoutputs[blockstakeOutputIndex]

    // Check if there is no condition object on the output, this means it's from an older version and we use different template
    if (!blockstakeOutput.condition) {
      this.v0 = true
    }

    if (blockstakeOutput.condition && blockstakeOutput.value) {
      this.v2 = true
    }

    this.blockstakeOutput = {
      ...blockstakeOutput,
      txid: transactions[transactionsIndex].id
    }
  }

  getBlockStakeInput () {
    if (!this.$store.getters.HASH.hashtype) return
    const transactions = this.$store.getters.HASH.transactions
    if (!transactions) return

    const hashId = this.$route.params.hash
    let blockstakeInputIndexArray = transactions.map((tx:any) => {
      return tx.rawtransaction.data.blockstakeinputs.findIndex((ci:any) => ci.parentid === hashId)
    })
    let transactionsIndex = blockstakeInputIndexArray.findIndex((idx:any) => idx !== -1)
    if (transactionsIndex == -1) return

    const blockstakeInputIndex = blockstakeInputIndexArray.filter((v:any) => v !== -1)
    const coininput = transactions[transactionsIndex].rawtransaction.data.blockstakeinputs[blockstakeInputIndex]
    this.blockCreatorRewardIsSpent = true

    this.blockstakeInput = {
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
