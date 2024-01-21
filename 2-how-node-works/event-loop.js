const fs = require("fs");

// setTimeout(() => console.log("timer 1 finshed"), 0);
// setImmediate(() => console.log("timer 2 finshed"));

// fs.readFile("./test-file.txt", () => {
//   console.log("i/o finshed");
// });

// console.log("Hello,from the top level code");

// // Top level code executes first and then execute all callbacks.
// // Here there is nothing related to the event loop. (Because there is no callbacks here)
//
// // Code is in order due to the order I write them only not due to any other thing.
// // (Exept the read of the big file takes long tiem so it is the last one)

// #############################################################################################################
// #############################################################################################################

setTimeout(() => console.log("timer 1 finshed"), 0);
setImmediate(() => console.log("timer 2 finshed"));

fs.readFile("./test-file.txt", () => {
  console.log("i/o finshed");
});

console.log("Hello,from the top level code");
