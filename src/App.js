import React, { useState, useEffect, Suspense } from "react";

import "./App.css";

import { Header } from "./Header.js";
import { SidebarContainer } from "./Sidebar/SidebarContainer.js";
import { Content } from "./Content.js";
import { ContentReleases } from "./ContentReleases.js";
import { About } from "./About.js";

import FilterStore from "./FilterStore.js";

import { observer } from "mobx-react-lite";
import SmartphoneStore from "./SmartphoneStore";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#5850ec",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const ContentCharts = React.lazy(() => import("./ContentCharts"));

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

const App = observer(() => {
  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  useEffect(() => {
    window.addEventListener(
      "popstate",
      () => setCurrentURL(window.location.pathname),
      false
    );
  });

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
      </div>
    </ThemeProvider>
  );
});

export default App;
