<template lang="html">
  <!-- Apollo watched Graphql query -->
  <ApolloQuery
    class="container"
    :query="query"
    :variables="{ id }"
  >
    <template slot-scope="{ result: { loading, error, data } }" >
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occured</div>

      <div v-else-if="data">
        <h1>test</h1>
      </div>

      <!-- No result -->
      <div v-else class="no-result apollo">No result :(</div>
    </template>
  </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { formatReadableDate, toLocalDecimalNotation } from '../../common/helpers'
import outputByHashQuery from '../../graphql/OutputByHash.gql'

@Component({
  name: 'Hash',
  components: {

  },
  watch: {
    '$route.params.hash' (val) {
      this.id = val
    }
  },
  methods: {
    routeToHashPage: function (val) {
      this.query = outputByHashQuery
      this.id = val
      this.$router.push('/hashes/' + val)
    },
    routeToBlockPage: function (val) {
      // this.$store.dispatch('SET_HASH', val)
      this.$router.push('/block/' + val)
    },
    formatReadableDate
  },
  data () {
    return {
      id: this.$route.params.hash,
      query: outputByHashQuery
    }
  }
})
export default class Hash extends Vue {
  blockDate = ''
  toLocalDecimalNotation = toLocalDecimalNotation

  created () {
    window.scrollTo(0, 0)
    const id = this.$route.params.hash
    debugger
    if (id.length === 64 || id.length === 78) {
      this.query = outputByHashQuery
      this.id = id
      return
    }
  }
}
</script>
<style scoped>
.table {
  text-align: left;
  margin-top: 20px;
  margin-bottom: 20px;
}
.container h2 {
  text-align: left;
  font-size: 26px;
}
</style>
