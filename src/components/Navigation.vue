<template>
    <div id="nav">
      <router-link to="/"></router-link> |
      <router-link to="/blocks">Blocks</router-link>
      <router-link to="/Transactions">Transactions</router-link>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Navigation extends Vue {}
</script>
