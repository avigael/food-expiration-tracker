import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM } from "./types";

const initialState = {
  itemList: [],
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
          daysLeft: 0,
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
            daysLeft: 0,
          }),
      };
    case DELETE_ITEM:
      return {
        ...state,
        itemList: state.itemList.filter((item) => item.key !== action.key),
      };
    default:
      return state;
  }
};

export default itemReducer;
