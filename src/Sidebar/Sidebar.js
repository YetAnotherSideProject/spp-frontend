import React from "react";
import { StatusBar } from "./StatusBar";
import { Area1 } from "./Area1";
import { Area2 } from "./Area2";
import { Area3 } from "./Area3";
import { Area4 } from "./Area4";
import { Area5 } from "./Area5";
import { ActiveFilters } from "./ActiveFilters";

export const Sidebar = () => {
  return (
    <React.Fragment>
      <StatusBar></StatusBar>
      <Area1></Area1>
      <Area2></Area2>
      <Area3></Area3>
      <Area4></Area4>
      <Area5></Area5>
      <ActiveFilters></ActiveFilters>
    </React.Fragment>
  );
};

export default Sidebar;
