<template>
  <div>
    <table class="ui celled table">
      <thead>
        <tr>
          <th colspan="3">Blockstake Output</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Block Height</td>
          <td
            class="clickable"
            v-on:click="routeToBlockPage(output.blockHeight)"
          >{{ output.blockHeight }}</td>
        </tr>
        <tr>
          <td>Transaction ID</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(output.txId)"
          >{{ output.txId }}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td
            class="clickable"
            v-on:click="routeToHashPage(output.id)"
          >{{ output.id }}</td>
        </tr>
        <Condition :condition="output.condition" />
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
import { PRECISION } from '../../common/config'
import Condition from '../Conditions/Condition.vue'

@Component({
  props: ['output'],
  name: 'BlockStakeOutput',
  components: {
    Condition
  },
  methods: {
    routeToHashPage: function (val) {
      this.$store.dispatch('SET_HASH', val)
      this.$router.push('/hashes/' + val)
    },
    routeToBlockPage: function (val) {
      this.$store.dispatch('SET_HASH', val)
    },
    renderValue: function (value: any) {
      return `${value} BS`
    }
  }
})
export default class BlockStakeOutput extends Vue {}
</script>
<style scoped>
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
</style>