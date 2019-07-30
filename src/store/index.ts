import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_URL } from "@/common/config";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    block: Object
  },
  mutations: {
    SET_BLOCK_HEIGHT: (state, block) => {
      state.block = block;
    }
  },
  actions: {
    SET_BLOCK_HEIGHT: async ({ commit }, height) => {
      await axios({
        method: "GET",
        url: API_URL + "/explorer/blocks/" + height
      }).then(
        result => {
          commit("SET_BLOCK_HEIGHT", result.data);
        },
        error => {
          console.error(error);
        }
      );
    }
  },
  getters: {
    BLOCK: state => {
      return state.block;
    }
  }
});
