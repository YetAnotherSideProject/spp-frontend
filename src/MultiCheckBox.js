import React from "react";
import { observer } from "mobx-react-lite";

import FilterStore from "./FilterStore.js";

export const MultiCheckBox = observer(({ name, options }) => {
  const changeMultiSelection = (option) => {
    FilterStore.toggleArrayAttribute(name, option);
  };

  const toggleSelectAll = () => {
    // pessimistic toggle
    if (FilterStore[name].length > 0) {
      FilterStore[name] = [];
    } else {
      FilterStore[name] = options;
    }
  };

  return (
    <React.Fragment>
      <div className="flex" style={{ marginBottom: "8px" }}>
        <label
          className="filterBoxLabel"
          style={{ display: "flex", flexAlign: "center" }}
        >
          <input
            type="checkbox"
            onChange={() => toggleSelectAll()}
            checked={FilterStore[name].length === options.length}
            style={{
              alignSelf: "center",
              marginRight: "8px",
            }}
          />
          Select All
        </label>
      </div>
      <div className="multiCheckboxContainer">
        {options.map((option) => (
          <div key={option} className="flex">
            <label
              className="filterBoxLabel"
              style={{ display: "flex", flexAlign: "center" }}
            >
              <input
                type="checkbox"
                onChange={() => changeMultiSelection(option)}
                checked={FilterStore[name].indexOf(option) !== -1}
                style={{
                  alignSelf: "center",
                  marginRight: "8px",
                }}
              />
              {option}
            </label>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
});
