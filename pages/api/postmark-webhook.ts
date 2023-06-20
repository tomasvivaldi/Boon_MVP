// pages/api/postmark-webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import * as postmark from "postmark";

type Data = {
  status?: string;
  error?: string;
};

type PostmarkEvent = {
  From: string;
  To: string;
  Subject: string;
  TextBody: string;
  HtmlBody: string;
  MessageStream: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Parse the JSON body of the request
    const emailEvent: PostmarkEvent = req.body;

    // Handle the email event
    console.log(emailEvent);

    // Create an instance of the Postmark client and send an email
    var client = new postmark.ServerClient(
      "47b1320e-2a0f-4533-91a9-a2c065475c50"
    );

    client.sendEmail({
      From: "support@getboon.ai",
      To: emailEvent.From,
      Subject: "Hello from Postmark",
      HtmlBody: "<strong>Hello</strong> dear Postmark user.",
      TextBody: "Hello from Postmark!",
      MessageStream: "outbound",
    });

    // Send a response
    res.status(200).json({ status: "Received" });
  } else {
    // If it's not a POST request, return 405 - Method Not Allowed
    res.status(405).json({ error: "Method not allowed" });
  }
}
