import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/create-user", createUser);
userRoutes.get("/get-users", getUser);
userRoutes.delete("/delete-user/:user_id", deleteUser);
userRoutes.put("/update-user/:user_id", updateUser);

export default userRoutes;
