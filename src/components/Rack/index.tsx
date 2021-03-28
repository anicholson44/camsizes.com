import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Segment, List, Icon, Checkbox } from "semantic-ui-react";
import { selectors, actions, RootState } from "../../store";
import ClearRackButton from "./ClearRackButton";
import ShareRackBar from "./ShareRackBar";

const Rack = () => {
  const selectedCamIds = useSelector(selectors.getSelectedCams);
  const cams = useSelector(selectors.getCams);
  const selectedCams = Object.keys(selectedCamIds).map(
    (id) => cams[Number(id)]
  );
  const weight = selectedCams
    .reduce((w, cam) => w + cam.weight * selectedCamIds[cam.id], 0)
    .toFixed(1);
  const camStyles = useSelector(selectors.getCamStyles);
  const showDuplicatesInChart = useSelector<RootState, boolean>(
    ({ showDuplicatesInChart }) => showDuplicatesInChart
  );
  const dispatch = useDispatch();
  const shareUrl = `http://www.camsizes.com/cams?selectedCams=${encodeURI(
    JSON.stringify(selectedCamIds)
  )}`;

  return (
    <>
      <Segment id="rack">
        <List>
          {selectedCams.length > 0 && (
            <List.Item id="share-rack">
              <List.Header>Share:</List.Header>
              <ShareRackBar shareUrl={shareUrl} />
            </List.Item>
          )}
          <List.Item id="rack-weight">
            <List.Header>Total Weight:</List.Header>
            {weight}g
          </List.Item>
          {selectedCams.length > 0 && (
            <>
              <List.Item>
                <ClearRackButton />
              </List.Item>
              <List.Item>
                <Checkbox
                  label="Show multiples in chart"
                  checked={showDuplicatesInChart}
                  onClick={() =>
                    dispatch(
                      actions.setShowDuplicatesInChart(!showDuplicatesInChart)
                    )
                  }
                ></Checkbox>
              </List.Item>
            </>
          )}
        </List>
        <List>
          {selectedCams.length === 0 && (
            <div style={{ padding: "10px 0 0 0" }}>
              Please select cams from the lefthand menu.
            </div>
          )}
          {selectedCams.map(({ name, camStyleId, id, color, buyLink }) => (
            <List.Item key={id}>
              <div className="rack-cam">
                <div
                  className="cam-name-and-color"
                  onMouseEnter={() => dispatch(actions.highlightCam(id))}
                  onMouseLeave={() => dispatch(actions.unhighlightCams())}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="cam-color-preview"
                  ></div>
                  <span>
                    {name} {camStyles[camStyleId].name}
                  </span>
                </div>
                <div className="ticker">
                  {buyLink && (
                    <div className="buy-link">
                      <a href={buyLink} target="_blank" rel="noreferrer">
                        <Icon name="cart" />
                      </a>
                    </div>
                  )}
                  <div className="number-with-square">{selectedCamIds[id]}</div>
                  <div className="plus-minus">
                    <Icon
                      size="small"
                      name="plus"
                      onClick={() => dispatch(actions.selectCam(id))}
                    />
                    <Icon
                      size="small"
                      name="minus"
                      onClick={() => dispatch(actions.deselectCam(id))}
                    />
                  </div>
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      </Segment>
    </>
  );
};

export default Rack;
