import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

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

    res.status(201).json({ data: "success" });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json(e);
  }
};

export default stationRequest;
