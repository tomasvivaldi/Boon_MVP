// pages/api/postmark-webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import * as postmark from "postmark";
import { useState } from "react";
import winston from "winston";

// Create a logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Output logs to the console
  ],
});

type Data = {
  status?: string;
  error?: string;
};

type PostmarkEvent = {
  FromName: string;
  MessageStream: string;
  From: string;
  FromFull: {
    Email: string;
    Name: string;
    MailboxHash: string;
  };
  To: string;
  ToFull: {
    Email: string;
    Name: string;
    MailboxHash: string;
  }[];
  Cc: string;
  CcFull: {
    Email: string;
    Name: string;
    MailboxHash: string;
  }[];
  Bcc: string;
  BccFull: {
    Email: string;
    Name: string;
    MailboxHash: string;
  }[];
  OriginalRecipient: string;
  Subject: string;
  MessageID: string;
  ReplyTo: string;
  MailboxHash: string;
  Date: string;
  TextBody: string;
  HtmlBody: string;
  StrippedTextReply: string;
  Tag: string;
  Headers: {
    Name: string;
    Value: string;
  }[];
  Attachments: {
    Content: string;
    ContentLength: number;
    Name: string;
    ContentType: string;
    ContentID: string;
  }[];
};

interface PickupDestination {
  address: string;
  appointment_end_time: string;
  appointment_start_time: string;
}

interface ParsedData {
  pickup: PickupDestination;
  po_number: string;
  destination: PickupDestination;
  reference_number: string;
  carrier: string;
  order_number: string;
  customer: string;
  bill_of_lading_number: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const apiKey = process.env.NEXT_PUBLIC_PARSIO_API;
    const uploadUrl = `https://api.parsio.io/mailboxes/${process.env.NEXT_PUBLIC_PARSIO_MAILBOX_ID}/upload`;
    const parseUrl = "https://api.parsio.io/docs"; // Parse document endpoint

    const emailEvent: PostmarkEvent = req.body;
    console.log("Received POST request:", emailEvent);

    var client = new postmark.ServerClient(
      "47b1320e-2a0f-4533-91a9-a2c065475c50"
    );

    if (emailEvent.Attachments && emailEvent.Attachments.length > 0) {
      const mockData = {
        vendorName: "",
        vendorContact: "",
        vendorAddress: "",
        customerAddress: "",
        customerName: "",
        customerContact: "",
        orderNumber: "",
        // quickbooksLocation: "",
        pickupDate: "",
        pickupTime: "",
        dropoffDate: "",
        dropoffTime: "",
        loadDescription: "",
        shippingUnits: "",
        totalWeight: "",
        sealNumber: "",
        container: "",
        vin: "",
        table1: [],
        table: [],
      };
      let emailData = {
        vendorName: "Missing",
        vendorContact: "Missing",
        vendorAddress: "Missing",
        customerAddress: "Missing",
        customerName: "Missing",
        customerContact: "Missing",
        orderNumber: "Missing",
        pickupDate: "Missing",
        pickupTime: "Missing",
        dropoffDate: "Missing",
        dropoffTime: "Missing",
        loadDescription: "Missing",
        shippingUnits: "Missing",
        totalWeight: "Missing",
        sealNumber: "Missing",
        container: "Missing",
        vin: "Missing",
        table1: [["Missing", "Missing", "Missing"]],
        table: [["Missing", "Missing", "Missing"]],
      };
      // Extract base64 content from the first attachment
      let base64Content = emailEvent.Attachments[0].Content;
      // Decode the base64 content to a Blob
      let decodedContent = atob(base64Content);
      let arrayBuffer = new ArrayBuffer(decodedContent.length);
      let uint8Array = new Uint8Array(arrayBuffer);

      for (let i = 0; i < decodedContent.length; i++) {
        uint8Array[i] = decodedContent.charCodeAt(i);
      }

      let blob = new Blob([uint8Array]);

      // Append blob to FormData
      let formData = new FormData();
      formData.append("file", blob, emailEvent.Attachments[0].Name);

      // Check if apiKey is defined, throw an error if it's not
      if (!apiKey) {
        throw new Error("API key is not set");
      }
      let requestOptions = {
        method: "POST",
        headers: {
          "X-API-Key": apiKey,
        },
        body: formData,
      };

      fetch(uploadUrl, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("data from Parsio", data);
          const documentId = data;

          // Now fetch the document data using the documentId
          const docUrl = `https://api.parsio.io/docs/${documentId}`;
          let docOptions = {
            method: "GET",
            headers: {
              "X-API-Key": apiKey,
            },
          };

          fetch(docUrl, docOptions)
            .then((response) => response.json())
            .then((documentData) => {
              console.log("Document data", documentData);

              // Parse the document using the documentId
              const parseDocUrl = `${parseUrl}/${documentId}/parse`;
              let parseDocOptions = {
                method: "POST",
                headers: {
                  "X-API-Key": apiKey,
                },
              };

              fetch(parseDocUrl, parseDocOptions)
                .then((response) => response.json())
                .then((parsedData) => {
                  console.log("Parsed document data", parsedData);
                  // Assuming the parsedData has fields like vendorName, orderNumber, etc.
                  // Find the respective fields in parsedData
                  const vendorNameField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "VendorName"
                  );
                  const vendorContactField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "Contact"
                  );
                  const vendorContactField2 = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "PHONE#"
                  );
                  const vendorAddressField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "VendorAddress"
                  );
                  const customerAddressField = parsedData.parsed.find(
                    (field: { name: string }) =>
                      field.name === "ShippingAddress"
                  );
                  const customerNameField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "CustomerName"
                  );
                  const customerContactField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "PHONE#2"
                  );
                  const orderNumberField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "Order Numbers"
                  );
                  const orderNumberField2 = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "Shipment Ref#"
                  );
                  const orderNumberField3 = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "Order #"
                  );
                  // const quickbooksLocationField = parsedData.parsed.find(
                  //   (field: { name: string }) =>
                  //     field.name === "QuickBooks Location"
                  // );
                  const pickupDateField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "DATE"
                  );
                  const pickupTimeField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "pickupTime"
                  );
                  const dropoffDateField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "DATE2"
                  );
                  const dropoffTimeField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "dropoffTime"
                  );
                  const loadDescriptionField = parsedData.parsed.find(
                    (field: { name: string }) =>
                      field.name === "loadDescription"
                  );
                  const goodsDescriptionField = parsedData.parsed.find(
                    (field: { name: string }) =>
                      field.name === "GOODS DESCRIPTION"
                  );
                  const shippingUnitsField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "shippingUnits"
                  );
                  const shippingUnitsField2 = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "PIECES"
                  );
                  const totalWeightField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "totalWeight"
                  );
                  const sealNumberField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "SEAL"
                  );
                  const containerField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "CONTAINER"
                  );
                  const vinField = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "VIN"
                  );
                  const table1Field = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "Table 1"
                  );
                  const table4Field = parsedData.parsed.find(
                    (field: { name: string }) => field.name === "Table 4"
                  );

                  // Extract values from the found fields or use default values
                  return {
                    vendorName:
                      vendorNameField?.value?.value || emailData.vendorName,
                    vendorContact:
                      vendorContactField2?.value?.value ||
                      vendorContactField?.value?.value ||
                      emailData.vendorContact,
                    vendorAddress:
                      vendorAddressField?.value?.content ||
                      emailData.vendorAddress,
                    customerAddress:
                      customerAddressField?.value?.content ||
                      emailData.customerAddress,
                    customerName:
                      customerNameField?.value?.value || emailData.vendorName,
                    customerContact:
                      // customerContactField2?.value?.value ||
                      customerContactField?.value?.value ||
                      emailData.customerContact,
                    orderNumber:
                      orderNumberField3?.value?.value ||
                      orderNumberField?.value?.value ||
                      orderNumberField2?.value?.value ||
                      emailData.orderNumber,
                    // quickbooksLocation:
                    //   quickbooksLocationField?.value?.value ||
                    //   emailData.quickbooksLocation,
                    pickupDate:
                      pickupDateField?.value?.value || emailData.pickupDate,
                    pickupTime:
                      pickupTimeField?.value?.value || emailData.pickupTime,
                    dropoffDate:
                      dropoffDateField?.value?.value || emailData.dropoffDate,
                    dropoffTime:
                      dropoffTimeField?.value?.value || emailData.dropoffTime,
                    loadDescription:
                      goodsDescriptionField?.value?.value ||
                      loadDescriptionField?.value?.value ||
                      emailData.loadDescription,
                    shippingUnits:
                      shippingUnitsField2?.value?.value ||
                      shippingUnitsField?.value?.value ||
                      emailData.shippingUnits,
                    totalWeight:
                      totalWeightField?.value?.value || emailData.totalWeight,
                    sealNumber:
                      sealNumberField?.value?.value || emailData.sealNumber,
                    container:
                      containerField?.value?.value || emailData.container,
                    vin: vinField?.value?.value || emailData.vin,
                    table1:
                      table4Field?.value ||
                      table1Field?.value ||
                      emailData.table1,
                    table: (() => {
                      const tableDataArray =
                        table4Field?.value ||
                        table1Field?.value ||
                        emailData.table1;

                      // If tableDataArray is not an array, return it as is
                      if (!Array.isArray(tableDataArray)) {
                        return tableDataArray;
                      }

                      // Convert the array to a map
                      const tableDataMap: { [key: string]: any } = {};
                      for (const row of tableDataArray) {
                        for (const cell of row) {
                          if (cell && cell.name && cell.value) {
                            tableDataMap[cell.name] = cell.value;
                          }
                        }
                      }

                      return tableDataMap;
                    })(),
                  };
                });
            })
            .catch((error) => console.log("Error parsing document", error))
            .then(async () => {
              try {
                console.log("Attempting to send email...");
                const sender = emailEvent.From;

                const parsedData: ParsedData = {
                  pickup: {
                    address: "1801 DOCTOR M.L.K. JR BLVD, STOCKTON, CA",
                    appointment_end_time: "2023-06-23 12:00:00",
                    appointment_start_time: "2023-06-23 11:00:00",
                  },
                  po_number: emailData.orderNumber,
                  destination: {
                    address: data.customerAddress,
                    appointment_end_time: "2023-06-28 11:00:00",
                    appointment_start_time: "2023-06-28 11:00:00",
                  },
                  reference_number: data.orderNumber,
                  carrier: "BTI",
                  order_number: data.orderNumber,
                  customer: "CLOROX",
                  bill_of_lading_number: "00446008526541470",
                };

                await client.sendEmail({
                  From: "demo@getboon.ai",
                  To: sender,
                  Subject: "Order Confirmation",
                  HtmlBody: `<h1>Order Confirmation</h1>
              <p>Thank you for your order! </p>
              <p>We're pleased to confirm that we have received your order and it's now being processed. You'll receive another email from us as soon as your items have shipped.</p>
              <p>Your order details are as follows: </p>
              <p>Order number: ${parsedData.order_number}</p>
              <p>Reference number: ${parsedData.reference_number}</p>
              <p>Pickup address: ${parsedData.pickup.address}</p>
              <p>Pickup appointment: ${parsedData.pickup.appointment_start_time} to ${parsedData.pickup.appointment_end_time}</p>
              <p>Destination address: ${parsedData.destination.address}</p>
              <p>Destination appointment: ${parsedData.destination.appointment_start_time} to ${parsedData.destination.appointment_end_time}</p>
              <p>Carrier: ${parsedData.carrier}</p>
              <p>Customer: ${parsedData.customer}</p>
              <p>Bill of lading number: ${parsedData.bill_of_lading_number}</p>
              <p>If you have any questions or need to make changes to your order, please feel free to reply to this email or call us at our customer service line.</p>
              <p>Thank you again for your business!</p>
              <p>Best regards,</p>
              <p>Boon Team</p>`,
                  TextBody: `Thank you for your order!\n
              We're pleased to confirm that we have received your order and it's now being processed. You'll receive another email from us as soon as your items have shipped.\n
              Your order details are as follows: \n
              Order number: ${parsedData.order_number}\n
              Reference number: ${parsedData.reference_number}\n
              Pickup address: ${parsedData.pickup.address}\n
              Pickup appointment: ${parsedData.pickup.appointment_start_time} to ${parsedData.pickup.appointment_end_time}\n
              Destination address: ${parsedData.destination.address}\n
              Destination appointment: ${parsedData.destination.appointment_start_time} to ${parsedData.destination.appointment_end_time}\n
              Carrier: ${parsedData.carrier}\n
              Customer: ${parsedData.customer}\n
              Bill of lading number: ${parsedData.bill_of_lading_number}\n
              If you have any questions or need to make changes to your order, please feel free to reply to this email or call us at our customer service line.\n
              Thank you again for your business!\n
              Best regards,\n
              Boon Team`,
                  MessageStream: "outbound",
                });

                console.log("Email sent successfully!");

                console.log("Attempting to send data...");
                const response = await fetch(
                  "https://boon-beta.onrender.com/api/loads",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(parsedData),
                  }
                );

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
            });
        })
        .catch((error) => console.log("Error fetching document data", error));
    } else {
      console.log("No file uploaded");
    }

    //////////////////////
  } else {
    console.log("Received non-POST request");
    res.status(405).json({ error: "Method not allowed" });
  }
}

function then(arg0: () => void) {
  throw new Error("Function not implemented.");
}
// Add call to parsio
// Send the results to Mike

//maybe have to change code 200 to 201
