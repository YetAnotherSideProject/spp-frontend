import React from "react";
import { observer } from "mobx-react-lite";

import filterStore, { resetCopy } from "../FilterStore";

export const ActiveFilters = observer(() => {
  let activeFilters = [];
  let key;
  for (key in filterStore) {
    switch (key) {
      //Define filters which aren't expected to be included in the url
      case "country":
      case "updateURL":
      case "sidebarHidden":
      case "activeFilterBox":
      case "loadURL":
      case "updateURLtoRepresentFilter":
      case "lightmode":
      case "selectedFavorites":
        break;
      case "selectedBrands":
        if (
          filterStore[key] &&
          resetCopy &&
          resetCopy[key] !== filterStore[key] &&
          filterStore[key].length > 0
        ) {
          activeFilters.push(key);
        }
        break;
      default:
        if (
          filterStore[key] &&
          resetCopy &&
          resetCopy[key] !== filterStore[key]
        ) {
          activeFilters.push(key);
        }
        break;
    }
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", padding: 10 }}>
      {activeFilters.map((key) => (
        <span className="active-filters-item">
          <span>
            {key} = {"" + filterStore[key]}
          </span>
          <button
            className="active-filters-item-button"
            onClick={() => {
              filterStore[key] = resetCopy[key];
            }}
          >
            <svg
              viewBox="0 0 24 24"
              height="20px"
              fill="var(--foreground-color)"
            >
              <path d="M 10 2 L 9 3 L 5 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 21.093063 5.9069372 22 7 22 L 17 22 C 18.093063 22 19 21.093063 19 20 L 19 5 L 20 5 L 20 3 L 19 3 L 18 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
});
