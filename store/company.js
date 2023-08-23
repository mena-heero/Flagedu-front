import {
  COMPANY_ENDPOINT,
  RATING_ENDPOINT,
  FIND_BROKER_COMPANY_ENDPOINT,
  FETCH_COMPANY_FINDER_RATING_ENDPOINT,
  SAVED_TOPIC_ENDPOINT,
} from "~/utils/store/endpoints";
import {
  FETCH_COMPANY,
  ADD_RATING,
  FETCH_RATING,
  FETCH_FIND_BROKER_COMPANY,
  FETCH_COMPANY_DETAIL,
  FETCH_COMPANY_FINDER_RATING,
  ADD_SAVED_TOPIC,
  DELETE_SAVED_TOPIC,
  FETCH_SAVED_TOPIC,
  CHECK_SAVED_TOPIC_EXISTS,
} from "../utils/store/action.names";
import {} from "../utils/store/mutation.names";
import { GET_AUTH_HEADER } from "../utils/store/getter.names";

import { NS_USER } from "~/utils/store/namespace.names";
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
  async [ADD_RATING]({ commit, dispatch, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const authHeader = rootGetters[namespaced(NS_USER, GET_AUTH_HEADER)];

      this.$axios
        .post(`${RATING_ENDPOINT}/`, payload, {
          headers: {
            ...authHeader,
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FETCH_RATING]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${RATING_ENDPOINT}/${buildParams(payload)}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FETCH_FIND_BROKER_COMPANY]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${FIND_BROKER_COMPANY_ENDPOINT}/${buildParams(payload)}`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FETCH_COMPANY_FINDER_RATING]({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${FETCH_COMPANY_FINDER_RATING_ENDPOINT}/`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FETCH_COMPANY_DETAIL]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${FIND_BROKER_COMPANY_ENDPOINT}/${payload.id}/`)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [ADD_SAVED_TOPIC]({ commit, dispatch, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const authHeader = rootGetters[namespaced(NS_USER, GET_AUTH_HEADER)];

      this.$axios
        .post(`${SAVED_TOPIC_ENDPOINT}`, payload, {
          headers: {
            ...authHeader,
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [CHECK_SAVED_TOPIC_EXISTS]({ commit, dispatch, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const authHeader = rootGetters[namespaced(NS_USER, GET_AUTH_HEADER)];

      this.$axios
        .get(`${SAVED_TOPIC_ENDPOINT}is_exists/${buildParams(payload)}`, {
          headers: {
            ...authHeader,
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [DELETE_SAVED_TOPIC]({ commit, dispatch, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const authHeader = rootGetters[namespaced(NS_USER, GET_AUTH_HEADER)];

      this.$axios
        .delete(`${SAVED_TOPIC_ENDPOINT}${payload.id}/`, {
          headers: {
            ...authHeader,
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FETCH_SAVED_TOPIC]({ commit, dispatch, rootGetters }, payload) {
    return new Promise((resolve, reject) => {
      const authHeader = rootGetters[namespaced(NS_USER, GET_AUTH_HEADER)];

      this.$axios
        .get(`${SAVED_TOPIC_ENDPOINT}${buildParams(payload)}`, {
          headers: {
            ...authHeader,
          },
        })
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
