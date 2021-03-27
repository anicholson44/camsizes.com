import React from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../store";

const ClearRackButton = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="button"
      onClick={() => dispatch(actions.deselectAllCams())}
    >
      Clear
    </div>
  );
};

export default ClearRackButton;
