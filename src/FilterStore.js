import { autorun, makeAutoObservable } from "mobx";

const getMinDate = () => {
  const date = new Date();
  date.setMonth(new Date().getMonth() - 18);
  return date.toISOString().slice(0, 7);
};

const getSidebarHiddenInitialState = () => {
  const viewportWidth = window.innerWidth;
  if (viewportWidth > 640) {
    return false;
  }
  return true;
};

export const resetCopy = {
  sidebarHidden: false,
  country: "de",
  searchQuery: "",
  sortBy: "price",
  isDescending: true,
  scaleInput: true,
  emptySmartphones: false,
  release_minimum: getMinDate(),
  release_maximum: new Date().toISOString().slice(0, 7),
  price_minimum: 0,
  price_maximum: 2000,
  size_minimum_1: 4.6,
  size_maximum_1: 7,
  size_minimum_2: 130,
  size_maximum_2: 170,
  size_minimum_3: 60,
  size_maximum_3: 80,
  storage: 8,
  memory: 1,
  headphoneJack: false,
  simCards: false,
  sdSlot: false,
  notch: false,
  fiveg: false,
  waterproof: "",
  refreshRate: 60,
  selectedBrands: [],
  selectedFavorites: {},
  onlyShowFavedPhones: false,
  showBacksideDefault: false,
  showPhonesWithoutPrices: false,
  modalSmartphone: null,
};

class FilterStore {
  lightmode = true;
  sidebarHidden = getSidebarHiddenInitialState();
  country = "de";

  activeFilterBox = "sortingOptions";

  searchQuery = "";
  sortBy = "price";
  isDescending = true;
  scaleInput = true;
  emptySmartphones = false;
  release_minimum = getMinDate();

  release_maximum = new Date().toISOString().slice(0, 7);

  price_minimum = 0;
  price_maximum = 2000;

  size_minimum_1 = 4.6;
  size_maximum_1 = 7;

  size_minimum_2 = 130;
  size_maximum_2 = 170;

  size_minimum_3 = 60;
  size_maximum_3 = 80;

  storage = 8;
  memory = 1;
  headphoneJack = false;
  simCards = false;
  sdSlot = false;
  notch = false;
  fiveg = false;
  waterproof = "";
  refreshRate = 60;

  selectedBrands = [];

  selectedFavorites = {};
  onlyShowFavedPhones = false;
  showBacksideDefault = false;
  showPhonesWithoutPrices = false;

  modalSmartphone = null;

  constructor() {
    makeAutoObservable(this);

    this.loadURL();

    autorun(() => {
      this.updateURL();
    });
  }

  toggleAttribute = (name) => {
    this[name] = !this[name];
  };

  changeAttribute = (name, newValue) => {
    this[name] = newValue;
  };

  toggleArrayAttribute = (name, newValue) => {
    var index = this[name].indexOf(newValue);
    if (index === -1) {
      this[name].push(newValue); // add if it doesn't exist
    } else {
      this[name].splice(index, 1); // remove if it does
    }
  };

  toggleObjectAttribute = (name, newValue) => {
    if (this[name]) {
      if (this[name][newValue] == null) {
        this[name][newValue] = newValue; // add if it doesn't exist
      } else {
        delete this[name][newValue]; // remove if it does
      }
    }
  };

  resetFilters = () => {
    for (let name in this) {
      switch (name) {
        //Define filters which aren't expected to be reset
        case "country":
        case "sidebarHidden":
        case "activeFilterBox":
        case "updateURL":
        case "lightmode":
          break;
        default:
          if (this[name] !== resetCopy[name]) {
            this[name] = resetCopy[name];
          }
          break;
      }
    }
  };

  loadURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    // key[0] is the url key and key[1] the value, for example release_minimum=2017-01
    for (let key of searchParams) {
      // parse selectedBrands to an Array
      if (key[0] === "selectedBrands") {
        this[key[0]] = key[1].split(",");
        continue;
      }
      if (key[0] === "selectedFavorites") {
        const keys = decodeURIComponent(key[1]).split(",");
        const object = {};
        keys.forEach((element) => (object[element] = element));
        this[key[0]] = object;
        continue;
      }

      if (isNaN(key[1])) {
        this[key[0]] = key[1];
      } else {
        // convert to number if valid number
        this[key[0]] = +key[1];
      }
    }
  };

  updateURL = () => {
    let queryComponents = [];
    let finalquery = "";
    let key;
    for (key in this) {
      switch (key) {
        //Define filters which aren't expected to be included in the url
        case "country":
        case "updateURL":
        case "sidebarHidden":
        case "activeFilterBox":
        case "loadURL":
        case "lightmode":
        case "modalSmartphone":
          break;
        case "selectedBrands":
          if (this[key] && resetCopy && this[key].length > 0) {
            queryComponents.push(key + "=" + this[key]);
          }
          break;
        case "selectedFavorites":
          if (this[key] && resetCopy && Object.keys(this[key]).length > 0) {
            queryComponents.push(
              key + "=" + encodeURIComponent(Object.keys(this[key]))
            );
          }
          break;
        default:
          if (this[key] && resetCopy && resetCopy[key] !== this[key]) {
            queryComponents.push(key + "=" + this[key]);
          }

          break;
      }
    }
    finalquery = "?" + queryComponents.join("&");
    if (finalquery === "?") {
      finalquery = "";
    }
    if (resetCopy && window.location.search !== finalquery) {
      const newurl =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        finalquery;

      window.history.pushState({ path: newurl }, "", newurl);
    }
  };
}

const filterStore = new FilterStore();

window.addEventListener("popstate", () => filterStore.loadURL(), false);

export default filterStore;
