import { API_URL } from "@/common/config";
import axios from "axios";

const explorer = {
  state: {
    transactions: Array
  },
  mutations: {
    SET_TRANSACTIONS: (state: any, transactions: Array) => {
      state.transactions = transactions;
    }
  },
  actions: {
    SET_TRANSACTIONS: async ({ commit }) => {
      await axios({
        method: "GET",
        url: API_URL + "/transactionpool/transactions"
      }).then(
        result => {
          commit("SET_TRANSACTIONS", result.data);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
};

export default explorer;
