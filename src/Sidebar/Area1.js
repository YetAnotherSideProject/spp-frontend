import React from "react";
import { observer } from "mobx-react-lite";
import { ToggleSwitch } from "../ToggleSwitch";
import { FilterBox } from "../FilterBox";
import { TextSelect } from "../TextSelect";
import { TextField } from "../TextField";

import Slider from "@material-ui/core/Slider";
import FilterStore from "../FilterStore.js";
import { i18n } from "../LocalizationStore";

const changeAttributeDateSlider = (e, value) => {
  FilterStore.changeAttribute(
    "release_minimum",
    "20" +
      (17 + Math.floor(value[0] / 12)) +
      "-" +
      ("00" + ((value[0] % 12) + 1)).slice(-2)
  );

  FilterStore.changeAttribute(
    "release_maximum",
    "20" +
      (17 + Math.floor(value[1] / 12)) +
      "-" +
      ("00" + ((value[1] % 12) + 1)).slice(-2)
  );
};

const getMinDateinMonths = (minDate) => {
  let monthsMin = 0;
  const start = new Date("2017-01");
  const min = new Date(minDate);

  if (!isNaN(min.getTime())) {
    monthsMin = (min.getFullYear() - start.getFullYear()) * 12;
    monthsMin -= start.getMonth();
    monthsMin += min.getMonth();
  }

  return monthsMin;
};

const getMaxDateInMonths = (maxDate) => {
  let monthsMax = 0;
  const start = new Date("2017-01");
  const max = new Date(maxDate);

  if (!isNaN(max.getTime())) {
    monthsMax = (max.getFullYear() - start.getFullYear()) * 12;
    monthsMax -= start.getMonth();
    monthsMax += max.getMonth();
  }
  return monthsMax;
};

export const Area1 = observer(() => {
  return (
    <FilterBox header="sortingOptions">
      <label className="filterBoxLabel">
        {i18n("searchPhones")}
        <div className={"searchQuery"}>
          <TextField name="searchQuery" />
        </div>
      </label>
      <label className="filterBoxLabel">
        {i18n("sortBy")}
        <div className="flex">
          <TextSelect
            name="sortBy"
            options={[
              ["price", i18n("price")],
              ["length", i18n("totalSize")],
              ["display", i18n("displaySize")],
              ["released", i18n("releaseDate")],
            ]}
          />
          <div style={{ display: "flex", overflow: "hidden" }}>
            <svg
              id="sorting_order"
              className={
                FilterStore.isDescending
                  ? "sorting_order rotate-sorting-order"
                  : "sorting_order"
              }
              viewBox="0 0 32 16"
              height="24px"
              alt="Submit"
              onClick={() => FilterStore.toggleAttribute("isDescending")}
            >
              <path d="M 0 0 L 0 4 L 4 4 L 4 0 L 0 0 z M 16 0 L 12 4 L 14 4 L 14 16 L 18 16 L 18 4 L 20 4 L 16 0 z M 24 0 L 24 4 L 32 4 L 32 0 L 24 0 z M 0 6 L 0 10 L 6 10 L 6 6 L 0 6 z M 26 6 L 26 10 L 32 10 L 32 6 L 26 6 z M 0 12 L 0 16 L 8 16 L 8 12 L 0 12 z M 28 12 L 28 16 L 32 16 L 32 12 L 28 12 z " />
            </svg>{" "}
          </div>
        </div>
      </label>
      <div className="flex">
        <p>{i18n("scalePhones")}</p>
        <ToggleSwitch name="scaleInput" />
      </div>
      <div className="flex">
        <p>{i18n("emptySmartphones")}</p>
        <ToggleSwitch name="emptySmartphones" />
      </div>
      <label className="filterBoxLabel">
        {i18n("releaseDate")}
        <div>
          <div>
            <Slider
              min={0}
              max={getMaxDateInMonths(new Date().toISOString().slice(0, 7))}
              step={1}
              pushable={1}
              value={[
                getMinDateinMonths(FilterStore.release_minimum),
                getMaxDateInMonths(FilterStore.release_maximum),
              ]}
              onChange={changeAttributeDateSlider}
            />
          </div>
          <div className="sliderSubBar">
            <TextField name="release_minimum" big={true} />
            <div className="filler" />
            <TextField name="release_maximum" big={true} />
          </div>
        </div>
      </label>
    </FilterBox>
  );
});
