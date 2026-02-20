import express from "express";
const router = express.Router();
import { getResponse, helloWorld } from "../controllers/aiChatBot.controller";

router.route("/").post(getResponse).get(helloWorld);
export default router;
