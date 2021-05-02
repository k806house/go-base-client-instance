import {GET_PROFILE, GET_PROFILE_BY_ID, SET_LIDERS, GET_SGF, GET_FULL_LOG, GET_LIDERS, GET_GAME_INFO} from "./types";

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileById = (id) => ({
  type: GET_PROFILE_BY_ID,
  payload: {id}
});

export const getSgf = (id) => ({
  type: GET_SGF,
  payload: {id}
});

export const getFullLog = (id) => ({
  type: GET_FULL_LOG,
  payload: {id}
});

export const getLiders = () => ({
  type: GET_LIDERS
});

export const getGameInfo = (game_id) => ({
  type: GET_GAME_INFO,
  payload: { game_id }
});
