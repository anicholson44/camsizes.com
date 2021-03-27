import React from "react";

const Menu = ({
  open,
  children
}: {
  open: boolean;
  children: React.ReactNode;
}) => {
  return open ? <>{children}</> : <></>;
};

export default Menu;
