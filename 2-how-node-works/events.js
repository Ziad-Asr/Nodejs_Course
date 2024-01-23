const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", (event) => {
  console.log("There is a new sale");
});

myEmitter.on("newSale", (event) => {
  console.log("Customer name: Ziad Elsayed");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are ${stock} items left in the store`);
});

myEmitter.emit("newSale", 9);

/////////////////////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received");
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests");
});
