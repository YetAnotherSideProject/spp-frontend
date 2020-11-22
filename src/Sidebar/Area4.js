import React from "react";
import { observer } from "mobx-react-lite";
import { FilterBox } from "../FilterBox";
import { TextField } from "../TextField";

import Slider from "@material-ui/core/Slider";
import FilterStore from "../FilterStore.js";
import { i18n } from "../LocalizationStore";

export const Area4 = observer(() => {
  return (
    <FilterBox header="ratings">
      <p>{i18n("design")}</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("design", value)}
      />
      <p>{i18n("cpu")}</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("cpu", value)}
      />
      <p>{i18n("updates")}</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("updates", value)}
      />
      <p>{i18n("camera")}</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("camera", value)}
      />
      <p>{i18n("battery")}</p>
      <Slider
        min={1}
        max={5}
        step={1}
        onChange={(e, value) => FilterStore.changeAttribute("battery", value)}
      />
      <p>
        {i18n("decayFactor")} {i18n("decayFactorDescription")}
      </p>
      <Slider
        min={0}
        max={1}
        step={0.1}
        value={parseFloat(FilterStore.decayFactor)}
        onChange={(e, value) =>
          FilterStore.changeAttribute("decayFactor", value)
        }
      />
      <div className="sliderSubBar">
        <div className="filler" />
        <TextField name="decayFactor" />
        <label htmlFor="decayFactor" className="prefix">
          per Month
        </label>
      </div>
    </FilterBox>
  );
});
