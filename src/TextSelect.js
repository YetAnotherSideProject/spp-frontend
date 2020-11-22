import React from "react";
import { observer } from "mobx-react-lite";

import FilterStore from "./FilterStore.js";

export const TextSelect = observer(({ name, options, className, style }) => {
  const changeAttribute = (e) => {
    FilterStore.changeAttribute(name, e.target.value);
  };

  return (
    <select
      id={name}
      className={className}
      value={FilterStore[name]}
      onChange={changeAttribute}
      style={{ alignSelf: "center", flex: "1", ...style }}
    >
      {options.map((smartphone) => (
        <option key={smartphone[0]} value={smartphone[0]}>
          {smartphone[1]}
        </option>
      ))}
    </select>
  );
});
