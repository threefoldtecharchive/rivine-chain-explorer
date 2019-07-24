import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"; //or vue-resource

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
      explorer: [],
      blocks: [],
      transactions:[] 
  },
  mutations: {
      loadExplorer (state) {
        axios({ method: "GET", url: "https://explorer.testnet.threefoldtoken.com/explorer"}).then(result => {
          state.explorer = result.data;
        }, error => {
          console.error(error);
        })
      },
      loadBlocks (state, payload) {
        console.log(payload.heigth);
        axios({ method: "GET", url: "https://explorer.testnet.threefoldtoken.com/blocks/" + payload.heigth}).then(result => {
          state.explorer = result.data;
        }, error => {
          console.error(error);
        })
      },
  },
  getters: {
    getExplorer: state => {
      return state.explorer;
    }
  }
});