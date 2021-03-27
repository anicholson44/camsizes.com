import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { actions, CamStyle } from "../../store";
import { getCamStyleSelected } from "../../store/selectors";

const CamStyleCheckbox = ({ id }: CamStyle) => {
  const dispatch = useDispatch();
  const checked = useSelector(getCamStyleSelected(id));

  const onClick = () =>
    dispatch(
      checked ? actions.deselectCamStyle(id) : actions.selectCamStyle(id)
    );
  return (
    <Icon
      onClick={onClick}
      name={checked ? "minus" : "plus"}
      style={{
        float: "left",
        margin: "0 1em 0 0",
        cursor: "pointer"
      }}
    />
  );
};

export default CamStyleCheckbox;
