import express from "express";
import { createUser, getUser ,deleteUser} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/:id/:hoTen", createUser);
userRoutes.get("/get-users", getUser);
userRoutes.delete("/delete-user/:user_id", deleteUser);

export default userRoutes;
