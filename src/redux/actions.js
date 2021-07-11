import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from "./types";

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
