import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

function getCurrenciesList() {
  return axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    invert: false,
    currencies_list: [],
  },
  mutations: {
    SET_CURRENCIES: (state, data) => {
      state.currencies_list = Object.keys(data.Valute).map((key) => data.Valute[key]);
    },
    SET_INVERT(state) {
      state.invert = !state.invert;
    },
  },
  actions: {
    GET_CURRENCIES({ commit }) {
      return new Promise((resolve, reject) => {
        getCurrenciesList().then((res) => {
          commit('SET_CURRENCIES', res.data);
          resolve();
        }).catch((err) => {
          reject(err.response);
        });
      });
    },
  },
  modules: {
  },
});
