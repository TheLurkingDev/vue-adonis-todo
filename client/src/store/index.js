import createPersistedState from 'vuex-persistedstate';

import Vue from 'vue';
import Vuex from 'vuex';

import authentication from './authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    baseUrl: '/api',
  },
  modules: {
    authentication, // Allows this to be accessed from action and mutations within Vue components.
  },
  mutations: {

  },
  actions: {

  },
  plugins: [
    createPersistedState(),
  ],
});
