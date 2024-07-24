// pages/api/callGraph.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getGraphToken } from "../api/graph/getGraphToken";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = await getGraphToken();

    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data from Microsoft Graph API");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
