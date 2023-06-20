// pages/api/postmark-webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import * as postmark from "postmark";

type Data = {
  status?: string;
  error?: string;
};

type PostmarkEvent = {
  Metadata: {
    example: string;
    example_2: string;
  };
  RecordType: string;
  FirstOpen: boolean;
  Client: {
    Name: string;
    Company: string;
    Family: string;
  };
  OS: {
    Name: string;
    Company: string;
    Family: string;
  };
  Platform: string;
  UserAgent: string;
  ReadSeconds: number;
  Geo: {
    CountryISOCode: string;
    Country: string;
    RegionISOCode: string;
    Region: string;
    City: string;
    Zip: string;
    Coords: string;
    IP: string;
  };
  MessageID: string;
  MessageStream: string;
  ReceivedAt: string;
  Tag: string;
  Recipient: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const emailEvent: PostmarkEvent = req.body;
    console.log(emailEvent);

    var client = new postmark.ServerClient(
      "47b1320e-2a0f-4533-91a9-a2c065475c50"
    );

    try {
      await client.sendEmail({
        From: "support@getboon.ai",
        To: emailEvent.Recipient,
        Subject: "Hello from Postmark",
        HtmlBody: "<strong>Hello</strong> dear Postmark user.",
        TextBody: "Hello from Postmark!",
        MessageStream: "outbound",
      });

      // Send the response when the email is successfully sent
      res.status(200).json({ status: "Received" });
    } catch (error) {
      // Send a 500 - Internal Server Error response if sending the email fails
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
