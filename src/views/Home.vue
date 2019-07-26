<template>
  <div class="wrapper">
    <div class="ui center aligned basic segment">
      <search />
    </div>
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
export default class Home extends Vue {
  SearchVal: string = "";
}
</script>
