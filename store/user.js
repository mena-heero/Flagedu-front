import { USERS_ENDPOINT } from "~/utils/store/endpoints";
import {
  SIGNIN,
  SIGNUP,
  GOOGLE_SIGNUP,
  FACEBOOK_SIGNUP,
  PROFILE,
  GET_SIGNUP_DATA_FROM_LOCAL_STORAGE,
  SEND_VERIFICATION_CODE,
  VERIFICATION_CONFIRM,
  VERIFY_CODE_FOR_FORGET_PASSWORD,
  FORGET_PASSWORD,
  DELETE_PROFILE,
  GET_TOKEN_FROM_LOCAL_STORE,
  CHANGE_PASSWORD,
  CHANGE_PROFILE,
  CHANGE_PROFILE_IMAGE,
  COMPLETE_SOCIAL_SIGNUP,
  SOCIAL_AUTH_VERIFY_CONFIRM,
} from "../utils/store/action.names";
import {
  SET_TOKEN_ERROR,
  SET_TOKEN,
  SET_PROFILE,
  SET_SIGNUP_DATA,
} from "../utils/store/mutation.names";
import {
  GET_SIGNUP_DATA,
  GET_PROFILE,
  GET_AUTH_HEADER,
  GET_TOKEN,
} from "../utils/store/getter.names";

import { NS_USER } from "~/utils/store/namespace.names";
import { namespaced, buildParams } from "../utils/utils";

export const state = () => ({
  user: {
    token: null,
    profile: null,
  },
  signUpData: null,
  error: false,
});

export const getters = {
  [GET_SIGNUP_DATA](state) {
    return state.signUpData;
  },
  [GET_PROFILE](state) {
    return state.user.profile;
  },
  [GET_TOKEN](state) {
    return state.user.token;
  },
  [GET_AUTH_HEADER](state) {
    if (state.user.token == null) return null;
    return { Authorization: `Token ${state.user.token}` };
  },
};

export const actions = {
  async [SIGNIN]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/signin/`, payload)
        .then(({ data }) => {
          if (!payload.type) {
            commit(SET_TOKEN, data.token);
            commit(SET_PROFILE, data);
          }
          resolve(data);
        })
        .catch((e) => {
          if (!payload.type) {
            commit(SET_TOKEN_ERROR);
          }
          console.log(e);
          reject(e);
        });
    });
  },
  async [GET_TOKEN_FROM_LOCAL_STORE]({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      const localToken = this.$cookies.get("ALLTARGETING_TOKEN");
      if (localToken != null) {
        commit(SET_TOKEN, localToken);
        resolve(localToken);
      } else {
        console.log("TOKEN FROM LOCAL STORE ERROR");
        reject();
      }
    });
  },
  async [PROFILE]({ commit, getters }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`${USERS_ENDPOINT}/profile/`, {
          headers: {
            ...getters[GET_AUTH_HEADER],
          },
        })
        .then(({ data }) => {
          commit(SET_PROFILE, data);
          resolve(data);
        })
        .catch((e) => {
          commit(SET_TOKEN_ERROR);
          console.log(e);
          reject(e);
        });
    });
  },

  async [GOOGLE_SIGNUP]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/google_signup/`, payload)
        .then(({ data }) => {
          if (data.phone && data.country) {
            commit(SET_TOKEN, data.token);
            commit(SET_PROFILE, data);
          }
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  async [FACEBOOK_SIGNUP]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/facebook_signup/`, payload)
        .then(({ data }) => {
          console.log(data);
          if (data.signin_status == true) {
            commit(SET_TOKEN, data.user.token);
            commit(SET_PROFILE, data.user);
          }
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  async [COMPLETE_SOCIAL_SIGNUP]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/complete_social_signup/`, payload)
        .then(({ data }) => {
          if (data.auth_type == 1) {
            commit(SET_TOKEN, data.token);
            commit(SET_PROFILE, data);
          }
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  async [SOCIAL_AUTH_VERIFY_CONFIRM]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/social_auth_verify_confirm/`, payload)
        .then(({ data }) => {
          commit(SET_TOKEN, data.token);
          commit(SET_PROFILE, data);
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },

  async [SIGNUP]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/signup/`, payload)
        .then(({ data }) => {
          commit(SET_SIGNUP_DATA, JSON.stringify(payload));
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    });
  },
  async [GET_SIGNUP_DATA_FROM_LOCAL_STORAGE]({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      var localData = localStorage.getItem("ALLTARGETING_SIGNUP_DATA");
      if (localData != null) {
        commit(SET_SIGNUP_DATA, localData);
        resolve();
      } else {
        localData = null;
        commit(SET_SIGNUP_DATA, localData);
        reject();
      }
    });
  },
  async [SEND_VERIFICATION_CODE]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/send_verification_code/`, payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [VERIFICATION_CONFIRM]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/verify_code/`, payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e.response);
          reject(e);
        });
    });
  },
  async [VERIFY_CODE_FOR_FORGET_PASSWORD]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/verify_code_for_forget_password/`, payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [FORGET_PASSWORD]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/forget_password/`, payload)
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  },
  async [DELETE_PROFILE]({ commit, dispatch, getters }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`${USERS_ENDPOINT}/profile/`, {
          headers: {
            ...getters[GET_AUTH_HEADER],
          },
          data: payload,
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

  async [CHANGE_PASSWORD]({ commit, dispatch, getters }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/change_password/`, payload, {
          headers: {
            ...getters[GET_AUTH_HEADER],
          },
        })
        .then(({ data }) => {
          resolve(data);
        })
        .catch((e) => {
          // console.log("password_change_error", e);
          reject(e);
        });
    });
  },
  async [CHANGE_PROFILE_IMAGE]({ commit, dispatch, getters }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`${USERS_ENDPOINT}/upload_profile_image/`, payload, {
          headers: {
            ...getters[GET_AUTH_HEADER],
          },
        })
        .then(({ data }) => {
          resolve(data);
          dispatch(PROFILE);
        })
        .catch((e) => {
          // console.log("profile image update error", e);
          reject(e);
        });
    });
  },
  async [CHANGE_PROFILE]({ commit, dispatch, getters }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .patch(`${USERS_ENDPOINT}/profile/`, payload, {
          headers: {
            ...getters[GET_AUTH_HEADER],
          },
        })
        .then(({ data }) => {
          resolve(data);
          dispatch(PROFILE);
        })
        .catch((e) => {
          // console.log("profile update error", e);
          reject(e);
        });
    });
  },
};

export const mutations = {
  [SET_SIGNUP_DATA](state, data) {
    state.signUpData = JSON.parse(data);
    localStorage.setItem("ALLTARGETING_SIGNUP_DATA", data);
  },
  [SET_TOKEN](state, token) {
    state.user.token = token;
    state.error = false;
    this.$cookies.set("ALLTARGETING_TOKEN", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  },
  [SET_TOKEN_ERROR](state) {
    state.user.token = null;
    state.user.profile = null;
    state.error = true;
    this.$cookies.remove("ALLTARGETING_TOKEN");
  },
  [SET_PROFILE](state, data) {
    state.user.profile = data;
  },
};
