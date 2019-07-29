<template>
  <nav class="navbar is-primary is-transparent">
    <div class="container">
      <div class="navbar-brand">
        <a href="/" class="navbar-item is-active" title="">
          <img src="" alt="TF chain explorer" />
        </a>
        <span class="navbar-burger burger">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a href="/" class="navbar-item is-active">
            Home
          </a>
          <a href="/blocks" class="navbar-item">
            Blocks
          </a>
          <a href="/transactions" class="navbar-item">
            Transactions
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Search from "@/components/Search.vue";

@Component({
  components: {
    Search
  },
  props: {
    name: String
  }
})
export default class Navigation extends Vue {}
</script>
