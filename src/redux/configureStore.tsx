// The configueStore combines all our reducer into one
import { createStore } from "redux";
import { setUserReducer } from "./reducers/setUserReducer";

export const configureStore = () => {
  return createStore(setUserReducer);
};
