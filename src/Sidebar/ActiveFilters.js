import React from "react";
import { action } from "mobx";
import { observer } from "mobx-react-lite";

import filterStore, { resetCopy } from "../FilterStore";

const mappings = {
  fiveg: "5G",
  notch: "No notch",
  headphoneJack: "Headphone Jack",
  simCards: "2 SIMs",
  sdSlot: "SD Slot",
  waterproof: "Waterproof",
  refreshRate: "Refresh Rate",

  design: "Design",
  updates: "Updates",
  camera: "Camera",
  battery: "Battery",
  processor: "Processor",
  selectedBrands: " Brands",

  release_minimum: "Min Release",
  release_maximum: "Max Release",
  price_minimum: "Min Price",
  price_maximum: "Max Price",

  size_minimum_1: "Min Display",
  size_maximum_1: "Max Display",
  size_minimum_2: "Min Length",
  size_maximum_2: "Max Length",
  size_minimum_3: "Min Width",
  size_maximum_3: "Max Width",

  emptySmartphones: " Empty phones",
  showPhonesWithoutPrices: "Phones without prices",
  searchQuery: "Search Query",
  filterType: "Sort by",
  decayFactor: "Decay Factor",
};

const tryGetMapping = (key) => {
  if (mappings[key]) {
    return mappings[key];
  }
  return key;
};

const tryGetValue = (value) => {
  if (value === "true" || value === true) {
    return "";
  }
  return " = " + value;
};

export const ActiveFilters = observer(() => {
  let activeFilters = [];
  let key;
  for (key in filterStore) {
    switch (key) {
      //Define filters which aren't expected to be included in the active filters
      case "country":
      case "updateURL":
      case "sidebarHidden":
      case "activeFilterBox":
      case "loadURL":
      case "updateURLtoRepresentFilter":
      case "lightmode":
      case "selectedFavorites":
      case "modalSmartphone":
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
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        padding: 10,
        borderTop: " 1px solid var(--border-color)",
      }}
    >
      {activeFilters.map((key) => (
        <span className="active-filters-item">
          <span>
            {tryGetMapping(key)}
            {tryGetValue(filterStore[key])}
          </span>
          <button
            className="active-filters-item-button"
            onClick={action(() => {
              filterStore[key] = resetCopy[key];
            })}
          >
            <svg viewBox="0 0 24 24" height="20px" fill="var(--just-white)">
              <path d="M 10 2 L 9 3 L 5 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 21.093063 5.9069372 22 7 22 L 17 22 C 18.093063 22 19 21.093063 19 20 L 19 5 L 20 5 L 20 3 L 19 3 L 18 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
});
