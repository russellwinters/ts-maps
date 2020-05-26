import { RequestHandler, Request, Response } from "express";
import twilio from "twilio";
import * as TwilioClient from "twilio/lib/rest/Twilio";

//Using this instead of importing dotenv and doing that config.
import { ENV_CONFIG } from "../envconfig";
ENV_CONFIG;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client: TwilioClient = twilio(accountSid, authToken);
type RequestBody = {
  sendTo: number;
  message: string;
};

export const SendText: RequestHandler = (req: Request, res: Response) => {
  const { sendTo, message } = req.body as RequestBody;

  const messageInstance = {
    body: message,
    from: "+17787456009",
    to: `+1${sendTo}`,
  };
  client.messages.create(messageInstance);

  res.json(["Successfull Text Sent"]);
};
