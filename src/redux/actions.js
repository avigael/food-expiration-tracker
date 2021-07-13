import {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  UPDATE_SETTINGS,
  CHANGE_THEME,
} from "./types";

export const addItem = (item) => ({
  type: ADD_ITEM,
  data: item,
});

export const editItem = (item) => ({
  type: EDIT_ITEM,
  data: item,
});

export const deleteItem = (key) => ({
  type: DELETE_ITEM,
  key: key,
});

export const updateSettings = (settings) => ({
  type: UPDATE_SETTINGS,
  data: settings,
});

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  data: theme,
});
