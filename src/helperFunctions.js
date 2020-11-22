import { i18n } from "./LocalizationStore";

export const monthDiff = (dateFrom, dateTo) => {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
};

export const getAttributeFromSmartphone = (smartphone, attribute) => {
  switch (attribute) {
    case "price":
      return smartphone.models[0].types[0][attribute] + "€";
    case "length":
    case "width":
      return smartphone[attribute] + "mm";
    case "display":
      return smartphone[attribute] + '"';
    case "totalscore":
      return smartphone[attribute] + " " + i18n("points");
    default:
      return smartphone[attribute];
  }
};
