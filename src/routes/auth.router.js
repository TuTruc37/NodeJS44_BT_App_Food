import express from "express";
import { login, register,loginFacebook } from "../controllers/auth.controller.js";
const authRouter = express.Router();

// regiter ''
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/login-face",loginFacebook)
export default authRouter;
