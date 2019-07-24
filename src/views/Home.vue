<template>
  <div class="home">
    <search />
    <generalStats />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@/components/Search.vue";
import GeneralStats from "@/components/GeneralStats.vue";

@Component({
  components: {
    Search,
    GeneralStats
  }
})
export default class Home extends Vue {}
</script>
