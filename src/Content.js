import React, { Component } from "react";
import { observer } from "mobx-react";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import Smartphone from "./Smartphone.js";

@observer
class Content extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.contentObject = document.getElementById("smartphones");
    document
      .getElementById("smartphones")
      .addEventListener("wheel", e => this.scrollHorizontally(e), {
        passive: true
      });
  }

  scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));

    this.contentObject.scrollLeft -= delta * 100;
    e.preventDefault();
  }

  render() {
    return (
      <div id="content" className="content">
        <div id="smartphones" className="smartphones">
          {SmartphoneStore.listOfFilteredAndScoredObjects.map(smartphone => (
            <Smartphone
              key={smartphone.brand + smartphone.name}
              smartphone={smartphone}
              filterStore={FilterStore}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Content;
