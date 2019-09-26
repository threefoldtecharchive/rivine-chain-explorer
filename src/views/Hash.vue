<template lang="html">
  <div>
    <navigation />

    <div class="searchBar">
      <Search category="hash" description="Hash" />
    </div>

    <div
      class="ui segment container spinner"
      v-if="this.$store.getters.LOADING"
    >
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading</div>
      </div>
      <p></p>
    </div>

    <div v-else-if="this.$store.getters.HASH.kind() === responseType.BlockstakeOutputInfo">
      <BlockstakeOutputHash />
    </div>

    <div v-else-if="this.$store.getters.HASH.kind() === responseType.CoinOutputInfo">
      <CoinOutputHash />
    </div>

    <div v-else-if="this.$store.getters.HASH.hashtype === 'unlockhash'">
      <UnlockHash />
    </div>

    <div v-else-if="this.$store.getters.HASH.hashtype === 'transactionid'">
      <TransactionIdHash />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BlockstakeOutputHash from "./HashTypes/BlockstakeOutputHash.vue";
import CoinOutputHash from "./HashTypes/CoinOutputHash.vue";
import UnlockHash from "./HashTypes/UnlockHash.vue";
import TransactionIdHash from "./HashTypes/TransactionIdHash.vue";
import Navigation from "../components/Navigation.vue";
import Search from "../components/Search.vue";
import { ResponseType } from "rivine-ts-types/lib/types"

@Component({
  name: "Hash",
  components: {
    BlockstakeOutputHash,
    CoinOutputHash,
    UnlockHash,
    TransactionIdHash,
    Navigation,
    Search
  },
  watch: {
    "$store.state.block": function() {
      this.$router.push("/block/" + this.$store.state.block.block.height);
    }
  }
})
export default class Hash extends Vue {
  loading: boolean = false;
  responseType = ResponseType;

  created() {
    if (!this.$route.params.hash) {
      this.$router.push("/");
    }
    if (!this.$store.getters.HASH.hashtype) {
      this.loading = true;
      this.$store.dispatch("SET_HASH", this.$route.params.hash).then(() => {
        this.loading = false;
      });
    }

    if (this.$store.getters.HASH === "") {
      this.$router.push("/notfound");
    }
  }
}
</script>
<style scoped>
.container {
  width: 80%;
  margin: auto;
  margin-top: 50px;
  text-align: center;
}
.searchBar {
  width: 80vw;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
}
.spinner {
  margin: "auto";
  margin-top: 50px;
  height: 500px;
}
.tx-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
.clickable {
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
.container h1 {
  text-align: left;
  font-size: 30px;
}
</style>
