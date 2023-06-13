"use client";
import "@/styles/globals.css";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import * as UTIF from "utif";
import dynamic from "next/dynamic";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ProductField {
  id: string;
  name: string;
  value: string;
  format_out: string;

  shippingUnits: string;
  weight: string;
  goodsDescription: string;
}

const handleClose = () => {
  // Add your close functionality here
  console.log("Close button clicked");
};

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

export default function ScanUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [data, setData] = useState(mockData);

  const handleSubmit = () => {
    console.log("Submit button clicked");

    // Add your code to upload the file here
    if (uploadedFile) {
      const uploadUrl = `https://api.parsio.io/mailboxes/${process.env.NEXT_PUBLIC_PARSIO_MAILBOX_ID}/upload`;
      const parseUrl = "https://api.parsio.io/docs"; // Parse document endpoint
      const apiKey = process.env.NEXT_PUBLIC_PARSIO_API;

      // Check if apiKey is defined, throw an error if it's not
      if (!apiKey) {
        throw new Error("API key is not set");
      }

      let formData = new FormData();
      formData.append("file", uploadedFile);

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
                  setData(() => {
                    // Initialize default values
                    const defaultData = {
                      vendorName: "Missing",
                      vendorContact: "Missing",
                      vendorAddress: "Missing",
                      customerAddress: "Missing",
                      customerName: "Missing",
                      customerContact: "Missing",
                      orderNumber: "Missing",
                      // quickbooksLocation: "Missing",
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
                      table1: [
                        ["Missing", "Missing", "Missing"],
                        ["Missing", "Missing", "Missing"],
                        ["Missing", "Missing", "Missing"],
                      ],
                      table: [
                        ["Missing", "Missing", "Missing"],
                        ["Missing", "Missing", "Missing"],
                        ["Missing", "Missing", "Missing"],
                      ],
                    };

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
                      (field: { name: string }) =>
                        field.name === "VendorAddress"
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
                      (field: { name: string }) =>
                        field.name === "Order Numbers"
                    );
                    const orderNumberField2 = parsedData.parsed.find(
                      (field: { name: string }) =>
                        field.name === "Shipment Ref#"
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
                      (field: { name: string }) =>
                        field.name === "shippingUnits"
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
                        vendorNameField?.value?.value || defaultData.vendorName,
                      vendorContact:
                        vendorContactField2?.value?.value ||
                        vendorContactField?.value?.value ||
                        defaultData.vendorContact,
                      vendorAddress:
                        vendorAddressField?.value?.content ||
                        defaultData.vendorAddress,
                      customerAddress:
                        customerAddressField?.value?.content ||
                        defaultData.customerAddress,
                      customerName:
                        customerNameField?.value?.value ||
                        defaultData.vendorName,
                      customerContact:
                        // customerContactField2?.value?.value ||
                        customerContactField?.value?.value ||
                        defaultData.customerContact,
                      orderNumber:
                        orderNumberField?.value?.value ||
                        orderNumberField2?.value?.value ||
                        defaultData.orderNumber,
                      // quickbooksLocation:
                      //   quickbooksLocationField?.value?.value ||
                      //   defaultData.quickbooksLocation,
                      pickupDate:
                        pickupDateField?.value?.value || defaultData.pickupDate,
                      pickupTime:
                        pickupTimeField?.value?.value || defaultData.pickupTime,
                      dropoffDate:
                        dropoffDateField?.value?.value ||
                        defaultData.dropoffDate,
                      dropoffTime:
                        dropoffTimeField?.value?.value ||
                        defaultData.dropoffTime,
                      loadDescription:
                        goodsDescriptionField?.value?.value ||
                        loadDescriptionField?.value?.value ||
                        defaultData.loadDescription,
                      shippingUnits:
                        shippingUnitsField2?.value?.value ||
                        shippingUnitsField?.value?.value ||
                        defaultData.shippingUnits,
                      totalWeight:
                        totalWeightField?.value?.value ||
                        defaultData.totalWeight,
                      sealNumber:
                        sealNumberField?.value?.value || defaultData.sealNumber,
                      container:
                        containerField?.value?.value || defaultData.container,
                      vin: vinField?.value?.value || defaultData.vin,
                      table1:
                        table4Field?.value ||
                        table1Field?.value ||
                        defaultData.table1,
                      table: (() => {
                        const tableDataArray =
                          table4Field?.value ||
                          table1Field?.value ||
                          defaultData.table1;

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
                .catch((error) => console.log("Error parsing document", error));
            })
            .catch((error) =>
              console.log("Error fetching document data", error)
            );
        })
        .catch((error) => console.log("Error uploading file", error));
    } else {
      console.log("No file uploaded");
    }
  };

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const handleFileUpload = useCallback((file: File) => {
    console.log("Uploaded file:", file);
    setUploadedFile(file);

    // Generate a preview URL for image and PDF files
    if (
      file.type.startsWith("image/") ||
      file.type === "application/pdf" ||
      file.type === "image/tiff"
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }

    // If it's a TIFF image, convert it to a canvas and then to a data URL
    if (file.type === "image/tiff") {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result instanceof ArrayBuffer) {
          const buffer = event.target.result;
          const ifds = UTIF.decode(buffer);
          UTIF.decodeImage(buffer, ifds[0]); // We use decodeImage instead of decodeImages
          const rgba = UTIF.toRGBA8(ifds[0]);

          const width = ifds[0].width;
          const height = ifds[0].height;

          // Create a canvas and render the tiff image on it
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (ctx) {
            const imgData = ctx.createImageData(width, height);
            imgData.data.set(new Uint8ClampedArray(rgba));
            ctx.putImageData(imgData, 0, 0);

            setPreviewUrl(canvas.toDataURL());
          }
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (
      file.type.startsWith("image/") ||
      file.type === "application/pdf"
    ) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setPreviewUrl(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  }, []); // no external dependencies

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = Array.from(event.dataTransfer.files);
      console.log("All files:", files);
      files.forEach((file) => {
        console.log("File name:", file.name);
        console.log("File type:", file.type);
      });
      const acceptedFiles = files.filter((file) =>
        ["pdf", "doc", "docx", "png", "jpg", "jpeg", "tiff"].includes(
          (file.name.split(".").pop() || "").toLowerCase()
        )
      );
      console.log("Accepted files:", acceptedFiles);
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    },
    [handleFileUpload]
  );

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    // console.log("onDragOver event:", event);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" className="app-bar">
        <Toolbar>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Typography variant="h6" color="inherit" noWrap>
              Scan and Upload Work Orders
            </Typography>
            <Box display={"flex"} alignItems={"center"}>
              <Box
                alignSelf={"stretch"}
                borderLeft={"0.5px solid"}
                borderColor={"white"}
                mr={1}
                height={40}
              />
              <IconButton edge="end" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Grid
        container
        component="main"
        direction={"row"}
        sx={{
          height: { xs: "calc(100vh - 56px)", sm: "calc(100vh - 64px)" },
        }}
      >
        <CssBaseline />
        <Grid item xs={12} md={6} padding={1.5} height={"100%"}>
          <Container className="container">
            {!uploadedFile ? (
              <Box
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="upload-box"
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.tiff"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    if (file) {
                      handleFileUpload(file);
                    }
                  }}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                  }}
                />

                <Image
                  src="/upload-icon.svg"
                  alt="Upload Icon"
                  width={25}
                  height={25}
                />
                <Typography mt={2} textAlign={"center"} color={"#2A7CF8"}>
                  Click and upload your invoice here
                </Typography>
              </Box>
            ) : (
              <>
                {previewUrl &&
                uploadedFile &&
                uploadedFile.type.startsWith("image/") ? (
                  <Image
                    width={900}
                    height={1600}
                    src={previewUrl}
                    alt="preview"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : null}

                {previewUrl &&
                uploadedFile &&
                uploadedFile.type === "application/pdf" ? (
                  <iframe
                    src={previewUrl}
                    style={{ width: "100%", height: "100%" }}
                    title="PDF Preview"
                  ></iframe>
                ) : null}
              </>
            )}
          </Container>
        </Grid>
        <Grid item xs={12} md={6} height={"100%"} border={0}>
          <Box
            my={4}
            mx={4}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
          >
            <Typography component="h2" variant="h5">
              New Bill
            </Typography>
            <Typography component="h3" variant="body1" my={1}>
              Source
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell size="small">
                      <strong>Vendor Name: </strong>
                      {data.vendorName ? data.vendorName : "\u00A0"}
                    </TableCell>
                    <TableCell size="small">
                      <strong>Source Transportation Contact: </strong>
                      {data.vendorContact ? data.vendorContact : "\u00A0"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} size="small">
                      <strong>Vendor Address: </strong>
                      {data.vendorAddress ? data.vendorAddress : "\u00A0"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography component="h3" variant="body1" my={1}>
              Destination
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell size="small">
                      <strong>Customer Name: </strong>
                      {data.customerName ? data.customerName : "\u00A0"}
                    </TableCell>
                    <TableCell size="small">
                      <strong>Destination Transportation Contact: </strong>
                      {data.customerContact ? data.customerContact : "\u00A0"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2} size="small">
                      <strong>Customer Address: </strong>
                      {data.customerAddress ? data.customerAddress : "\u00A0"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography component="h3" variant="body1" my={1}>
              Load Description
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="products table">
                <TableHead>
                  <TableRow>
                    <TableCell size="small">
                      <strong>Shipping Units</strong>
                    </TableCell>
                    <TableCell size="small">
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell size="small">
                      <strong>Weight</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {data.table1 &&
                    data.table1.map(
                      (product: ProductField[], index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell size="small">
                              {product[0] && product[0].value
                                ? product[0].value
                                : "\u00A0"}
                            </TableCell>
                            <TableCell size="small">
                              {product[1] && product[1].value
                                ? product[1].value
                                : "\u00A0"}
                            </TableCell>
                            <TableCell size="small">
                              {product[2] && product[2].value
                                ? product[2].value
                                : "\u00A0"}
                            </TableCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody> */}

                <TableBody>
                  <TableRow>
                    <TableCell size="small">
                      {data.table &&
                      (data.table as { [key: string]: any })["PIECES"]
                        ? (data.table as { [key: string]: any })["PIECES"]
                        : "\u00A0"}
                    </TableCell>
                    <TableCell size="small">
                      {data.table &&
                      (data.table as { [key: string]: any })[
                        "GOODS DESCRIPTION"
                      ]
                        ? (data.table as { [key: string]: any })[
                            "GOODS DESCRIPTION"
                          ]
                        : "\u00A0"}
                    </TableCell>
                    <TableCell size="small">
                      {data.table &&
                      (data.table as { [key: string]: any })["WEIGHT"]
                        ? (data.table as { [key: string]: any })["WEIGHT"]
                        : "\u00A0"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Typography component="h3" variant="body1" mt={2} my={1}>
              Additional Information
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableBody>
                  {isMediumScreen ? (
                    <>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Order Reference:</strong>{" "}
                          {data.orderNumber ? data.orderNumber : "\u00A0"}
                        </TableCell>

                        <TableCell size="small">
                          <strong>Container Number:</strong>{" "}
                          {data.container ? data.container : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small" colSpan={2}>
                          <strong>Seal Number:</strong>{" "}
                          {data.sealNumber ? data.sealNumber : "\u00A0"}
                        </TableCell>
                      </TableRow>

                      {/* <TableRow>
                        <TableCell size="small">
                          <strong>Quickbooks Location:</strong>{" "}
                          {data.quickbooksLocation
                            ? data.quickbooksLocation
                            : "\u00A0"}
                        </TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell size="small">
                          <strong>Pickup Date:</strong>{" "}
                          {data.pickupDate ? data.pickupDate : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Dropoff Date:</strong>{" "}
                          {data.dropoffDate ? data.dropoffDate : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Pickup Time:</strong>{" "}
                          {data.pickupTime ? data.pickupTime : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Dropoff Time:</strong>{" "}
                          {data.dropoffTime ? data.dropoffTime : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} size="small">
                          <strong>Load Description:</strong>{" "}
                          {data.loadDescription
                            ? data.loadDescription
                            : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Shipping units:</strong>{" "}
                          {data.shippingUnits ? data.shippingUnits : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Total Weight:</strong>{" "}
                          {data.totalWeight ? data.totalWeight : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <strong>VIN:</strong> {data.vin ? data.vin : "\u00A0"}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Order Reference:</strong>{" "}
                          {data.orderNumber ? data.orderNumber : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Container Number:</strong>{" "}
                          {data.container ? data.container : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small" colSpan={2}>
                          <strong>Seal Number:</strong>{" "}
                          {data.sealNumber ? data.sealNumber : "\u00A0"}
                        </TableCell>
                        {/* <TableCell size="small">
                          <strong>Quickbooks Location:</strong>{" "}
                          {data.quickbooksLocation
                            ? data.quickbooksLocation
                            : "\u00A0"}
                        </TableCell> */}
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Pickup Date:</strong>{" "}
                          {data.pickupDate ? data.pickupDate : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Dropoff Date:</strong>{" "}
                          {data.dropoffDate ? data.dropoffDate : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Pickup Time:</strong>{" "}
                          {data.pickupTime ? data.pickupTime : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Dropoff Time:</strong>{" "}
                          {data.dropoffTime ? data.dropoffTime : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      {/* <TableRow>
                        <TableCell colSpan={2} size="small">
                          <strong>Load Description:</strong>{" "}
                          {data.loadDescription
                            ? data.loadDescription
                            : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell size="small">
                          <strong>Shipping units:</strong>{" "}
                          {data.shippingUnits ? data.shippingUnits : "\u00A0"}
                        </TableCell>
                        <TableCell size="small">
                          <strong>Total Weight:</strong>{" "}
                          {data.totalWeight ? data.totalWeight : "\u00A0"}
                        </TableCell>
                      </TableRow> */}
                      <TableRow>
                        <TableCell size="small">
                          <strong>VIN:</strong> {data.vin ? data.vin : "\u00A0"}
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            marginTop={3}
            marginBottom={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button type="submit" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
