import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Block from "./views/Block.vue";
import NotFound from "./views/NotFound.vue";
import Blocks from "./views/Blocks.vue";
import Hash from "./views/Hash.vue";
import transactions from './views/Transactions.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/blocks/",
      name: "blocks",
      component: Blocks
    },
    {
      path: "/transactions/",
      name: "transactions",
      component: transactions
    },
    {
      path: "/block/:block?",
      name: "block",
      component: Block
    },
    {
      path: "/hashes/:hash?",
      name: "hash",
      component: Hash
    },
    {
      path: "/notfound",
      component: NotFound
    },
    {
      path: "*",
      component: NotFound
    }
  ]
});
