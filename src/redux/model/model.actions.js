import {
  GET_MODELS,
  SET_MODELS,
  SET_MODEL_LOADING,
  DELETE_MODEL,
  ADD_MODEL,
  GET_MODEL,
  SET_MODEL,
  UPDATE_MODEL,
  SET_MODEL_ERROR,
  SET_MODELS_CURRENT_PAGE,
  SET_MODELS_PER_PAGE,
  SET_MODELS_PAGES_COUNT,
  REMOVE_MODEL_FROM_STORE
} from './model.types';

export const setModels = (payload) => ({
  type: SET_MODELS,
  payload
});

export const setModelsCurrentPage = (payload) => ({
  type: SET_MODELS_CURRENT_PAGE,
  payload
});

export const setModelsPerPage = (payload) => ({
  type: SET_MODELS_PER_PAGE,
  payload
});

export const setPagesCount = (payload) => ({
  type: SET_MODELS_PAGES_COUNT,
  payload
});

export const getModels = (payload) => ({
  type: GET_MODELS,
  payload
});

export const deleteModel = (payload) => ({
  type: DELETE_MODEL,
  payload
});

export const addModel = (payload) => ({
  type: ADD_MODEL,
  payload
});

export const setModelLoading = (payload) => ({
  type: SET_MODEL_LOADING,
  payload
});

export const updateModel = (payload) => ({
  type: UPDATE_MODEL,
  payload
});

export const setModel = (payload) => ({
  type: SET_MODEL,
  payload
});

export const getModel = (payload) => ({
  type: GET_MODEL,
  payload
});

export const setModelError = (payload) => ({
  type: SET_MODEL_ERROR,
  payload
});

export const removeModelFromStore = (payload) => ({
  type: REMOVE_MODEL_FROM_STORE,
  payload
});
