import { NS_AUTH, NS_COMMON } from "~/utils/store/namespace.names";
import {
  GET_TOKEN_FROM_LOCAL_STORE,
  PROFILE,
  FETCH_SETTINGS,
} from "~/utils/store/action.names";
import { namespaced } from "~/utils/utils";

export const state = () => ({});

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch(namespaced(NS_AUTH, GET_TOKEN_FROM_LOCAL_STORE)).catch(
      (e) => {}
    );
    await dispatch(namespaced(NS_AUTH, PROFILE)).catch((e) => {});
    await dispatch(namespaced(NS_COMMON, FETCH_SETTINGS)).catch((e) => {});
  },
};
