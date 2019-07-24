import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"; //or vue-resource
import { API_URL } from "../common/config";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
      explorer: [],
      blocks: [],
      transactions:[] 
  },
  mutations: {
      loadExplorer (state) {
        axios({ method: "GET", url: API_URL + "/explorer"}).then(result => {
          state.explorer = result.data;
        }, error => {
          console.error(error);
        })
      },
      loadBlocks (state) {
        console.log('stgsqqsdfssd')
        axios({ method: "GET", url: API_URL + "explorer/blocks/5"}).then(result => {
          state.blocks = result.data;
          console.log(state.blocks)
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