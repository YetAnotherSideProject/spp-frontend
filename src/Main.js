import "./App.css";

import { Content } from "./Content.js";
import { ContentReleases } from "./ContentReleases.js";

import FilterStore from "./FilterStore.js";

import { observer } from "mobx-react-lite";
import SmartphoneStore from "./SmartphoneStore";
import { useWindowSize } from "./hooks/useWindowSize";

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

export const Main = observer(({ currentURL }) => {
  const size = useWindowSize();
  let content = <Content />;
  switch (currentURL) {
    case "/about":
      return;
    case "/releases":
      content = <ContentReleases />;
      break;
    default:
      break;
  }

  if (SmartphoneStore.listOfFilteredAndSortedObjects.length < 1) {
    content = <NoResultsInfo />;
  }
  if (SmartphoneStore.hasLoaded === false) {
    content = <LoadingInfo />;
  }
  return !FilterStore.sidebarHidden && size.width < 600 ? <div /> : content;
});
