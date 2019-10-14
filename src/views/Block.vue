<template>
  <div>
    <navigation />
    <Search category="block" description="Block Heights" class="searchBar" />
    <Block :block="this.$store.getters.BLOCK" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navigation from '../components/Common/Navigation.vue'
import Search from '../components/Common/Search.vue'
import Block from '../components/Blocks/Block.vue'

@Component({
  components: {
    Navigation,
    Search,
    Block
  }
})
export default class Blocks extends Vue {
  created () {
    window.scrollTo(0, 0)
    this.$store.dispatch('SET_EXPLORER')
  }

  beforeCreate () {
    const { height } = this.$route.params
    if (height) {
      this.$store.dispatch('SET_BLOCK_HEIGHT', height)
    }
  }
}
</script>
<style scoped>
.searchBar {
  width: 80vw;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
</style>
