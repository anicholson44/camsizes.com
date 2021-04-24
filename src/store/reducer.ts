import { getType } from "typesafe-actions";

import { RootState, RootAction } from "./types";
import actions from "./actions";
import { selectedCamsStorage } from "./middleware/local-storage";
import entities from "./entities";

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
selectedCams = selectedCams ||
  selectedCamsStorage.get() || {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
    9: 1,
    10: 1,
  };

const defaultState: RootState = {
  loading: false,
  entities,
  selectedCams,
  highlightedCams: {},
  showDuplicatesInChart: true,
  showCamMenu: true,
  showRack:
    window.screen.width > 768 &&
    window.orientation !== 90 &&
    window.orientation !== -90,
  yAxis: "strength",
};

const reducer = (
  state: RootState = defaultState,
  action: RootAction
): RootState => {
  switch (action.type) {
    case getType(actions.selectCamStyle): {
      const { cams } = state.entities.camStyles[action.payload];
      return {
        ...state,
        selectedCams: {
          ...state.selectedCams,
          ...cams.reduce((o, id) => {
            o[id] = 1;
            return o;
          }, {}),
        },
      };
    }
    case getType(actions.deselectCamStyle): {
      const { cams } = state.entities.camStyles[action.payload];
      const selectedCams = {};
      Object.assign(selectedCams, state.selectedCams);
      let showDetailForCam = state.showDetailForCam;
      cams.forEach((id) => {
        delete selectedCams[id];
        if (showDetailForCam === id) {
          showDetailForCam = defaultState.showDetailForCam;
        }
      });
      return {
        ...state,
        selectedCams,
        showDetailForCam,
      };
    }
    case getType(actions.selectCam): {
      return {
        ...state,
        selectedCams: {
          ...state.selectedCams,
          [action.payload]: (state.selectedCams[action.payload] || 0) + 1,
        },
      };
    }
    case getType(actions.deselectCam): {
      const selectedCams = {};
      Object.assign(selectedCams, state.selectedCams);
      let showDetailForCam = state.showDetailForCam;
      if (selectedCams[action.payload] > 1) {
        selectedCams[action.payload] -= 1;
      } else {
        delete selectedCams[action.payload];
        if (action.payload === showDetailForCam) {
          showDetailForCam = defaultState.showDetailForCam;
        }
      }
      return {
        ...state,
        selectedCams,
        showDetailForCam,
      };
    }
    case getType(actions.deselectAllCams): {
      return {
        ...state,
        selectedCams: {},
        showDetailForCam: null,
      };
    }
    case getType(actions.highlightCamStyle): {
      const { cams } = state.entities.camStyles[action.payload];
      return {
        ...state,
        highlightedCams: {
          ...state.highlightedCams,
          ...cams.reduce((o, id) => {
            if (state.selectedCams[id]) {
              o[id] = true;
            }
            return o;
          }, {}),
        },
      };
    }
    case getType(actions.highlightCam): {
      const highlightedCams = {};
      Object.assign(highlightedCams, state.highlightedCams);
      if (state.selectedCams[action.payload]) {
        highlightedCams[action.payload] = true;
      }
      return {
        ...state,
        highlightedCams,
      };
    }
    case getType(actions.unhighlightCams): {
      return {
        ...state,
        highlightedCams: {},
      };
    }
    case getType(actions.highlightCamRange): {
      return {
        ...state,
        highlightedCamRange: action.payload,
      };
    }
    case getType(actions.unhighlightCamRange): {
      return {
        ...state,
        highlightedCamRange: undefined,
      };
    }
    case getType(actions.showDetailForCam): {
      return {
        ...state,
        showDetailForCam: action.payload,
      };
    }
    case getType(actions.hideCamDetail): {
      return {
        ...state,
        showDetailForCam: defaultState.showDetailForCam,
      };
    }
    case getType(actions.setShowDuplicatesInChart): {
      return {
        ...state,
        showDuplicatesInChart: action.payload,
      };
    }
    case getType(actions.showCamMenu): {
      return {
        ...state,
        showCamMenu: true,
      };
    }
    case getType(actions.hideCamMenu): {
      return {
        ...state,
        showCamMenu: false,
      };
    }
    case getType(actions.showRack): {
      return {
        ...state,
        showRack: true,
      };
    }
    case getType(actions.hideRack): {
      return {
        ...state,
        showRack: false,
      };
    }
    case getType(actions.changeYAxis): {
      return {
        ...state,
        yAxis: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
