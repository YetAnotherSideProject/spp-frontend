export const getAttributeFromSmartphone = (smartphone, attribute) => {
  switch (attribute) {
    case "price":
      return smartphone.models[0].types[0][attribute] + "€";
    case "length":
    case "width":
      return smartphone[attribute] + "mm";
    case "display":
      return smartphone[attribute] + '"';
    default:
      return smartphone[attribute];
  }
};
