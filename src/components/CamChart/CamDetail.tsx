import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectors, actions } from "../../store";
import containerParams from "./container-params";

const width = 210;
const height = 205;
const arrowWidth = 10;
const arrowHeight = 10;
const stroke = "rgba(0,0,0,.8)";
const innerPadding = 20;
const fieldPadding = 20;
const fieldValueX = 100;

const DetailField = ({
  label,
  value,
  x,
  y
}: {
  label: string;
  value: React.ReactNode;
  x: number;
  y: number;
}) => (
  <g transform={`translate(${x}, ${y})`} fill="black">
    <text style={{ fontWeight: "bold" }}>{label}:</text>
    <text x={fieldValueX}>{value}</text>
  </g>
);

const CamDetail = ({
  id,
  x,
  y,
  position
}: {
  id: number;
  x: number;
  y: number;
  position: "right" | "left";
}) => {
  const cam = useSelector(selectors.getCamForDetail(id));
  const dispatch = useDispatch();
  return (
    <>
      <g
        transform={`translate(${x}, ${y - height / 2})`}
        stroke={stroke}
        fill="white"
      >
        {position === "right" ? (
          <path
            d={`M 0 ${height / 2} L ${arrowWidth} ${height / 2 +
              arrowHeight / 2} V ${height} H ${width +
              arrowWidth} V 0 H ${arrowWidth} V ${height / 2 -
              arrowHeight / 2} L 0 ${height / 2}`}
            filter={`url(#${containerParams.shadowId})`}
          ></path>
        ) : (
          <path
            d={`M 0 ${height / 2} L -${arrowWidth} ${height / 2 +
              arrowHeight / 2} V ${height} H -${width +
              arrowWidth} V 0 H -${arrowWidth} V ${height / 2 -
              arrowHeight / 2} L 0 ${height / 2}`}
            filter={`url(#${containerParams.shadowId})`}
          ></path>
        )}
        <g
          transform={
            position === "left" ? `translate(-${width + innerPadding}, 0)` : ""
          }
        >
          <DetailField
            label="Manufacturer"
            value={cam.manufacturer.name}
            x={innerPadding}
            y={innerPadding}
          />
          <DetailField
            label="Style"
            value={cam.camStyle.name}
            x={innerPadding}
            y={innerPadding + fieldPadding}
          />
          <DetailField
            label="Size"
            value={cam.name}
            x={innerPadding}
            y={innerPadding + 2 * fieldPadding}
          />
          <DetailField
            label="Lobes"
            value={cam.camStyle.lobes}
            x={innerPadding}
            y={innerPadding + 3 * fieldPadding}
          />
          <DetailField
            label="Weight"
            value={cam.weight + "g"}
            x={innerPadding}
            y={innerPadding + 4 * fieldPadding}
          />
          <DetailField
            label="Strength"
            value={cam.strength + "kN"}
            x={innerPadding}
            y={innerPadding + 5 * fieldPadding}
          />
          <DetailField
            label="Min Range"
            value={cam.rangeMin + "mm"}
            x={innerPadding}
            y={innerPadding + 6 * fieldPadding}
          />
          <DetailField
            label="Max Range"
            value={cam.rangeMax + "mm"}
            x={innerPadding}
            y={innerPadding + 7 * fieldPadding}
          />
          <g
            transform={`translate(${innerPadding}, ${8 * fieldPadding + 10})`}
            onClick={() => dispatch(actions.deselectCam(id))}
            style={{
              cursor: "pointer"
            }}
          >
            <rect height={30} width={width - 20} rx={3}></rect>
            <text x={65} y={20} fill="black">
              Remove
            </text>
          </g>
        </g>
      </g>
    </>
  );
};

export default CamDetail;
