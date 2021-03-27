import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Radio, Icon } from "semantic-ui-react";
import { RootState, actions } from "../../store";

const ChartMenu = () => {
  const dispatch = useDispatch();
  const yAxis = useSelector<RootState, "strength" | "weight">(
    ({ yAxis }) => yAxis
  );
  return (
    <div id="chart-menu">
      <div
        id="y-axis-radio"
        style={{ cursor: "pointer" }}
        onClick={() =>
          dispatch(
            yAxis === "strength"
              ? actions.changeYAxis("weight")
              : actions.changeYAxis("strength")
          )
        }
      >
        <div id="y-axis-radio-label">
          <div id="up-down-arrows">
            <Icon name="arrow up" />
            <Icon name="arrow down" />
          </div>
          Y-Axis:
        </div>
        <Radio label="Strength (kN)" checked={yAxis === "strength"} />
        <Radio label="Weight (g)" checked={yAxis === "weight"} />
      </div>
      <div id="x-axis-label">
        <Icon name="arrow left" />
        Expansion Range (cm)
        <Icon name="arrow right" />
      </div>
    </div>
  );
};

export default ChartMenu;
