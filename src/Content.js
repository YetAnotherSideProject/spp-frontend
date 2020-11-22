import React from "react";
import { observer } from "mobx-react-lite";

import SmartphoneStore from "./SmartphoneStore.js";
import FilterStore from "./FilterStore.js";
import { Smartphone } from "./Smartphone.js";

export const Content = observer(() => {
  const maxImgHeight = window.innerWidth < 600 ? 250 : 450;
  return (
    <main id="smartphones" className="smartphones">
      {SmartphoneStore.listOfFilteredAndScoredObjects.map((phone) => (
        <Smartphone
          key={phone.brand + phone.name}
          smartphone={phone}
          maxImgHeight={maxImgHeight}
          filterStore={FilterStore}
        />
      ))}
    </main>
  );
});
