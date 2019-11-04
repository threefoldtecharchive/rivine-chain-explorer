<template>
  <div class="container">
    <BlockCreatorWallet :wallet="wallet" v-if="wallet.isBlockCreator"/>
    <DefaultWallet :wallet="wallet" v-else/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TransactionType } from 'rivine-ts-types'
import { PRECISION, UNIT } from '../../common/config'
import BlockCreatorWallet from './BlockCreatorWallet.vue'
import DefaultWallet from './DefaultWallet.vue'

export default {
  data () {
    return {
      transactionType: TransactionType
    }
  },
  props: ['wallet'],
  components: {
    BlockCreatorWallet,
    DefaultWallet
  },
  name: 'wallet'
}
</script>