<template>
  <section>
    <navigation />
    <div class="hero is-fullheight-with-navbar is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Tf chain explorer
          </h1>
          <search />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Search from "@/components/Search.vue";
import Navigation from "@/components/Navigation.vue";

@Component({
  components: {
    Search,
    Navigation
  }
})
export default class Home extends Vue {
  SearchVal: string = "";
}
</script>
