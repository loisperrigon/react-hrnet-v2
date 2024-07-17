import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

const Header: React.FC = () => {
  return (
    <section className="header">
      <h1 className="header_title">Hrnet</h1>
      <div className="link">
        <NavLink to="/users">Current Employee</NavLink>
        <NavLink to="/">Create Employee</NavLink>
      </div>
    </section>
  );
};

export default Header;
