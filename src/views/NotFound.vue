<template>
  <div>
    <navigation />
    <div class="container">
      <div class="notfound">
        <p>Hash or Block is not found</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Navigation from '../components/Common/Navigation.vue'

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
<style scoped>
.container {
  width: 80%;
  margin: "auto";
}
.notfound {
  margin-top: 200px;
  text-align: center;
}
</style>
