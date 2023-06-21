// pages/api/postmark-webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import * as postmark from "postmark";

type Data = {
  status?: string;
  error?: string;
};

type PostmarkEvent = {
  RecordType: string;
  ServerID: number;
  MessageStream: string;
  MessageID: string;
  Recipient: string;
  Tag: string;
  DeliveredAt: string;
  Details: string;
  Metadata: {
    example: string;
    example_2: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const emailEvent: PostmarkEvent = req.body;
    console.log("Received POST request:", emailEvent);

    var client = new postmark.ServerClient(
      "47b1320e-2a0f-4533-91a9-a2c065475c50"
    );

    try {
      console.log("Attempting to send email...");
      await client.sendEmail({
        From: "support@getboon.ai",
        To: emailEvent.Recipient,
        Subject: "Hello from Postmark",
        HtmlBody: "<strong>Hello</strong> dear Postmark user.",
        TextBody: "Hello from Postmark!",
        MessageStream: "outbound",
      });

      console.log("Email sent successfully!");

      // Send the response when the email is successfully sent
      res.status(200).json({ status: "Received" });
    } catch (error) {
      console.error("Failed to send email:", error);

      // Send a 500 - Internal Server Error response if sending the email fails
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    console.log("Received non-POST request");
    res.status(405).json({ error: "Method not allowed" });
  }
}
