const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //   // Solution1: No sreams
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });
  //   // That solution consumes the memory
  //  //(by reading the whole file and store it in a var and then starts to print it)

  //

  // Solution2: Sreams
  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     res.statusCode = 500; // Server error
  //     console.log(err);
  //     res.end("File not found");
  //   });
  // // This solution is good and it does not load all data into memory as solution1, but works with steams
  // // But it also have a problem, that it is a little slower, due to back preture made by these alot of streams
  // // (Solution is to use {{pip stream}})

  //

  // Solution3: Streaming with pip stream
  const readable = fs.createReadStream("./test-file.txt");
  readable.pipe(res); // readable => streams file, res => Writable destination
});

server.listen(8000, "127.0.0.1", (err, res) => {
  console.log("Server is on!");
});
