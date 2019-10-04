const getters = {
  /**
   * Explorer
   */
  EXPLORER: (state: any) => state.explorer.explorer,
  BLOCK: (state: any) => state.explorer.block,
  HASH: (state: any) => state.explorer.hash,
  LOADING: (state: any) => state.explorer.loading,

  /**
   * Transactions
   */
  TRANSACTIONS: (state: any) => state.transactions.transactions
}

export default getters
