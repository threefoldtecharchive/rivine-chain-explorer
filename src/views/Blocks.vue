<template>
  <div>
    <navigation name="Blocks" />
    <p>Current Block: {{ this.$store.getters.EXPLORER.height }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Navigation
  }
})
export default class Blocks extends Vue {
  created() {
    this.$store.dispatch("SET_EXPLORER")
  }
}
</script>
