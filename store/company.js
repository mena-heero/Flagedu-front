import { COMPANY_ENDPOINT } from "~/utils/store/endpoints";
import { FETCH_COMPANY } from "../utils/store/action.names";
import {} from "../utils/store/mutation.names";
import {} from "../utils/store/getter.names";

import { NS_AUTH } from "~/utils/store/namespace.names";
import { namespaced, buildParams } from "../utils/utils";

export const state = () => ({});

export const getters = {};

export const actions = {
  async [FETCH_COMPANY]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${COMPANY_ENDPOINT}/${buildParams(payload)}`)
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

export const mutations = {};
