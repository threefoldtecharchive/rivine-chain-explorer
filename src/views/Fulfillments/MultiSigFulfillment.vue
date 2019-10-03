<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th colspan="3">Multi Signature Fulfillment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Type</td>
        <td>{{ fulfillment.type }}</td>
      </tr>
      <div v-for="(keypair, index) in fulfillment.pairs" v-bind:key="index">
        <tr>
          <td>Publickey #{{ index + 1 }}</td>
          <td>{{ keypair.publickey }}</td>
        </tr>
        <tr>
          <td>Signature #{{ index + 1 }}</td>
          <td>{{ keypair.signature }}</td>
        </tr>
      </div>
    </tbody>
  </table>
</template>
<script lang="ts">
export default {
  props: ["fulfillment"]
}
</script>