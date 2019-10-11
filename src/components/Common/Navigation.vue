<template>
  <div>
    <!-- Following Menu -->
    <div class="ui large top fixed menu inverted">
      <div class="left menu">
        <a class="item" href="/">Home</a>
      </div>
      <div class="right menu">
        <div class="item">
          <a class="ui secondary button" href="/transactions">Transactions</a>
        </div>
        <div class="item">
          <a class="ui secondary button" href="/charts">Charts</a>
        </div>
      </div>
    </div>
    <Slide class="slider">
      <a id="home" href="/">
        <span> <i class="home icon"></i>Home </span>
      </a>
      <a id="transaction" href="/transactions">
        <span> <i class="down arrow icon"></i>Transactions </span>
      </a>
      <a id="charts" href="/charts">
        <span><i class="chart line icon"></i>Charts</span>
      </a>
    </Slide>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Search from './Search.vue'
const { Slide } = require('vue-burger-menu')

@Component({
  components: {
    Search,
    Slide
  },
  props: {
    name: String
  }
})
export default class Navigation extends Vue {}
</script>
<style scoped>
@media screen and (min-width: 768px) {
  .slider {
    display: none !important;
  }
}

@media screen and (max-width: 768px) {
  .menu {
    display: none !important;
  }
}
</style>
