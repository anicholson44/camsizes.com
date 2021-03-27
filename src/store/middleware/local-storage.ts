import { Middleware } from "redux";
import { RootState } from "..";

const selectedCamsKey = "selectedCams";

export const selectedCamsStorage = {
  set: (s: RootState["selectedCams"]) =>
    window.localStorage.setItem(selectedCamsKey, JSON.stringify(s)),
  get: (): RootState["selectedCams"] =>
    JSON.parse(window.localStorage.getItem(selectedCamsKey)) || {},
};

const middleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  selectedCamsStorage.set(store.getState().selectedCams);
  return result;
};

export default middleware;
