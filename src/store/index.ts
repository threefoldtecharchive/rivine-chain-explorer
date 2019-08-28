import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { API_URL } from "../common/config";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    explorer: Object,
    block: Object,
    transactions: Array,
    hash: Object
  },
  mutations: {
    SET_EXPLORER: (state, explorer) => {
      state.explorer = explorer;
    },
    SET_BLOCK_HEIGHT: (state, block) => {
      state.block = block;
    },
    SET_HASH: (state, hash) => {
      state.hash = hash;
    },
    SET_TRANSACTIONS: (state, transactions) => {
      state.transactions = transactions;
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
    },
    SET_HASH: async (context, hash) => {
      await axios({ method: "GET", url: API_URL + "/explorer/hashes/" + hash}).then(result => {
        switch (result.data.hashtype) {
          case 'blockid':
            context.commit("SET_BLOCK_HEIGHT", result.data);
            break
          default:
            context.commit("SET_HASH", result.data);
            break
        }
      }, error => {
        console.error(error);
      })
    },
    SET_TRANSACTIONS: async (context) => {
      await axios({ method: "GET", url: API_URL + "/transactionpool/transactions"}).then(result => {
        context.commit("SET_TRANSACTIONS", result.data);
      }, error => {
        console.error(error);
      })
    },
  },
  getters: {
    EXPLORER: state => {
      return state.explorer;
    },
    BLOCK: state => {
      return state.block;
    },
    HASH: state => {
      return state.hash;
    },
    TRANSACTIONS: state => {
      return state.transactions;
    }
  }
});
