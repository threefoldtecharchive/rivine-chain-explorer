<template>
  <v-app id="inspire">
    <Navigation />

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <HomeGrid />
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Search from '../components/Common/Search.vue'
import Navigation from '../components/Common/Navigation.vue'
import HomeGrid from './HomeGrid.vue'
import { NAME } from '../common/config'

@Component({
  components: {
    Search,
    Navigation,
    HomeGrid
  }
})
export default class Home extends Vue {}
</script>
