import React from "react";
import { observer } from "mobx-react-lite";

import { IconSwitch } from "./IconSwitch";
import { i18n } from "./LocalizationStore";

export const Header = observer(() => {
  return (
    <header className="header">
      <div className="header-inner container" style={{ alignItems: "center" }}>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMS42/U4J6AAAAORJREFUWEftjkEOgkAQBHmL+k1j4sc1MdMtKRlpXU5KJ3UAtoqd9u0b3eF4un1D6eNbiieUPj4Fz5frg/lP5vB76ePrfkBWLzA/nFDaywXWoO/pQ0pp21+AB7v3pf3wBToYSD1B30tDDKSeoO+lIQZST9D30hADqSfoe2mIgdQT9L00xEDqCfpeGmIg9QR9Lw0xkHqCvpeGGEg9Qd9LQwyknqDvpSEGUk/Q99IQA6kn6HtpiIHUE/S9NMRA6gn6HkN67t6XtuqJzve6g9370ra/QEppH3ui9OeWDr2jtO0u8Kebpjtt39HxDQn2FwAAAABJRU5ErkJggg=="
          alt="logo"
          style={{ marginRight: 4 }}
        />
        <a className="logo-text" href="/">
          smartphone-picker
        </a>

        <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 5 3">
          <desc>Flag of Germany</desc>
          <rect width="5" height="3" y="0" x="0" fill="#000" />
          <rect width="5" height="2" y="1" x="0" fill="#D00" />
          <rect width="5" height="1" y="2" x="0" fill="#FFCE00" />
        </svg>
        <span style={{ flex: 1 }}></span>
        <a
          href="/about"
          className="main-menu-link"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, "", "/about");
            window.dispatchEvent(
              new PopStateEvent("popstate", { state: null })
            );
          }}
        >
          {i18n("about")}
        </a>
        <IconSwitch
          name="lightmode"
          icon={
            <svg
              className="nightmode-switch"
              viewBox="0 0 1000 1000"
              height="28px"
            >
              <title>Toggle nightmode</title>
              <g>
                <path d="M500,10C229.4,10,10,229.4,10,500s219.4,490,490,490s490-219.4,490-490S770.6,10,500,10z M387.5,728C250,634.6,217.9,452.6,315.8,321.6c83.5-111.8,234.5-150.1,362.5-100.9c-56.3,14.6-107.8,47.1-144.3,95.9C450,428.9,477.6,584.9,595.4,665c51.3,34.8,111.1,49.5,169.3,45.8C660.6,797,504.8,807.8,387.5,728z" />
              </g>
            </svg>
          }
        />
      </div>
    </header>
  );
});
