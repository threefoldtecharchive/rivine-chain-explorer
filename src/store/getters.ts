const getters = {
  /**
   * Explorer
   */
  EXPLORER: state => state.explorer.explorer,
  BLOCK: state => state.explorer.block,
  HASH: state => state.explorer.hash,

  /**
   * Transactions
   */
  TRANSACTIONS: state => state.transactions.transactions
};

export default getters;
