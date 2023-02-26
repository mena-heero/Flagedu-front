import { SETTINGS_ENDPOINT, STORY_ENDPOINT } from "~/utils/store/endpoints";
import { FETCH_SETTINGS, FETCH_STORY } from "../utils/store/action.names";
import { SET_SETTINGS } from "../utils/store/mutation.names";
import {
  GET_MAINMENU,
  GET_GLOBAL_SETTINGS,
  GET_SOCIAL_SETTINGS,
} from "../utils/store/getter.names";

import { NS_AUTH } from "~/utils/store/namespace.names";
import { namespaced, buildParams } from "../utils/utils";

export const state = () => ({
  mainmenu: null,
  settings: null,
  social: null,
});

export const getters = {
  [GET_MAINMENU](state) {
    return state.mainmenu;
  },
  [GET_GLOBAL_SETTINGS](state) {
    return state.settings;
  },
  [GET_SOCIAL_SETTINGS](state) {
    return state.social;
  },
};

export const actions = {
  async [FETCH_SETTINGS]({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${SETTINGS_ENDPOINT}/all/`)
        .then(({ data }) => {
          commit(SET_SETTINGS, data);
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FETCH_STORY]({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${STORY_ENDPOINT}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
};

export const mutations = {
  [SET_SETTINGS](state, data) {
    state.settings = data.settings;
    state.social = data.social;
    state.mainmenu = data.mainmenu;
  },
};
