import React from "react";
import { observer } from "mobx-react-lite";

import Switch from "@material-ui/core/Switch";
import FilterStore from "./FilterStore.js";

export const ToggleSwitch = observer(({ name }) => {
  return (
    <Switch
      checked={FilterStore[name]}
      onChange={() => {
        FilterStore.toggleAttribute(name);
      }}
      color="primary"
    />
  );
});
