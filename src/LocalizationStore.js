import { makeAutoObservable, runInAction } from "mobx";

let translation;
class LocalizationStore {
  loaded = false;
  strings = {};

  constructor() {
    makeAutoObservable(this);
    this.init();
  }

  init = async () => {
    const locale = (navigator.language || navigator.userLanguage).substr(0, 2);
    let response = await fetch(`/strings/${locale}.json`);
    let json;
    try {
      json = await response.json();
    } catch (error) {
      response = await fetch(`/strings/en.json`);
      json = await response.json();
    }
    runInAction(() => {
      this.loaded = true;
      this.strings = json;
    });
  };

  i18n = (key) => {
    if (!this.loaded) {
      return "";
    }
    translation = this.strings[key];
    if (translation) {
      return translation;
    }
    console.log("Couldn't find string with key: " + key);
    return "MISSING STRING";
  };
}

const i18n = new LocalizationStore().i18n;
export { i18n };
