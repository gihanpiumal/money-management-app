import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RoutesConstant } from "../../assets/constants";

import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="nawbar-wrapper-left">Left</div>
        <div className="navbar-wrapper-right">
          <Link
            className="navbar-wrapper-right-link"
            to={RoutesConstant.dashboard}
          >
            Dashboard
          </Link>
          <Link
            className="navbar-wrapper-right-link"
            to={RoutesConstant.allexpences}
          >
            All Expences
          </Link>
          <Link
            className="navbar-wrapper-right-link"
            to={RoutesConstant.allinceome}
          >
            All Income
          </Link>
          <Link
            className="navbar-wrapper-right-link"
            to={RoutesConstant.yearplan}
          >
            Year Plan
          </Link>
          <Link
            className="navbar-wrapper-right-link"
            to={RoutesConstant.monthplan}
          >
            Month Plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
