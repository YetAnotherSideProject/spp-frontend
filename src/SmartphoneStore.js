import { makeAutoObservable } from "mobx";
import FilterStore from "./FilterStore.js";
import { Database } from "firebase-firestore-lite";

class SmartphoneStore {
  obj = [];

  hasLoaded = false;

  constructor() {
    makeAutoObservable(this);

    this.loadJSON();
  }

  init = (responseText) => {
    this.obj = responseText;
    // Set variable to show it finished loading
    this.hasLoaded = true;
  };

  loadJSON = async () => {
    // All you need is the projectId. It can be found on the firebase console and in the firebase config.
    const db = new Database({ projectId: "smartphone-picker" });

    const phoneCollection = (
      await db.ref("smartphones").list({
        pageSize: 1000,
      })
    ).documents;
    this.init(phoneCollection);
  };

  get listOfFilteredObjects() {
    let listOfFilteredObjects = [];
    if (!this.hasLoaded) {
      return listOfFilteredObjects;
    }
    let obj = JSON.parse(JSON.stringify(this.obj)); // deep copy
    let phone;
    for (let key in obj) {
      phone = obj[key];
      if (FilterStore.onlyShowFavedPhones) {
        if (
          FilterStore.selectedFavorites[phone.brand + " " + phone.name] == null
        ) {
          continue;
        }
      }

      if (FilterStore.searchQuery !== "") {
        //searchQuery
        const lowerCaseName = (phone.brand + " " + phone.name).toLowerCase();
        if (!lowerCaseName.includes(FilterStore.searchQuery.toLowerCase())) {
          continue;
        }
      }

      //release-date
      if (
        FilterStore.release_minimum > phone.released ||
        FilterStore.release_maximum < phone.released
      ) {
        continue;
      }

      //display
      if (
        FilterStore.size_minimum_1 > phone.display ||
        FilterStore.size_maximum_1 < phone.display
      ) {
        continue;
      }

      //length
      if (
        FilterStore.size_minimum_2 > phone.length ||
        FilterStore.size_maximum_2 < phone.length
      ) {
        continue;
      }

      //width
      if (
        FilterStore.size_minimum_3 > phone.width ||
        FilterStore.size_maximum_3 < phone.width
      ) {
        continue;
      }

      //waterproof
      if (FilterStore.waterproof !== "") {
        if (phone.waterproof < FilterStore.waterproof) {
          continue;
        }
      }

      //headphonejack
      if (FilterStore.headphoneJack && !phone.headphoneJack) {
        continue;
      }

      //simCardInput
      if (FilterStore.simCards && !phone.dualSim) {
        continue;
      }

      //sdSLot
      if (FilterStore.sdSlot && !phone.sdSlot) {
        continue;
      }

      //notch
      if (FilterStore.notch && phone.notchType === "NOTCH") {
        continue;
      }

      //notch
      if (
        FilterStore.refreshRate &&
        phone.refreshRate < FilterStore.refreshRate
      ) {
        continue;
      }

      //brands
      if (
        FilterStore.selectedBrands.length > 0 &&
        FilterStore.selectedBrands.indexOf(phone.brand) === -1
      ) {
        continue;
      }

      for (let t = 0; t < phone.models.length; t++) {
        //storage
        if (phone.models[t].storage < FilterStore.storage) {
          phone.models.splice(t, 1);
          t--;
          continue;
        }
        if (phone.models[t].memory < FilterStore.memory) {
          phone.models.splice(t, 1);
          t--;
          continue;
        }
        for (let c = 0; c < phone.models[t].types.length; c++) {
          //price
          if (
            (FilterStore.price_minimum > phone.models[t].types[c].price ||
              FilterStore.price_maximum < phone.models[t].types[c].price) &&
            ((FilterStore.showPhonesWithoutPrices &&
              phone.models[t].types[c].price !== -1) ||
              !FilterStore.showPhonesWithoutPrices)
          ) {
            if (phone.models[t].types.length === 1) {
              phone.models.splice(t, 1);
              t--;
              break;
            } else {
              phone.models[t].types.splice(c, 1);
              c--;
            }
          } // fiveg
          else if (FilterStore.fiveg && !phone.models[t].types[c].fiveg) {
            if (phone.models[t].types.length === 1) {
              phone.models.splice(t, 1);
              t--;
              break;
            } else {
              phone.models[t].types.splice(c, 1);
              c--;
            }
          }
        }
      }

      if (phone.models.length < 1) {
        continue;
      }

      listOfFilteredObjects.push(phone);
    }
    return listOfFilteredObjects;
  }

  get listOfFilteredAndSortedObjects() {
    let listOfFilteredAndSortedObjects = this.listOfFilteredObjects.slice(0);

    switch (FilterStore.sortBy) {
      case "price":
        return listOfFilteredAndSortedObjects.sort((a, b) => {
          return this.compareFunctionLowest(a, b, "price");
        });

      case "length":
        return listOfFilteredAndSortedObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "length");
        });

      case "display":
        return listOfFilteredAndSortedObjects.sort((a, b) => {
          return this.compareFunctionNormal(a, b, "display");
        });
      case "released":
        return listOfFilteredAndSortedObjects.sort((a, b) => {
          return this.compareDates(a, b, "released");
        });

      default:
        console.log("Case not defined.");
        return [];
    }
  }

  getUniqueBrands() {
    var unique = [];
    if (!this.hasLoaded) {
      return unique;
    }
    this.obj.forEach((element) => {
      if (unique.indexOf(element.brand) === -1) {
        unique.push(element.brand);
      }
    });

    unique.sort();
    return unique;
  }

  compareDates(a, b, attribute) {
    return FilterStore.isDescending
      ? b[attribute] > a[attribute]
        ? 1
        : -1
      : a[attribute] > b[attribute]
      ? 1
      : -1;
  }

  compareFunctionNormal(a, b, attribute) {
    return FilterStore.isDescending
      ? b[attribute] - a[attribute]
      : a[attribute] - b[attribute];
  }

  compareFunctionLowest(a, b, attribute) {
    return FilterStore.isDescending
      ? b.models[0].types[0][attribute] - a.models[0].types[0][attribute]
      : a.models[0].types[0][attribute] - b.models[0].types[0][attribute];
  }
}

const smartphoneStore = new SmartphoneStore();

export default smartphoneStore;
