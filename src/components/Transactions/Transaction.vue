<template>
  <div>
      <DefaultTransaction :transaction="transaction" v-if="transaction.getTransactionType() === transactionType.DefaultTransaction"/>
      <MinterDefinitionTransaction :transaction="transaction" v-if="transaction.getTransactionType() === transactionType.MinterDefinitionTransaction"/>
      <CoinCreationTransaction :transaction="transaction" v-if="transaction.getTransactionType() === transactionType.CoinCreationTransaction"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { TransactionType } from 'rivine-ts-types'
import { PRECISION, UNIT } from '../../common/config'
import DefaultTransaction from './DefaultTransaction.vue'
import MinterDefinitionTransaction from './MinterDefinitionTransaction.vue'
import CoinCreationTransaction from './CoinCreationTransaction.vue'

export default {
  data () {
    return {
      transactionType: TransactionType
    }
  },
  props: ['transaction'],
  components: {
    DefaultTransaction,
    MinterDefinitionTransaction,
    CoinCreationTransaction
  },
  name: 'Transaction'
}
</script>