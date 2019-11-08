<template>
  <div class="apollo-example">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../../graphql/LastBlock.gql')"
      :variables="{ ref }"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <v-card
          v-else-if="data"
          class="mx-auto"
          tile
        >
          <h3>Latest block</h3>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>ID : {{ data.block.Header.ID }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>ID : {{ data.block.Header.BlockHeight }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>ID : {{ data.block.Header.BlockTime }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ref: 5
    }
  },

  apollo: {

  },

  computed: {
    formValid () {
      return this.newMessage
    },
  },

  methods: {

  },
}
</script>
<style scoped>
.mx-auto {
  text-align: left;
  padding: 10px;
}
</style>
