import express, { Request, Response } from "express";
const router = express.Router();
import { SendText } from "../controllers/twilio";

router.post("/send", SendText);

export default router;
