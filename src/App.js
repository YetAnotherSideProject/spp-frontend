import React, { useState, useEffect, Suspense, lazy } from "react";

import "./App.css";

import { Header } from "./Header.js";
import { SidebarContainer } from "./Sidebar/SidebarContainer.js";
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
        <div style={{ display: "flex", overflow: "auto" }}>
          {currentURL === "/about" ? (
            <About />
          ) : (
            <React.Fragment>
              <SidebarContainer />
              <Suspense fallback={<div>Loading...</div>}>
                {getContentWithURL(currentURL)}
              </Suspense>
            </React.Fragment>
          )}
        </div>
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
      </div>
    </ThemeProvider>
  );
});

export default App;
