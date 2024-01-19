const fs = require("fs");
const http = require("http");
const url = require("url");
const { dirname } = require("path");

const replaceTemplate = require("./modules/replaceTemplate");

////////////////////////////////////////
// Files
////////////////////////////////////////
// blocking - Synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf8");
console.log(textIn);
const textOut = `This is what we know about avocado: ${textIn}. \nCreated in ${Date.now()}`;
fs.writeFileSync("./txt/input.txt", textOut);
console.log("File written");

//Non-blocking - Asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  if (err) return console.log("Error");

  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    console.log(data2);

    fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) =>
        console.log("File hasbeen written")
      );
    });
  });
});
console.log("Will read file");

////////////////////////////////////////
// Server
///////////////////////////////////////
const templateproduct = fs.readFileSync(
  //use sync here because it will be read 1 time only when the fie run for the first time
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
      // It is a must to inform the browser that the incoming response is html file.
    });

    const cardHTML = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    // Not it is an array of html onjects (<figur></figur>) that has the real data from the data file.

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardHTML);

    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(templateproduct, product);
    res.end(output);

    // Api
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello, world",
    });
    res.end("<H1>Page not found.</H1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening from the request from the port 8000!");
});
