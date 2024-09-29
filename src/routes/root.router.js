import express from "express";
import userRoutes from "./user.router.js";
import videoRouter from "./video.router.js";
import authRouter from "./auth.router.js";

// tạo object router tổng
const rootRoutes = express.Router();

rootRoutes.use("/users", userRoutes);
rootRoutes.use("/videos", videoRouter);
rootRoutes.use("/auth",authRouter)

// export rootRoutes cho index.js dùng
export default rootRoutes;
