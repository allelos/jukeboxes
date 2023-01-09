import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const stationRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const { name } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: "A2:B2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, new Date().toLocaleDateString()]],
      },
    });

    res.status(201).json({ data: "success" });
  } catch (e) {
    console.log("error: ", e);
    res.status(500).json(e);
  }
};

export default stationRequest;
