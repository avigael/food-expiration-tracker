import {
  ADD_ITEM,
  EDIT_ITEM,
  DELETE_ITEM,
  UPDATE_SETTINGS,
  CHANGE_THEME,
} from "./types";
import { lightTheme } from "../assets/theme";

const initialState = {
  itemList: [],
  settings: {
    darkMode: false,
    notification: true,
    threshold: 4,
  },
  theme: lightTheme,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        itemList: state.itemList.concat({
          key: Math.random(),
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
      };
    case DELETE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.key !== action.key),
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        settings: {
          darkMode: action.data.darkMode,
          notification: action.data.notification,
          threshold: action.data.threshold,
        },
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.data,
      };
    default:
      return state;
  }
};

export default itemReducer;
