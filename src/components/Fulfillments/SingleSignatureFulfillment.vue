<template>
  <table class="ui celled table">
    <thead>
      <tr>
        <th colspan="3">Fulfillment</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Type</td>
        <td>{{ fulfillment.type }}</td>
      </tr>
      <tr>
        <td>Publickey</td>
        <td>{{ fulfillment.publicKey }}</td>
      </tr>
      <tr>
        <td>Signature</td>
        <td>{{ fulfillment.signature }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
export default {
  props: ['fulfillment']
}
</script>