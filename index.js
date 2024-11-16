// B1: import lib express
import express from "express";
// import pool from "./db.js";
// import { OK, INTERNAL_SERVER } from "./const.js";
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io"; //lib socket.io dùng để tạo Server chat realtime
import { createServer } from "http"; // socket.io

// B2: tạo object express
const app = express();

// define middleware để public , folder public ; test trên google: http://localhost:8080/public/imgs/1730097071098_cat.jpg
app.use(express.static("."));

// thêm middleware để đọc data json

// đảm bảo cors được bật trước khi chạy xuống rootRoutes
app.use(
  cors({
    // origin: "*",
    origin: "http://localhost:3000",
    // chỉ cho phép request từ domain này, cấp quyền cho FE
    credentials: true, // cho phép FE request gửi cookie
    // methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
    // cho phép các phương thức request
    methods: ["GET", "HEAD", "OPTIONS", "POST"],
  })
);
// B3: Tạo http server : socket.io
const server = createServer(app); // server nhưng chưa phải là server của socket.io

// tạo socket.io server
// io: object của socket client
// socket: object của socket client
const io = new Server(server, {
  cors: {
    origin: "*",
  },
}); //mapping server với socket.io =>  SocketIO server

// lắng nghe event kết nối từ client (FE) qua SocketIO
// on: nhận event
// emit: gửi event đi
// on và emit có 2 params:
// param 1: event type: event của SocketIO hoặc event của user tự define
//  param 2: function
let number = 0; //đặt biến toàn cục
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-click", () => {
    console.log("FE send click");
    number = number + 1;
    // server bắn event cho tất cả client
    io.emit("send-new-number", number);
  });
  // nhận evernt reduce-number
  socket.on("reduce-number", () => {
    console.log("FE send reduce-number");
    number = number - 1;
    // server bắn event cho tất cả client
    io.emit("send-new-number", number);
  });
});

// (socket) BE sẽ nhận event từ FE client

// đảm bảo chạy trước khi chạy xuống rootRoutes để các dữ liệu ở body được chuyển từ JSON sang đối tượng JS
app.use(express.json());
// thêm middleware để đọc cookie từ request
app.use(cookieParser());
// import rootRoutes
app.use(rootRoutes);

// B3: define port cho BE chạy
// params 1: define port BE
// params 2: callback function

app.get("/", (req, res) => {
  res.send("Hello node44");
});

app.get("/test", (req, res) => {
  res.send("test api");
});

// demo get params từ URL
// app.post('/users/:id/:hoTen', (req, res) => {
//     let params = req.params;
//     let {id, hoTen} = params;
//     let body = req.body;
//     res.send({
//         id,
//         hoTen
//     });
// })

// demo get query từ URL
app.get("/test-query", (req, res) => {
  let query = req.query;
  res.send(query);
});

// demo get header from request

app.get("/test-header", (req, res) => {
  let headers = req.headers;
  res.send(headers);
});

// app.get('/users', async (req, res) => {
//     try {
//         const [data] = await pool.query(`
//             SELECT * FROM users
//             LIMIT 1
//         `);
//         res.status(OK).json(data);
//     } catch(error) {
//         res.status(INTERNAL_SERVER).json({message: "error"});
//     }
// })
// thay app thành server
server.listen(8080, () => {
  console.log("Server is starting with port 8080");
});

// express không support trực tiếp socketIO mà phải cài lib socket.io
