import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { RoutesConstant } from "./assets/constants";
import { Navbar } from "./components";
import {
  Dashboard,
  AllExpences,
  AllIncome,
  MonthPlan,
  YearPlan,
} from "./pages";

import "./app.scss";

function App() {
  return (
    <div className="app">
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path={RoutesConstant.dashboard} element={<Dashboard />} />
          <Route path={RoutesConstant.allexpences} element={<AllExpences />} />
          <Route path={RoutesConstant.allinceome} element={<AllIncome />} />
          <Route path={RoutesConstant.yearplan} element={<YearPlan />} />
          <Route path={RoutesConstant.monthplan} element={<MonthPlan />} />
          <Route
            path="*"
            element={<Navigate to={RoutesConstant.dashboard} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
