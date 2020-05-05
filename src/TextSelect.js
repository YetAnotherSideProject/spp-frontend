import React from "react";
import { observer } from "mobx-react-lite";

import FilterStore from "./FilterStore.js";

export const TextSelect = observer(({ name, options, colorScheme, style }) => {
  const changeAttribute = (e) => {
    FilterStore.changeAttribute(name, e.target.value);
  };

  return (
    <select
      id={name}
      className={"textSelect " + colorScheme}
      value={FilterStore[name]}
      onChange={changeAttribute}
      style={{ alignSelf: "center", flex: "1", ...style }}
    >
      >
      {options.map((smartphone) => (
        <option key={smartphone[0]} value={smartphone[0]}>
          {smartphone[1]}
        </option>
      ))}
    </select>
  );
});
