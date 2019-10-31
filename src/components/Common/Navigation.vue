<template>
  <Fragment>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item
          link
          v-for="(item, i) in items"
          :key="i"
          :href="item.link"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Explorer</v-toolbar-title>
      <div class="right">
        <v-container fluid>
          <v-switch v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"></v-switch>
        </v-container>
      </div>

    </v-app-bar> -->
    <v-app-bar
      color="deep-purple accent-4"
      dark
      app
      clipped-left
    >
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Explorer</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon v-if="dark">
        <v-icon v-on:click="someHandler">mdi-white-balance-sunny</v-icon>
      </v-btn>
      <v-btn icon v-else>
        <v-icon v-on:click="someHandler">mdi-moon-waning-crescent</v-icon>
      </v-btn>
    </v-app-bar>
  </Fragment>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Search from './Search.vue'
const { Slide } = require('vue-burger-menu')
import { Fragment } from 'vue-fragment'

@Component({
  components: {
    Search,
    Slide,
    Fragment
  },
  props: {
    name: String
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Home', icon: 'mdi-home', text: 'Home', link: '/' },
        { title: 'Transactions', icon: 'mdi-swap-horizontal', text: 'Transactions', link: '/transactions' },
        { title: 'Charts', icon: 'mdi-chart-line-variant', text: 'Charts', link: '/charts' }
      ],
      mini: true,
      dark: true
    }
  },
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    someHandler () {
      this.$vuetify.theme.dark = !this.dark
      this.dark = !this.dark
    }
  }
})
export default class Navigation extends Vue {}
</script>
<style scoped>
@media screen and (min-width: 768px) {
  .slider {
    display: none !important;
  }
}

@media screen and (max-width: 768px) {
  .menu {
    display: none !important;
  }
}
.right {
  float: right;
}
.toggle {
  margin-top: 10px;
}
</style>
