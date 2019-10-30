<template lang="html">
  <div class="container">
    <navigation />

    <div class="searchBar">
      <Search category="hash" description="Hash" />
    </div>

    <div
      class="ui segment spinner"
      v-if="this.$store.getters.LOADING"
    >
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
      <p></p>
    </div>

    <div class="margin">
      <div v-if="this.$store.getters.HASH.kind() === responseType.BlockstakeOutputInfo">
        <BlockstakeOutputHash />
      </div>

      <div v-else-if="this.$store.getters.HASH.kind() === responseType.CoinOutputInfo">
        <CoinOutputHash />
      </div>

      <div v-else-if="this.$store.getters.HASH.kind() === responseType.Wallet">
        <Wallet :wallet="this.$store.getters.HASH" />
      </div>

      <div v-else-if="this.$store.getters.HASH.kind() === responseType.Transaction">
        <Transaction :transaction="this.$store.getters.HASH" :showOutputs="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import BlockstakeOutputHash from '../components/Outputs/BlockstakeOutputHash.vue'
import CoinOutputHash from '../components/Outputs/CoinOutputHash.vue'
import Transaction from '../components/Transactions/Transaction.vue'
import Wallet from '../components/Wallets/Wallet.vue'
import Navigation from '../components/Common/Navigation.vue'
import Search from '../components/Common/Search.vue'
import { ResponseType, TransactionType } from 'rivine-ts-types'

@Component({
  name: 'Hash',
  components: {
    BlockstakeOutputHash,
    CoinOutputHash,
    Transaction,
    Wallet,
    Navigation,
    Search
  },
  watch: {
    '$store.state.block': function () {
      this.$router.push('/block/' + this.$store.state.block.block.height)
    }
  }
})
export default class Hash extends Vue {
  loading: boolean = false
  responseType = ResponseType
  transactionType = TransactionType

  created () {
    console.log(this.$store.getters.HASH)
    if (!this.$route.params.hash) {
      this.$router.push('/')
    }
    if (!this.$store.getters.HASH.hashtype) {
      this.loading = true
      this.$store.dispatch('SET_HASH', this.$route.params.hash).then(() => {
        this.loading = false
      })
    }

    if (this.$store.getters.HASH === '') {
      this.$router.push('/notfound')
    }
  }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: auto;
  margin-top: 50px;
  text-align: center;
}
.searchBar {
  width: 80vw;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
.spinner {
  margin: "auto";
  margin-top: 50px;
  height: 500px;
}
.margin {
  margin-top: 20px;
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>
