import React from "react";
import { observer } from "mobx-react-lite";

import FilterStore from "./FilterStore.js";

export const TextField = observer(({ name, big }) => {
  const changeAttribute = (e) => {
    FilterStore.changeAttribute(name, e.target.value);
  };

  return (
    <input
      id={name}
      className={big ? "bigInput" : "smallInput"}
      size="2"
      type="text"
      value={FilterStore[name]}
      onChange={changeAttribute}
      autoComplete="new-password"
    />
  );
});
