import React, { useState, useEffect, Suspense, lazy } from "react";

import "./App.css";

import { Header } from "./Header.js";
import { Sidebar } from "./Sidebar/Sidebar.js";
import { Content } from "./Content.js";
import { ContentReleases } from "./ContentReleases.js";
import { About } from "./About.js";

import FilterStore from "./FilterStore.js";
import { SmartphoneDetails } from "./SmartphoneDetails.js";

import { observer } from "mobx-react-lite";
import SmartphoneStore from "./SmartphoneStore";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const ContentCharts = lazy(() => import("./ContentCharts"));

const NoResultsInfo = () => (
  <div className="no-results-container">
    <div className="no-results__header">No results</div>
    <div className="no-results__description">
      The filter criteria were probably too strict.
      <br />
      Remove some filters or click{" "}
      <span
        className="here-remove-filters"
        onClick={() =>
          document.getElementById("js_resetAllFiltersButton").click()
        }
      >
        here
      </span>{" "}
      to remove all filters.
    </div>
  </div>
);

const LoadingInfo = () => (
  <div className="no-results-container">
    <div className="loading-info__header">Loading phones...</div>
  </div>
);

const getContentWithURL = (currentURL) => {
  let content = <Content />;
  switch (currentURL) {
    case "/about":
      return;
    case "/releases":
      content = <ContentReleases />;
      break;
    case "/charts":
      content = <ContentCharts />;
      break;
    default:
      break;
  }

  if (SmartphoneStore.listOfFilteredAndScoredObjects.length < 1) {
    content = <NoResultsInfo />;
  }
  if (SmartphoneStore.hasLoaded === false) {
    content = <LoadingInfo />;
  }
  return !FilterStore.sidebarHidden && window.innerWidth < 600 ? (
    <div />
  ) : (
    content
  );
};

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#009688",
  "#4caf50",
  "#ff5722",
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App = observer(() => {
  const [primaryColor, setPrimaryColor] = useState(
    getRandomInt(0, colors.length - 1)
  );
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors[primaryColor],
        contrastText: "#fff",
      },
    },
  });
  document.documentElement.style.setProperty(
    "--primary-color",
    colors[primaryColor]
  );

  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  useEffect(() => {
    window.addEventListener(
      "popstate",
      () => setCurrentURL(window.location.pathname),
      false
    );
    window.addEventListener("keydown", (e) => {
      const { key } = e;
      if (key === "Escape") {
        setPrimaryColor((primaryColor) => {
          if (primaryColor === colors.length - 1) {
            return 0;
          } else {
            return primaryColor + 1;
          }
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxImgHeight = window.innerWidth < 600 ? 250 : 450;
  return (
    <ThemeProvider theme={theme}>
      <div
        className={
          "react-head " + (FilterStore.lightmode ? "lightmode" : "darkmode")
        }
      >
        <Header />
        {currentURL === "/about" ? (
          <About />
        ) : (
          <React.Fragment>
            <Sidebar />
            <Suspense fallback={<div>Loading...</div>}>
              {getContentWithURL(currentURL)}
            </Suspense>
          </React.Fragment>
        )}
        {FilterStore.modalSmartphone && (
          <div className="modal-container">
            <SmartphoneDetails
              smartphone={FilterStore.modalSmartphone}
              maxImgHeight={maxImgHeight}
              filterStore={FilterStore}
            ></SmartphoneDetails>
            <div className="modal-overlay"> </div>
          </div>
        )}
        <button
          className="sidebar-button"
          onClick={() => FilterStore.toggleAttribute("sidebarHidden")}
        >
          <div
            className="flex"
            style={{
              padding: "4px 8px",
              backgroundColor: "#ffffff2e",
              borderRadius: "4px",
            }}
          >
            <svg
              viewBox="0 0 22 21"
              style={{ height: 20, marginRight: 8, fill: "var(--just-white)" }}
            >
              <path d="M19.8490043,4.05480957 C18.2895154,5.73921712 16.3637795,7.72094727 14.0717967,10 C14.0717967,14.3344727 14.0717967,17.3344727 14.0717967,19 C14.0717967,21.498291 11.5630159,21.3812256 10.4968538,20.3779297 C9.43069169,19.3746338 8.66185639,18.5505371 7.86682655,17.6688232 C7.07179672,16.7871094 7.07179672,16.0102539 7.07179672,15.0843506 C7.07179672,14.4670817 7.07179672,12.7722982 7.07179672,10 C4.67798848,7.62166341 2.72038287,5.63993327 1.19897987,4.05480957 C-1.08312462,1.67712402 0.0865531157,3.55271368e-15 3.07179672,3.55271368e-15 L18.0717967,3.55271368e-15 C20.9239555,3.55271368e-15 22.1882377,1.52819824 19.8490043,4.05480957 Z M2.45972206,2 L9.07227089,9 L9.07227089,16.0726318 L12.0722709,19.0112305 L12.0722709,9 L18.8007865,2 L2.45972206,2 Z" />
            </svg>
            <span>{FilterStore.sidebarHidden ? "Filter" : "Show"} Phones</span>
          </div>
          <span className="smartphoneCount">
            {SmartphoneStore.listOfFilteredAndScoredObjects.length +
              "/" +
              SmartphoneStore.obj.length}
          </span>
        </button>
      </div>
    </ThemeProvider>
  );
});

export default App;
