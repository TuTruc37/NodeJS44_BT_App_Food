import express from "express";
import { getListVideo } from "./video.controller.js";
const videoRouter = express.Router();
videoRouter.get('/get-videos',getListVideo)

export default videoRouter;
