import { API_URL } from "@/common/config";
import axios from "axios";

const explorer = {
  state: {
    explorer: Object,
    block: Object,
    hash: Object
  },
  mutations: {
    SET_EXPLORER: (state: any, explorer: object) => {
      state.explorer = explorer;
    },
    SET_BLOCK_HEIGHT: (state: any, block: object) => {
      state.block = block;
    },
    SET_HASH: (state: any, hash: object) => {
      state.hash = hash;
    }
  },
  actions: {
    SET_EXPLORER: async ({ commit }) => {
      await axios({ method: "GET", url: API_URL + "/explorer" }).then(
        result => {
          commit("SET_EXPLORER", result.data);
        },
        error => {
          console.error(error);
        }
      );
    },
    SET_BLOCK_HEIGHT: async ({ commit }, height: Number) => {
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
    },
    SET_HASH: async ({ commit }, hash: string) => {
      if (!hash) return;
      await context.commit("SET_LOADING", true);
      await axios({
        method: "GET",
        url: API_URL + "/explorer/hashes/" + hash
      }).then(
        result => {
          switch (result.data.hashtype) {
            case "blockid":
              commit("SET_BLOCK_HEIGHT", result.data);
              commit("SET_LOADING", false);
              break;
            default:
              commit("SET_HASH", result.data);
              commit("SET_LOADING", false);
              break;
          }
        },
        error => {
          console.error(error);
        }
      );
    }
  }
};

export default explorer;
