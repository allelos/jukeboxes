import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

const stationRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = await google.auth.getClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const { name, genre, streamingUrl } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "A2:D2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, genre, streamingUrl, new Date().toLocaleDateString()]],
      },
    });

    const msg = {
      to: process.env.SENDGRID_EMAIL_RECIPIENT || "",
      from: "pem5775.jukeboxes.gr",
      subject: `You have a new request to add ${name} radio station`,
      text: `A new station request to add ${name} has been created. Please review :)`,
      html: `<ul>${[name, genre, streamingUrl]
        .filter(Boolean)
        .map((value) => `<li>${value}</li>`)
        .join("")}</ul>`,
    };

    sendgrid.send(msg);

    res.status(201).json({ data: "success" });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json(e);
  }
};

export default stationRequest;
