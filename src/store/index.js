import Vuex from 'vuex';
import manager from './manager';

const store = new Vuex.Store({
  modules: {
    manager,
  },
});

export default store;
