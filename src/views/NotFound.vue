<template>
  <navigation />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Navigation
  },
  props: {
    name: String
  }
})
export default class NotFound extends Vue {}
</script>
