<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
        sm="4"
      >
        <!-- <v-card
          v-if="n === 1"
          class="pa-2"
          outlined
          tile
        > -->
          <LatestBlock v-if="n === 2"/>
        <!-- </v-card> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LatestBlock from '../components/Blocks/LatestBlock.vue'

@Component({
  components: {
    LatestBlock
  }
})
export default class HomeGrid extends Vue {}
</script>