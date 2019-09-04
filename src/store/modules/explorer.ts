import { API_URL } from "@/common/config";
import axios from "axios";
import router from "../../router";

const explorer = {
  state: {
    explorer: Object,
    block: Object,
    hash: Object,
    loading: Boolean(false)
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
    },
    SET_LOADING: (state: any, loading: boolean) => {
      state.loading = loading
    }
  },
  actions: {
    SET_EXPLORER: async (context: any) => {
      await axios({ method: "GET", url: API_URL + "/explorer" }).then(
        result => {
          context.commit("SET_EXPLORER", result.data);
        },
        error => {
          if (error.response.status === 400) {
            router.push("/notfound")
          }
          console.error(error);
        }
      );
    },
    SET_BLOCK_HEIGHT: async (context: any, height: Number) => {
      await axios({
        method: "GET",
        url: API_URL + "/explorer/blocks/" + height
      }).then(
        result => {
          context.commit("SET_BLOCK_HEIGHT", result.data)
        },
        error => {
          if (error.response.status === 400) {
            router.push("/notfound")
          }
          console.error(error);
        }
      );
    },
    SET_HASH: async (context: any, hash: string) => {
      if (!hash) return;
      await context.commit("SET_LOADING", true);
      await axios({
        method: "GET",
        url: API_URL + "/explorer/hashes/" + hash
      }).then(
        result => {
          switch (result.data.hashtype) {
            case "blockid":
              context.commit("SET_BLOCK_HEIGHT", result.data);
              context.commit("SET_LOADING", false);
              break;
            default:
              context.commit("SET_HASH", result.data);
              context.commit("SET_LOADING", false);
              break;
          }
        },
        error => {
          if (error.response.status === 400) {
            router.push("/notfound")
          }
          console.error(error);
        }
      );
    }
  }
};

export default explorer;
