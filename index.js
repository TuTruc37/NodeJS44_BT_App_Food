// B1: import lib express
import express from "express";

// B2: tạo object express
const app = express();

// B3: define port cho BE chạy
// params 1: define port BE
// params 2: callback function

app.get("/", (req, res) => {
  res.send("Hello, Node44! This is Node.js and Express server."); // trả về kết quả 'Hello, World!' khi gửi request đến '/'
});

app.listen(8080, () => {
  console.log("Server is starting with port 8080");
});
