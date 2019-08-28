<template lang="html">
  <div>
    <hashes />

    <div v-if="this.$store.getters.HASH.hashtype === 'blockstakeoutputid'">
      <BlockstakeOutputHash />
    </div>

    <div v-else-if="this.$store.getters.HASH.hashtype === 'coinoutputid'">
      <CoinOutputHash />
    </div>

    <div v-else-if="this.$store.getters.HASH.hashtype === 'unlockhash'">
      <UnlockHash />
    </div>

    <div v-else-if="this.$store.getters.HASH.hashtype === 'transactionid'">
      <TransactionIdHash />
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import Hashes from './Hashes.vue'
import BlockstakeOutputHash from './HashTypes/BlockstakeOutputHash.vue'
import CoinOutputHash from './HashTypes/CoinOutputHash.vue'
import UnlockHash from './HashTypes/UnlockHash.vue'
import TransactionIdHash from './HashTypes/TransactionIdHash.vue'

@Component({
  name: 'Hash',
  components: {
    Hashes,
    BlockstakeOutputHash,
    CoinOutputHash,
    UnlockHash,
    TransactionIdHash
  },
  watch: {
    '$store.state.block': function() {
      this.$router.push("/block/" + this.$store.state.block.block.height)
    }
  }
})

export default class Hash extends Vue{}

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
