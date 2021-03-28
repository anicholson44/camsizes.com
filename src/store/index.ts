import * as selectors from "./selectors";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import camelize from "redux-camelize";

import reducer from "./reducer";
import localStorageMiddleware from "./middleware/local-storage";

export { default as actions } from "./actions";
export * from "./types";
export { selectors };

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(camelize(), localStorageMiddleware))
);

export default store;
