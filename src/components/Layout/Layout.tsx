import React from "react";
import Aux from "../hoc/Auxillary";
import Navigation from "./Navigation/Navigation";
import "./Layout.css";
import MainMenu from "../content/MainMenu/MainMenu";
import Login from "../pages/Login/Login";
interface LayoutProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}
const Layout = (props: LayoutProps) => {
  return (
    <Aux>
      <div className="topnav">
        <Navigation />
      </div>
      {props.isAuthenticated ? (
        <div className="row">
          <div className="column">
            <MainMenu></MainMenu>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="row">
        <div className="column">
          <main>{props.children}</main>
        </div>
      </div>
      <div className="footer">
        <h2>Footer</h2>
      </div>
    </Aux>
  );
};

export default Layout;
