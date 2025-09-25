import React from "react"; 
import Navigation from "./view/Sidebar/Sidebar";

export const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      {<Navigation />}
      <div style={{ flexGrow: 1, overflowX: "hidden" }}>{children}</div>
    </div>
  );
};
