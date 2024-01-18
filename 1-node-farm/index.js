const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf8");
console.log(textIn);

const textOut = `This is what we know about avocado: ${textIn}. \nCreated in ${Date.now()}`;
fs.writeFileSync("./txt/input.txt", textOut);
console.log("File written");

// const hello = "Hello world!";
// console.log(hello);
