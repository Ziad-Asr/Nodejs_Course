const fs = require("fs");
const http = require("http");
const { dirname } = require("path");
const url = require("url");

////////////////////////////////////////
// Files

// // blocking - Synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf8");
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}. \nCreated in ${Date.now()}`;
// fs.writeFileSync("./txt/input.txt", textOut);
// console.log("File written");

// //Non-blocking - Asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log("Error");

//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);

//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) =>
//         console.log("File hasbeen written")
//       );
//     });
//   });
// });
// console.log("Will read file");

////////////////////////////////////////
// Server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW.");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT.");
  } else if (pathName === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
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
