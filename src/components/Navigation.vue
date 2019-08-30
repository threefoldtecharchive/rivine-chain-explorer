<template>
  <!-- Following Menu -->
  <div>
    <div class="ui large top fixed menu inverted">
      <div class="left menu">
        <a class="item" href="/">Home</a>
      </div>
      <div class="right menu">
        <div class="item">
          <a class="ui secondary button" href="/transactions">Transactions</a>
        </div>
        <div class="item">
          <a class="ui secondary button" href="/blocks">Blocks</a>
        </div>
        <div class="item">
          <a class="ui secondary button" href="/charts">Charts</a>
        </div>
      </div>
    </div>

  </div>
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
