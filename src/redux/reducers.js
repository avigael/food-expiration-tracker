import {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  UPDATE_SETTINGS,
  CHANGE_THEME,
  SEARCH_LIST,
} from "./types";
import { lightTheme } from "../assets/theme";

const initialState = {
  itemList: [],
  searchList: [],
  settings: {
    darkMode: false,
    threshold: 4,
  },
  theme: lightTheme,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      let key = Math.random();
      return {
        ...state,
        itemList: state.itemList.concat({
          key: key,
          name: action.data.name,
          date: action.data.date,
          expires: action.data.expires,
          daysLeft: action.data.daysLeft,
        }),
      };
    case EDIT_ITEM:
      return {
        ...state,
        itemList: state.itemList
          .filter((item) => item.key !== action.data.key)
          .concat({
            key: action.data.key,
            name: action.data.name,
            date: action.data.date,
            expires: action.data.expires,
            daysLeft: action.data.daysLeft,
          }),
        searchList: state.searchList
          .filter((item) => item.key !== action.data.key)
          .concat({
            key: action.data.key,
            name: action.data.name,
            date: action.data.date,
            expires: action.data.expires,
            daysLeft: action.data.daysLeft,
          }),
      };
    case DELETE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.key !== action.key),
        searchList: state.searchList.filter((item) => item.key !== action.key),
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          darkMode: action.data.darkMode,
          threshold: action.data.threshold,
        },
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.data,
      };
    case SEARCH_LIST:
      let found = false;
      let searchItems = { ...state };
      for (let i = 0; i < state.itemList.length; i++) {
        if (state.itemList[i].name === action.name) {
          searchItems.searchList = searchItems.searchList.concat({
            key: state.itemList[i].key,
            name: state.itemList[i].name,
            date: state.itemList[i].date,
            expires: state.itemList[i].expires,
            daysLeft: state.itemList[i].daysLeft,
          });
          found = true;
        }
      }
      if (!found) {
        searchItems.searchList = [];
      }
      return searchItems;
    default:
      return state;
  }
};

export default itemReducer;
