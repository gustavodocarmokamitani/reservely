import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./view/Sidebar/Sidebar";

const HIDDEN_NAV_PATHS = [
  /^\/home-client\/[^/]+$/,
  /^\/appointment-client\/[^/]+$/,
];

export const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const hideNavigation = HIDDEN_NAV_PATHS.some((regex) =>
    regex.test(location.pathname)
  );

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {!hideNavigation && <Navigation />}
      <div style={{ flexGrow: 1, overflowX: "hidden" }}>{children}</div>
    </div>
  );
};
