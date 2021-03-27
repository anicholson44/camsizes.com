import React from "react";
import { List, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { RootState, EntitiesState } from "../../store";
import ManufacturerMenuItem from "./ManufacturerMenuItem";

const CamMenu = () => {
  const entities: EntitiesState = useSelector<RootState, EntitiesState>(
    ({ entities }) => entities
  );

  return (
    <List>
      {Object.keys(entities.manufacturers).map((id) => (
        <List.Item key={id}>
          <Header as="h3">{entities.manufacturers[id].name}</Header>
          <ManufacturerMenuItem id={Number(id)} />
        </List.Item>
      ))}
    </List>
  );
};

export default CamMenu;
