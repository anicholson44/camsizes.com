import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "semantic-ui-react";
import { actions } from "../../store";
import { getSelectedCams } from "../../store/selectors";

const CamMenuItem = ({
  id,
  name,
  color
}: {
  id: number;
  name: string;
  color: string;
}) => {
  const selected = useSelector(getSelectedCams)[id];
  const dispatch = useDispatch();
  const onClick = () =>
    dispatch(selected ? actions.deselectCam(id) : actions.selectCam(id));

  const onHover = () => dispatch(actions.highlightCam(id));
  const onMouseLeave = () => dispatch(actions.unhighlightCams());

  return (
    <div className="cam-menu-item">
      <Icon name={selected ? "minus" : "plus"} onClick={onClick} />
      <div
        className="cam-name-and-color"
        onMouseEnter={onHover}
        onMouseLeave={onMouseLeave}
      >
        <span>{name}</span>
        <div
          style={{ backgroundColor: color }}
          className="cam-color-preview"
        ></div>
      </div>
    </div>
  );
};

export default CamMenuItem;
