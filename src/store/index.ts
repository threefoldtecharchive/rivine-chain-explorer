import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_URL } from "../common/config";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
      explorer: Array,
      block: Array,
      transactions: Array 
  },
  mutations: {
    SET_EXPLORER: (state, explorer) => {
      state.explorer = explorer;
    },
    SET_BLOCK_HEIGHT: (state, block) => {
      state.block = block;
    }
  },
  actions: {
    SET_EXPLORER: async (context) => {
      await axios({ method: "GET", url: API_URL + "/explorer"}).then(result => {
        context.commit("SET_EXPLORER", result.data);
      }, error => {
        console.error(error);
      })
    },
    SET_BLOCK_HEIGHT: async (context, height) => {
      await axios({ method: "GET", url: API_URL + "/explorer/blocks/" + height}).then(result => {
        context.commit("SET_BLOCK_HEIGHT", result.data);
      }, error => {
        console.error(error);
      })
    }
  },
  getters: {
    EXPLORER: state => {
      return state.explorer;
    },
    BLOCK: state => {
      return state.block;
    }
  }
});
