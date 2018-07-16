import React, { Component } from "react";
import { observer } from "mobx-react";
import "./Sidebar.css";
import RatingStars from "./RatingStars";
import ToggleSwitch from "./ToggleSwitch";
import TextSelect from "./TextSelect";
import TextField from "./TextField";

@observer
class Sidebar extends Component {
  render() {
    return (
      <div className="box sidebar">
        <div className="filterBox">
          <div className="filterBox-Header">Sorting Options</div>
          <p>Filter Templates</p>
          <TextSelect
            name="filterTemplate"
            options={[
              ["", ""],
              ["justGood", "Good smartphones from all price ranges."],
              ["small", "Smartphones made for small hands."],
              ["big", "Smartphones made for freaky big hands."],
              ["cheap", "Smartphones for small budgets."]
            ]}
          />
          <p>Sort table by</p>
          <TextSelect
            name="filterType"
            options={[
              ["price", "Price"],
              ["length", "Body-Size"],
              ["display", "Screen-Size"],
              ["totalscore", "Total Score"]
            ]}
          />
          <p>Scale phones</p>
          <ToggleSwitch name="scaleInput" />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header">Budget and Size</div>
          <p>Price</p>
          <TextField name="price_minimum_1" />-<TextField name="price_maximum_1" />
          <p>Display</p>
          <TextField name="size_minimum_1" />-<TextField name="size_maximum_1" />
          <p>Length</p>
          <TextField name="size_minimum_2" />-<TextField name="size_maximum_2" />
          <p>Width</p>
          <TextField name="size_minimum_3" />-<TextField name="size_maximum_3" />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header">Ratings</div>
          <p>Design</p>
          <RatingStars name="design" />
          <p>Processor</p>
          <RatingStars name="processor" />
          <p>Updates</p>
          <RatingStars name="updates" />
          <p>Camera</p>
          <RatingStars name="camera" />
          <p>Battery</p>
          <RatingStars name="battery" />
        </div>
        <div className="filterBox">
          <div className="filterBox-Header">Personal Preferences</div>
          <p>Storage</p>
          <TextSelect
            name="storage"
            options={[
              ["16", "16GB => ∞"],
              ["32", "32GB => ∞"],
              ["64", "64GB => ∞"],
              ["128", "128GB => ∞"],
              ["256", "256GB => ∞"]
            ]}
          />
          <p>Headphone-Jack</p>
          <ToggleSwitch name="headphoneJack" />
          <p>2 SIMS</p>
          <ToggleSwitch name="simCards" />
          <p>SD Slot</p>
          <ToggleSwitch name="sdSlot" />
          <p>No notch</p>
          <ToggleSwitch name="notch" />
          <p>Waterproof</p>
          <TextSelect
            name="waterproof"
            options={[
              ["", ""],
              ["4", "IP X4 Splashing water"],
              ["7", "IP X7 Immersion up to 1m"],
              ["8", "IP X8 Immersion beyond 1m"]
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Sidebar;
