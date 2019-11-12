<template lang="html">
  <div>
    <navigation />

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <HashGql />
      </v-container>
    </v-content>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import HashGql from '../components/Hashes/HashGql.vue'
import Navigation from '../components/Common/Navigation.vue'
import Search from '../components/Common/Search.vue'
import Fragment from 'vue-fragment'
import { ResponseType, TransactionType } from 'rivine-ts-types'
import { OutputType } from '../graphql/outputTypes'

@Component({
  name: 'Hash',
  components: {
    HashGql,
    Navigation,
    Search,
    Fragment
  }
})
export default class Hash extends Vue {}
</script>
