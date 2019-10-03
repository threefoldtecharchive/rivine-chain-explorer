<template>
  <div class="container">
    <div v-if="transaction.getTransactionType() === transactionType.DefaultTransaction">
      <DefaultTransaction :transaction="transaction" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { TransactionType } from "rivine-ts-types";
import { PRECISION, UNIT } from "../../common/config";
import DefaultTransaction from "./DefaultTransaction.vue";

export default {
  data () {
    return {
      transactionType: TransactionType
    }
  },
  props: ["transaction"],
  components: {
    DefaultTransaction
  },
  name: "Transaction"
}
</script>