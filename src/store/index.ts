import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_URL } from "@/common/config";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
      explorer: Array,
      blocks: [] as any,
      block: Object,
      transactions: Array
  },
  mutations: {
    SET_EXPLORER: (state, explorer) => {
      state.explorer = explorer;
    },
    SET_BLOCK_HEIGHT: (state, block) => {
      state.block = block;
    },
    ADD_BLOCK: (state, blockObject) => {
      state.blocks.push(blockObject.block)
    },
    REFRESH_BLOCKS: (state) => {
      state.blocks = []
    }
  },
  actions: {
    SET_EXPLORER: async ({ commit }) => {
      await axios({ method: "GET", url: API_URL + "/explorer"}).then(result => {
        commit("SET_EXPLORER", result.data);
      }, error => {
        console.error(error);
      })
    },
    SET_BLOCK_HEIGHT: async ({ commit }, height) => {

      await axios({ method: "GET", url: API_URL + "/explorer/blocks/" + height}).then(result => {
        commit("SET_BLOCK_HEIGHT", result.data);
      }, error => {
        console.error(error);
      })
    },
    GET_BLOCKS: async ({ commit, state }) => {
      const maxHeight = state.explorer.height;
      for (let i = 0 ; i <= (maxHeight <= 20 ? maxHeight : 20); i++) {
          await axios({ method: "GET", url: API_URL + "/explorer/blocks/" + (maxHeight - i)}).then(result => {
              commit("ADD_BLOCK", result.data);
          }, error => {
              console.error(error);
          })
      }
    },
      REFRESH_BLOCKS: async ({ commit }) => {
        commit("REFRESH_BLOCKS")
      }
  },
  getters: {
    EXPLORER: (state) => {
      return state.explorer;
    },
    BLOCK: (state) => {
      return state.block;
    },
    BLOCKS: (state => {
      return state.blocks
    })
  }
});
