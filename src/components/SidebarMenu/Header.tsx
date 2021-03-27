import React from "react";
import { Icon } from "semantic-ui-react";

const Header = ({
  children,
  orientation,
  open,
  onOpen,
  onClose
}: {
  children: React.ReactNode;
  orientation: "left" | "right";
  open: boolean;
  onOpen: () => unknown;
  onClose: () => unknown;
}) => {
  return (
    <h3>
      <div
        className={`sidebar-menu-header ${orientation} ${
          open ? "open" : "closed"
        }`}
        onClick={() => (open ? onClose() : onOpen())}
      >
        {orientation === "right" ? (
          <Icon name={open ? "chevron down" : "chevron right"} />
        ) : null}
        {children}
        {orientation === "left" ? (
          <Icon name={open ? "chevron down" : "chevron left"} />
        ) : null}
      </div>
    </h3>
  );
};

export default Header;
