module.exports = (template, productElement) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, productElement.productName);
  output = output.replace(/{%IMAGE%}/g, productElement.image);
  output = output.replace(/{%FROM%}/g, productElement.from);
  output = output.replace(/{%NUTRIENTS%}/g, productElement.nutrients);
  output = output.replace(/{%QUANTITY%}/g, productElement.quantity);
  output = output.replace(/{%PRICE%}/g, productElement.price);
  output = output.replace(/{%DESCRIPTION%}/g, productElement.description);
  output = output.replace(/{%ID%}/g, productElement.id);

  if (!productElement.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};
