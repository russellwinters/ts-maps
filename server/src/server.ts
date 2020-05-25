import express from "express";
const app = express();
import cors from "cors";
import * as dotenv from "dotenv";
import TwilioRoute from "./routes/twilio";

//configuring
dotenv.config();

//Middleware
app.use(express.json());
app.use(cors());

//Route
app.use("/api/twilio", TwilioRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
