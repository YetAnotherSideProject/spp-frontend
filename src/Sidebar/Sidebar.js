import React from "react";
import { observer } from "mobx-react-lite";

import { StatusBar } from "./StatusBar";
import { Area1 } from "./Area1";
import { Area2 } from "./Area2";
import { Area3 } from "./Area3";
import { Area4 } from "./Area4";
import { Area5 } from "./Area5";
import { ActiveFilters } from "./ActiveFilters";
import FilterStore from "../FilterStore.js";

export const Sidebar = observer(() => {
  return (
    <aside className={FilterStore.sidebarHidden ? "sidebar hidden" : "sidebar"}>
      <StatusBar></StatusBar>
      <Area1></Area1>
      <Area2></Area2>
      <Area3></Area3>
      <Area4></Area4>
      <Area5></Area5>
      <ActiveFilters></ActiveFilters>
    </aside>
  );
});

export default Sidebar;
