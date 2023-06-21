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
        From: "demo@getboon.ai",
        To: "tms.vivaldi@gmail.com",
        Subject: "Hello from Postmark",
        HtmlBody: "<strong>Hello</strong> dear Postmark user.",
        TextBody: "Hello from Postmark!",
        MessageStream: "outbound",
      });

      console.log("Email sent successfully!");

      console.log("Attempting to send data...");
      const response = await fetch("https://boon-beta.onrender.com/api/loads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickup: {
            address: "1801 DOCTOR M.L.K. JR BLVD, STOCKTON, CA",
            appointment_end_time: "2023-06-23 12:00:00",
            appointment_start_time: "2023-06-23 11:00:00",
          },
          po_number: "1010408011",
          destination: {
            address: "121 Baker ST NW, ATLANTA, GA",
            appointment_end_time: "2023-06-28 11:00:00",
            appointment_start_time: "2023-06-28 11:00:00",
          },
          reference_number: "1010408011",
          carrier: "BTI",
          order_number: "1010408011",
          customer: "CLOROX",
          bill_of_lading_number: "00446008526541470",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      console.log("Data sent successfully!");

      // Send the response when the email is successfully sent
      res.status(200).json({ status: "Received" });
    } catch (error) {
      console.error("Failed to send email or data:", error);

      // Send a 500 - Internal Server Error response if sending the email fails
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    console.log("Received non-POST request");
    res.status(405).json({ error: "Method not allowed" });
  }
}

// Add call to parsio
// Send the results to Mike

//maybe have to change code 200 to 201
