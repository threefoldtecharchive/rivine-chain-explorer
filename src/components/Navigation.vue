<template>
  <div>
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand>{{ name }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <search :name="name" />
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Search from "@/components/Search.vue";

@Component({
  components: {
    Search
  },
  props: {
    name: String
  }
})
export default class Navigation extends Vue {}
</script>
