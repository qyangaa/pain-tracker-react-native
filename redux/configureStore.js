import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import screenReducer from "./screenReducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      screenState: screenReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  applyMiddleware(thunk);
  return store;
};
