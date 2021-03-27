import React from "react";
import { useDispatch } from "react-redux";

import { EntityMap, Cam, CamStyle, IdStore, actions } from "../../store";
import XAxisTick from "./XAxisTick";
import CamDetail from "./CamDetail";
import CamRect from "./CamRect";
import containerParams from "./container-params";

const xTicks = Array.from({ length: containerParams.numXTicks }, (_, i) => (
  <XAxisTick
    x={i * containerParams.tickDistance_pixels}
    label={`${(i * containerParams.tickDistance_mm) / 10}cm`}
    key={i}
  />
));

const Chart = ({
  camStyles,
  highlightedCams,
  highlightedCamRange,
  showDetailForCam,
  camsToShow,
  yAxis
}: {
  camStyles: EntityMap<CamStyle>;
  highlightedCams: IdStore<true>;
  highlightedCamRange: number | void;
  showDetailForCam: number | void;
  camsToShow: Cam[];
  yAxis: "strength" | "weight";
}) => {
  const dispatch = useDispatch();

  let camRangeHighlight = null;
  let camDetail = null;
  let y = 0;
  const camRects = camsToShow.map((cam, i) => {
    const {
      id,
      color,
      rangeMin,
      rangeMax,
      name,
      camStyleId,
      strength,
      weight
    } = cam;
    const x = containerParams.millimetersToPixels * rangeMin;
    const rectWidth =
      containerParams.millimetersToPixels * (rangeMax - rangeMin);
    const thisY = y;
    const height =
      yAxis === "strength"
        ? strength * containerParams.kilonewtonsToPixels
        : weight * containerParams.gramsToPixels;
    y += height + 1;
    if (highlightedCamRange === id) {
      camRangeHighlight = (
        <>
          <line
            x1={x}
            x2={x}
            y1={containerParams.paddingY * -1}
            y2="100%"
            opacity="25%"
            stroke="black"
          />
          <line
            x1={x + rectWidth}
            x2={x + rectWidth}
            y1={containerParams.paddingY * -1}
            y2="100%"
            opacity="25%"
            stroke="black"
          />
        </>
      );
    }
    if (showDetailForCam === id) {
      const position = x > containerParams.width / 2 ? "left" : "right";
      camDetail = (
        <CamDetail
          id={id}
          x={position === "right" ? x + rectWidth : x}
          y={thisY + height / 2}
          position={position}
        />
      );
    }
    return (
      <CamRect
        key={i}
        onClick={() =>
          dispatch(
            showDetailForCam === id
              ? actions.hideCamDetail()
              : actions.showDetailForCam(id)
          )
        }
        color={color}
        stroke="black"
        x={x}
        y={thisY}
        width={rectWidth}
        height={height}
        label={`${camStyles[camStyleId].name} ${name}`}
        onHover={() => dispatch(actions.highlightCamRange(id))}
        onMouseLeave={() => dispatch(actions.unhighlightCamRange())}
        blurred={
          Object.keys(highlightedCams).length > 0 && !highlightedCams[id]
        }
        showRange={!!highlightedCamRange}
        rangeMin={rangeMin}
        rangeMax={rangeMax}
        yAxisLabel={yAxis === "strength" ? `${strength}kN` : `${weight}g`}
        showYAxisLabel={!highlightedCamRange}
      />
    );
  });

  return (
    <svg
      viewBox={`-${containerParams.paddingX} -${containerParams.paddingY} ${containerParams.width} ${containerParams.height}`}
    >
      <defs>
        <filter id={containerParams.shadowId}>
          <feDropShadow
            dx="-1"
            dy="-1"
            stdDeviation="2"
            floodOpacity=".3"
          ></feDropShadow>
        </filter>
      </defs>
      <rect
        x={0}
        y={0}
        height="100%"
        width="100%"
        strokeWidth="0"
        onClick={() => dispatch(actions.hideCamDetail())}
        fillOpacity={0}
      ></rect>
      <line x1={0} y1={0} x2={0} y2="100%" stroke="black" />
      <line x1={0} y1={0} y2={0} x2="100%" stroke="black" />
      {xTicks}
      <g transform="translate(0 20)">
        {camRects}
        {camRangeHighlight}
        {camDetail}
      </g>
    </svg>
  );
};

export default Chart;
