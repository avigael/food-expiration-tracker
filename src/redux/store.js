import { createStore, combineReducers } from "redux";
import itemReducer from "./reducers";

const rootReducer = combineReducers({
  itemReducer: itemReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
