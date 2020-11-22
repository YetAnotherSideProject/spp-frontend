import React from "react";
import { observer } from "mobx-react-lite";
import { FilterBox } from "../FilterBox";
import { TextField } from "../TextField";

import Slider from "@material-ui/core/Slider";
import { ToggleSwitch } from "../ToggleSwitch";
import FilterStore, { resetCopy } from "../FilterStore.js";
import { i18n } from "../LocalizationStore";

const changeAttributeSlider = (first, second) => (e, value) => {
  FilterStore.changeAttribute(first, value[0]);
  FilterStore.changeAttribute(second, value[1]);
};

export const Area2 = observer(() => {
  return (
    <FilterBox header="budgetAndSize">
      <label className="filterBoxLabel">
        {i18n("price")}
        <div style={{ marginBottom: 0 }}>
          <div>
            <Slider
              min={resetCopy.price_minimum}
              max={resetCopy.price_maximum}
              step={50}
              value={[
                parseInt(FilterStore.price_minimum, 10)
                  ? parseInt(FilterStore.price_minimum, 10)
                  : 0,
                parseInt(FilterStore.price_maximum, 10)
                  ? parseInt(FilterStore.price_maximum, 10)
                  : 0,
              ]}
              pushable={50}
              onChange={changeAttributeSlider("price_minimum", "price_maximum")}
            />
          </div>
          <div className="sliderSubBar">
            <TextField name="price_minimum" />
            <span className="prefix">€</span>
            <div className="filler" />
            <TextField name="price_maximum" />
            <span className="prefix">€</span>
          </div>
        </div>
      </label>
      <div className="flex" style={{ marginBottom: 16 }}>
        <p>{i18n("showPhonesWithoutPrices")}</p>
        <ToggleSwitch name="showPhonesWithoutPrices" />
      </div>
      <label className="filterBoxLabel">
        {i18n("display")}
        <div>
          <div>
            <Slider
              min={4.6}
              max={7}
              step={0.1}
              pushable={0.1}
              value={[
                parseFloat(FilterStore.size_minimum_1)
                  ? parseFloat(FilterStore.size_minimum_1)
                  : 0,
                parseFloat(FilterStore.size_maximum_1)
                  ? parseFloat(FilterStore.size_maximum_1)
                  : 0,
              ]}
              onChange={changeAttributeSlider(
                "size_minimum_1",
                "size_maximum_1"
              )}
            />
          </div>
          <div className="sliderSubBar">
            <TextField name="size_minimum_1" />
            <span className="prefix">"</span>
            <div className="filler" />
            <TextField name="size_maximum_1" />
            <span className="prefix">"</span>
          </div>
        </div>
      </label>
      <label className="filterBoxLabel">
        {i18n("length")}
        <div>
          <div>
            <Slider
              min={135}
              max={163}
              step={1}
              pushable={1}
              value={[
                parseInt(FilterStore.size_minimum_2, 10)
                  ? parseInt(FilterStore.size_minimum_2, 10)
                  : 0,
                parseInt(FilterStore.size_maximum_2, 10)
                  ? parseInt(FilterStore.size_maximum_2, 10)
                  : 0,
              ]}
              onChange={changeAttributeSlider(
                "size_minimum_2",
                "size_maximum_2"
              )}
            />
          </div>
          <div className="sliderSubBar">
            <TextField name="size_minimum_2" />
            <span className="prefix">mm</span>
            <div className="filler" />
            <TextField name="size_maximum_2" />
            <span className="prefix">mm</span>
          </div>
        </div>
      </label>
      <label className="filterBoxLabel">
        {i18n("width")}
        <div>
          <div>
            <Slider
              min={65}
              max={78}
              step={1}
              pushable={1}
              value={[
                parseInt(FilterStore.size_minimum_3, 10)
                  ? parseInt(FilterStore.size_minimum_3, 10)
                  : 0,
                parseInt(FilterStore.size_maximum_3, 10)
                  ? parseInt(FilterStore.size_maximum_3, 10)
                  : 0,
              ]}
              onChange={changeAttributeSlider(
                "size_minimum_3",
                "size_maximum_3"
              )}
            />
          </div>
          <div className="sliderSubBar">
            <TextField name="size_minimum_3" />
            <span className="prefix">mm</span>
            <div className="filler" />
            <TextField name="size_maximum_3" />
            <span className="prefix">mm</span>
          </div>
        </div>
      </label>
    </FilterBox>
  );
});
