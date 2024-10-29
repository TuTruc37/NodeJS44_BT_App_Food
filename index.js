// B1: import lib express
import express from "express";
// import pool from "./db.js";
// import { OK, INTERNAL_SERVER } from "./const.js";
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
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

app.listen(8080, () => {
  console.log("Server is starting with port 8080");
});
