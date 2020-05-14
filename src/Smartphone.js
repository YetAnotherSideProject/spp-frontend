import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import amazonIcon from "./images/Amazon-Favicon-64x64.png";
import { getAttributeFromSmartphone } from "./helperFunctions";

export const Smartphone = observer(
  ({ smartphone, maxImgHeight, style, filterStore }) => {
    const [selectedModel, setSelectedModel] = useState(0);
    const [selectedType, setSelectedType] = useState(0);
    const { price, link } = smartphone.models[selectedModel].types[
      selectedType
    ];
    useEffect(() => {
      setSelectedModel(0);
      setSelectedType(0);
    }, [smartphone.models, filterStore.showPhonesWithoutPrices]);
    let height = (smartphone.length / 170) * 100 + "%";
    return (
      <div className="smartphone" style={style}>
        <div className="img-container-container">
          <div className="smartphone-filtercriteria">
            {getAttributeFromSmartphone(smartphone, filterStore.filterType)}
          </div>
          <div
            className={
              "img-container " +
              (filterStore.showBacksideDefault
                ? "img-container--backsideDefault"
                : "")
            }
            style={{
              height: maxImgHeight,
            }}
            onClick={(e) =>
              window.innerWidth < 600 && //only allow mobile devices to switch with click
              e.currentTarget.classList.toggle("img-container--is-flipped")
            }
          >
            <img
              style={
                filterStore.scaleInput ? { height } : { height: 100 + "%" }
              }
              className="qtip-img qtip-img-backside"
              onError={(e) => (e.target.alt = "No image")}
              src={"images/" + smartphone.image + "_back.jpg"}
              alt=""
            />
            <img
              style={
                filterStore.scaleInput
                  ? {
                      height: height,
                    }
                  : {
                      height: (165 / 165) * 100 + "%",
                    }
              }
              className="qtip-img"
              onError={(e) => (e.target.alt = "No image")}
              src={
                filterStore.emptySmartphones
                  ? "images/" + smartphone.image + "_blank.png"
                  : "images/" + smartphone.image + ".jpg"
              }
              alt=""
            />
          </div>
        </div>
        <div
          className="smartphone-details"
          onClick={() => {
            filterStore.modalSmartphone = smartphone;
          }}
        >
          <div className="flexBetween" style={{ marginBottom: 4 }}>
            <span className="smartphone-name " title={smartphone.name}>
              {smartphone.brand + " " + smartphone.name}
            </span>
            <svg
              viewBox="0 0 940 940"
              height="18px"
              className={
                "smartphone-fav-star " +
                (filterStore.selectedFavorites[
                  smartphone.brand + " " + smartphone.name
                ] != null
                  ? "smartphone-fav-star--clicked"
                  : "")
              }
              onClick={(e) => {
                e.stopPropagation();
                filterStore.toggleObjectAttribute(
                  "selectedFavorites",
                  smartphone.brand + " " + smartphone.name
                );
                filterStore.updateURL();
                if (Object.keys(filterStore.selectedFavorites).length < 1) {
                  filterStore.onlyShowFavedPhones = false;
                }
              }}
            >
              <path
                d="M885.344,319.071l-258-3.8l-102.7-264.399c-19.8-48.801-88.899-48.801-108.6,0l-102.7,264.399l-258,3.8
		c-53.4,3.101-75.1,70.2-33.7,103.9l209.2,181.4l-71.3,247.7c-14,50.899,41.1,92.899,86.5,65.899l224.3-122.7l224.3,122.601
		c45.4,27,100.5-15,86.5-65.9l-71.3-247.7l209.2-181.399C960.443,389.172,938.744,322.071,885.344,319.071z"
              />
            </svg>
          </div>
          <select
            className="smartphone-price-details"
            value={`${selectedModel}:${selectedType}`}
            onChange={(e) => {
              setSelectedModel(e.target.value.split(":")[0]);
              setSelectedType(e.target.value.split(":")[1]);
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {smartphone.models.map((model, modelIndex) => {
              return (
                <React.Fragment key={model.id}>
                  {model.types.map((type, typeIndex) => (
                    <option
                      value={modelIndex + ":" + typeIndex}
                      key={type.id}
                      className="smartphone-price-item"
                    >
                      {`${type.name} ${model.memory}GB ${model.storage}GB ${
                        type.fiveg ? "5G" : ""
                      } ${type.price !== -1 ? type.price : "N/A"}€`}
                    </option>
                  ))}
                  {modelIndex < smartphone.models.length - 1 && (
                    <option
                      key="divider"
                      value={modelIndex + ":divider"}
                      disabled
                      className="smartphone-price-item-divider"
                    >
                      ------------------------------
                    </option>
                  )}
                </React.Fragment>
              );
            })}
          </select>

          <details className="smartphone-totalscore">
            <summary style={{ padding: 2 }}>
              <span
                style={
                  smartphone.totalscore > 0
                    ? { color: "var(--highlight-color)" }
                    : { color: "var(--bad-color)" }
                }
              >
                {smartphone.totalscore} Points
              </span>
            </summary>
          </details>
          <div className="flexBetween">
            <span className="smartphone-price">
              {price !== -1 ? price : "N/A"}€
            </span>
            {link && (
              <div
                className="a-button a-button-primary"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  className="a-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={link}
                >
                  <span className="a-button-inner">
                    <img
                      alt=""
                      src={amazonIcon}
                      className="a-icon a-icon-shop-now"
                    />
                    <input
                      className="a-button-input"
                      type="submit"
                      value="Add to cart"
                    />
                    <span className="a-button-text">Shop Now</span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);
