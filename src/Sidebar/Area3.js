import React from "react";
import { observer } from "mobx-react-lite";
import { FilterBox } from "../FilterBox";
import { ToggleSwitch } from "../ToggleSwitch";
import { TextSelect } from "../TextSelect";

import Slider from "@material-ui/core/Slider";
import FilterStore from "../FilterStore.js";
import { i18n } from "../LocalizationStore";

const storageMarks = [
  {
    value: 0,
    label: "8",
  },
  {
    value: 1,
    label: "16",
  },
  {
    value: 2,
    label: "32",
  },
  {
    value: 3,
    label: "64",
  },
  {
    value: 4,
    label: "128",
  },
  {
    value: 5,
    label: "256",
  },
  {
    value: 6,
    label: "512",
  },
  {
    value: 7,
    label: "1024",
  },
];

export const Area3 = observer(() => {
  return (
    <FilterBox header="personalPreferences">
      <p>{i18n("storage")}</p>
      <div className="storageSlider">
        <Slider
          marks={storageMarks}
          min={0}
          max={7}
          step={null}
          onChange={(e, value) =>
            FilterStore.changeAttribute("storage", 8 * Math.pow(2, value))
          }
        />
      </div>
      <div className="flex">
        <p>{i18n("headphoneJack")}</p>
        <ToggleSwitch name="headphoneJack" />
      </div>
      <div className="flex">
        <p>{i18n("simCards")}</p>
        <ToggleSwitch name="simCards" />
      </div>
      <div className="flex">
        <p>{i18n("sdSlot")}</p>
        <ToggleSwitch name="sdSlot" />
      </div>
      <div className="flex">
        <p>{i18n("notch")}</p>
        <ToggleSwitch name="notch" />
      </div>
      <div className="flex">
        <p>{i18n("fiveg")}</p>
        <ToggleSwitch name="fiveg" />
      </div>
      <div className="flex">
        <label className="filterBoxLabel">{i18n("waterproof")}</label>
        <TextSelect
          name="waterproof"
          options={[
            ["", ""],
            ["4", i18n("ipx4")],
            ["7", i18n("ipx7")],
            ["8", i18n("ipx8")],
          ]}
        />
      </div>
      <div className="flex">
        <label className="filterBoxLabel">{i18n("refreshRate")}</label>
        <TextSelect
          name="refreshRate"
          options={[
            ["60", "60Hz"],
            ["90", "90Hz"],
            ["120", "120Hz"],
          ]}
        />
      </div>
    </FilterBox>
  );
});
