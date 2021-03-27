import * as selectors from "./selectors";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import camelize from "redux-camelize";

import createReducer from "./reducer";
import localStorageMiddleware, {
  selectedCamsStorage,
} from "./middleware/local-storage";
import state from "./state";

export { default as actions } from "./actions";
export * from "./types";
export { selectors };

const urlParams = new URLSearchParams(window.location.search);
const selectedCamsParam = urlParams.get("selectedCams");
let selectedCams;
try {
  selectedCams = selectedCamsParam
    ? JSON.parse(decodeURI(selectedCamsParam))
    : undefined;
} catch (e) {
  console.error(e);
}
selectedCams = selectedCams || selectedCamsStorage.get() || state.selectedCams;

const store = createStore(
  createReducer(state), // TODO: override selectedCams
  composeWithDevTools(applyMiddleware(camelize(), localStorageMiddleware))
);

export default store;
