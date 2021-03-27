import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";

import store, { actions, RootState } from "../store";
import SideBarMenu from "./SidebarMenu";
import CamMenu from "./CamMenu";
import CamChart from "./CamChart";
import Rack from "./Rack";

const App = () => {
  const dispatch = useDispatch();
  const showCamMenu = useSelector<RootState, boolean>(
    ({ showCamMenu }) => showCamMenu
  );
  const showRack = useSelector<RootState, boolean>(({ showRack }) => showRack);
  return (
    <div>
      <header id="header">
        <SideBarMenu.Header
          orientation="left"
          open={showCamMenu}
          onOpen={() => dispatch(actions.showCamMenu())}
          onClose={() => dispatch(actions.hideCamMenu())}
        >
          Add Cams
        </SideBarMenu.Header>
        <h1>Compare Trad Climbing Cams</h1>
        <SideBarMenu.Header
          orientation="right"
          open={showRack}
          onOpen={() => dispatch(actions.showRack())}
          onClose={() => dispatch(actions.hideRack())}
        >
          My Rack
        </SideBarMenu.Header>
      </header>
      <div id="container">
        <SideBarMenu.Menu open={showCamMenu}>
          <div id="menu-container">
            <CamMenu />
          </div>
        </SideBarMenu.Menu>
        <div id="chart-container">
          <CamChart />
        </div>
        <SideBarMenu.Menu open={showRack}>
          <div id="rack-container">
            <Rack />
          </div>
        </SideBarMenu.Menu>
      </div>
    </div>
  );
};

const AppProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppProvider;
