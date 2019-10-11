<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">Miner Payout</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Previous Block Id</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(output.blockId)"
          >{{ output.blockId }}</td>
        </tr>
        <tr>
          <td>Miner Payout Id</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(output.id)"
          >{{ output.id }}</td>
        </tr>
        <tr>
          <td>Payout Address</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(output.unlockhash)"
          >{{ output.unlockhash }}</td>
        </tr>
        <tr>
          <td>Value</td>
          <td>{{ renderValue(output.value) }}</td>
        </tr>
        <tr>
          <td>Has been spent</td>
          <td>{{ output.spent ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UnlockhashCondition, Currency } from 'rivine-ts-types'
import { PRECISION, UNIT } from '../../common/config'
import Condition from '../Conditions/Condition.vue'

@Component({
  props: ['output'],
  name: 'MinerPayoutOutput',
  components: {
    Condition
  },
  methods: {
    routeToHashPage: function (val) {
      this.$store.dispatch('SET_HASH', val)
      this.$router.push('/hashes/' + val)
    },
    renderValue: function (value: any) {
      return `${value} ${UNIT}`
    }
  }
})
export default class MinerOutput extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>