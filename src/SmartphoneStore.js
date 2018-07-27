import { observable, computed, action } from "mobx";

import FilterStore from "./FilterStore.js";

class SmartphoneStore {
  @observable obj = [];

  constructor(props) {
    this.init();
  }

  init = () => {
    this.loadJSON(this.init2);
  };

  @action
  init2 = responseText => {
    // Parse JSON string into object
    this.obj = JSON.parse(responseText);
    this.calculateAllScores();
    this.findLowestPriceForAllSmartphones();
  };

  loadJSON = callback => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", "./data/smartphoneData.json", true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = () => {
      if (xobj.readyState === 4 && xobj.status === 200) {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.send(null);
  };

  findLowestPriceForAllSmartphones = () => {
    for (var i = 0; i < this.obj.smartphones.length; i++) {
      this.obj.smartphones[
        i
      ].smallestPrice = this.findLowestPriceForOneSmartphones(
        this.obj.smartphones[i]
      );
    }
  };

  findLowestPriceForOneSmartphones = smartphone => {
    var lowest = 0;
    for (var i = 1; i < smartphone.types[FilterStore.country].length; i++) {
      if (
        smartphone.types[FilterStore.country][i].price <
          smartphone.types[FilterStore.country][lowest].price &&
        smartphone.types[FilterStore.country][i].price !== 0
      ) {
        lowest = i;
      } else if (smartphone.types[FilterStore.country][lowest].price === 0) {
        lowest = i;
      }
    }
    return lowest;
  };

  calculateAllScores() {
    for (var i = 0; i < this.obj.smartphones.length; i++) {
      this.obj.smartphones[i].totalscore = this.calculateScore(
        this.obj.smartphones[i]
      );
    }
  }

  calculateScore(smartphone) {
    return (
      smartphone.design +
      smartphone.processor +
      smartphone.updates +
      smartphone.camera +
      smartphone.battery
    );
  }

  @computed
  get listOfFilteredObjects() {
    var listOfFilteredObjects = [];
    if (this.obj.smartphones == null) {
      return listOfFilteredObjects;
    }
    for (var i = 0; i < this.obj.smartphones.length; i++) {
      if (
        this.obj.smartphones[i].types[FilterStore.country][
          this.obj.smartphones[i].smallestPrice
        ].price == null ||
        this.obj.smartphones[i].types[FilterStore.country][
          this.obj.smartphones[i].smallestPrice
        ].price === 0
      ) {
        continue;
      }

      //release-date
      if (
        FilterStore.release_minimum > this.obj.smartphones[i].released ||
        FilterStore.release_maximum < this.obj.smartphones[i].released
      ) {
        continue;
      }

      //price
      if (
        FilterStore.price_minimum_1 >
          this.obj.smartphones[i].types[FilterStore.country][
            this.obj.smartphones[i].smallestPrice
          ].price ||
        FilterStore.price_maximum_1 <
          this.obj.smartphones[i].types[FilterStore.country][
            this.obj.smartphones[i].smallestPrice
          ].price
      ) {
        continue;
      }

      //display
      if (
        FilterStore.size_minimum_1 > this.obj.smartphones[i].display ||
        FilterStore.size_maximum_1 < this.obj.smartphones[i].display
      ) {
        continue;
      }

      //length
      if (
        FilterStore.size_minimum_2 > this.obj.smartphones[i].length ||
        FilterStore.size_maximum_2 < this.obj.smartphones[i].length
      ) {
        continue;
      }

      //width
      if (
        FilterStore.size_minimum_3 > this.obj.smartphones[i].width ||
        FilterStore.size_maximum_3 < this.obj.smartphones[i].width
      ) {
        continue;
      }

      //design
      if (this.obj.smartphones[i].design < FilterStore.design) {
        continue;
      }

      //processor
      if (this.obj.smartphones[i].processor < FilterStore.processor) {
        continue;
      }

      //software updates
      if (this.obj.smartphones[i].updates < FilterStore.updates) {
        continue;
      }

      //camera
      if (this.obj.smartphones[i].camera < FilterStore.camera) {
        continue;
      }

      //battery
      if (this.obj.smartphones[i].battery < FilterStore.battery) {
        continue;
      }

      //storage
      if (FilterStore.storage !== "") {
        if (this.obj.smartphones[i].storage < FilterStore.storage) {
          continue;
        }
      }
      //storage
      if (FilterStore.waterproof !== "") {
        if (this.obj.smartphones[i].waterproof < FilterStore.waterproof) {
          continue;
        }
      }

      //headphonejack
      if (
        FilterStore.headphoneJack &&
        this.obj.smartphones[i].headphonejack === 0
      ) {
        continue;
      }

      //simCardInput
      if (FilterStore.simCards && this.obj.smartphones[i].simcards === 1) {
        continue;
      }

      //sdSLot
      if (FilterStore.sdSlot && this.obj.smartphones[i].sdslot === 0) {
        continue;
      }

      //notch
      if (FilterStore.notch && this.obj.smartphones[i].notch === 1) {
        continue;
      }

      listOfFilteredObjects.push(this.obj.smartphones[i]);
    }
    return listOfFilteredObjects;
  }

  @computed
  get listOfFilteredAndScoredObjects() {
    var listOfFilteredAndScoredObjects = this.listOfFilteredObjects.slice(0);
    switch (FilterStore.filterType) {
      case "price":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionLowest(a, b, "price");
        });

      case "totalscore":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "totalscore");
        });

      case "length":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "length");
        });

      case "display":
        return listOfFilteredAndScoredObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "display");
        });

      default:
        return [];
    }
  }

  compareFunctionNormal(a, b, type) {
    return FilterStore.isDescending ? b[type] - a[type] : a[type] - b[type];
  }
  compareFunctionLowest(a, b, type) {
    return FilterStore.isDescending
      ? b.types[FilterStore.country][b.smallestPrice][type] -
          a.types[FilterStore.country][b.smallestPrice][type]
      : a.types[FilterStore.country][b.smallestPrice][type] -
          b.types[FilterStore.country][b.smallestPrice][type];
  }

  getAttributeFromSmartphone = (smartphone, type) => {
    switch (type) {
      case "price":
        return (
          smartphone.types[FilterStore.country][smartphone.smallestPrice][
            type
          ] + "€"
        );
      case "length":
      case "width":
        return smartphone[type] + "mm";
      case "display":
        return smartphone[type] + '"';
      case "totalscore":
        return smartphone[type] + " Points";
      default:
        return smartphone[type];
    }
  };
}

const smartphoneStore = new SmartphoneStore();

export default smartphoneStore;
