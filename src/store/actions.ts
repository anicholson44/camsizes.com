import { createAction } from "typesafe-actions";

const changeYAxis = createAction("CHANGE_Y_AXIS")<"strength" | "weight">();

const selectCamStyle = createAction("SELECT_CAM_STYLE")<number>();
const deselectCamStyle = createAction("DESELECT_CAM_STYLE")<number>();

const selectCam = createAction("SELECT_CAM")<number>();
const deselectCam = createAction("DESELECT_CAM")<number>();
const deselectAllCams = createAction("DESELECT_ALL_CAMS")<void>();

const highlightCamStyle = createAction("HIGHLIGHT_CAM_STYLE")<number>();
const highlightCam = createAction("HIGHLIGHT_CAM")<number>();
const unhighlightCams = createAction("UNHIGHLIGHT_CAMS")<void>();

const highlightCamRange = createAction("HIGHLIGHT_CAM_RANGE")<number>();
const unhighlightCamRange = createAction("UNHIGHLIGHT_CAM_RANGE")<void>();

const showDetailForCam = createAction("SHOW_DETAIL_FOR_CAM")<number>();
const hideCamDetail = createAction("HIDE_CAM_DETAIL")<void>();

const setShowDuplicatesInChart = createAction(
  "SET_SHOW_DUPLICATES_IN_CHART"
)<boolean>();

const showCamMenu = createAction("SHOW_CAM_MENU")();
const hideCamMenu = createAction("HIDE_CAM_MENU")();
const showRack = createAction("SHOW_RACK")();
const hideRack = createAction("HIDE_RACK")();

export default {
  selectCamStyle,
  deselectCamStyle,
  selectCam,
  deselectCam,
  deselectAllCams,
  highlightCamStyle,
  highlightCam,
  unhighlightCams,
  highlightCamRange,
  unhighlightCamRange,
  showDetailForCam,
  hideCamDetail,
  setShowDuplicatesInChart,
  showCamMenu,
  hideCamMenu,
  showRack,
  hideRack,
  changeYAxis,
};
