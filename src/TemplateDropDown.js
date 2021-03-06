import React, { useRef } from "react";

export const TemplateDropDown = ({ summary, detailCategories }) => {
  const detailsRef = useRef();
  return (
    <details ref={detailsRef} style={{ position: "relative" }}>
      <summary
        className="filter__summary"
        onFocus={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (detailsRef.current.hasAttribute("open")) {
            detailsRef.current.removeAttribute("open");
          }
        }}
      >
        {summary}
      </summary>
      <div className="filter-drop-down">
        {Object.keys(detailCategories).map((key) => (
          <div key={key}>
            <div className="filter-drop-down__header">{key}</div>
            {detailCategories[key].map((detail) => {
              return (
                <div
                  className="filter-drop-down__element"
                  key={detail.desc}
                  onClick={(e) => {
                    // close current details
                    detailsRef.current.removeAttribute("open");
                    // change url without reload
                    if (detail.href) {
                      window.history.pushState(
                        null,
                        detail.desc,
                        detail.href + window.location.search
                      );
                      // trigger popstate because pushState doesn't
                      window.dispatchEvent(
                        new PopStateEvent("popstate", { state: null })
                      );
                      e.preventDefault();
                    } else if (detail.clickHandler) {
                      detail.clickHandler();
                    }
                  }}
                >
                  <a className="filter-drop-down__link" href={detail.href}>
                    {detail.icon}
                    <span className="filter-drop-down__span">
                      {detail.desc}
                    </span>
                  </a>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </details>
  );
};
