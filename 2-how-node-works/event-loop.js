const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4; // Change number of thread pool. (Default = 4)

// setTimeout(() => console.log("timer 1 finshed"), 0);
// setImmediate(() => console.log("timer 2 immediate finshed"));

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

setTimeout(() => console.log("Timer 1 finished"), 0);
setImmediate(() => console.log("Immediate 1 finished"));

fs.readFile("test-file.txt", () => {
  console.log("I/O finished");
  console.log("----------------");

  setTimeout(() => console.log("Timer 2 finished"), 0);
  setTimeout(() => console.log("Timer 3 finished"), 3000);
  setImmediate(() => console.log("Immediate 2 finished"));

  process.nextTick(() => console.log("Process.nextTick"));

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted");

  // These 4 increptions run at the same time because there is 4 thread pools working at the same time.
  // If I changesd them to 2, so each 2 recursive increptions ((only)) will have time like each other
  // **IMPORTANT** => All of this nly happens with {{1-Ascync functions 2-Inside callback functionss}}
});

console.log("Hello from the top-level code");
