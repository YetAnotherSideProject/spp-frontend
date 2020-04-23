import React from "react";
import { observer } from "mobx-react-lite";

import FilterStore from "./FilterStore.js";

export const IconSwitch = observer(({ name, icon }) => {
  return (
    <div
      id={name}
      className="iconSwitch"
      onClick={() => {
        FilterStore.toggleAttribute(name);
      }}
    >
      {icon}
    </div>
  );
});
