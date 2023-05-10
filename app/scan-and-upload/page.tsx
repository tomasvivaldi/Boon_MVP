"use client";
import "@/styles/globals.css";
import React, { useState } from "react";
import Image from "next/image";
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
  TableRow,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

const handleClose = () => {
  // Add your close functionality here
  console.log("Close button clicked");
};

const mockData = {
  vendorName: "",
  vendorContact: "",
  vendorAddress: "",
  invoiceNumber: "",
  quickbooksLocation: "",
  date: "",
  category: "",
  vin: "",
};

export default function scan_upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const [data, setData] = useState(mockData);

  const handleSubmit = () => {
    // Add your close functionality here
    console.log("Submit button clicked");

    // Update the data when the submit button is clicked
    setData({
      vendorName: "Name of Vendor",
      vendorContact: "+11 222-333-4444",
      vendorAddress: "3654 Mckee Road San Jose, CA 95127",
      invoiceNumber: "123",
      quickbooksLocation: "location1",
      date: "2023-05-08",
      category: "cat1",
      vin: "1ABCDEFGH23456789",
    });
  };

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" className="app-bar">
        <Toolbar>
          <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
            <Typography variant="h6" color="inherit" noWrap>
              Scan and Upload Invoices
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
            <Box className="upload-box">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
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
          </Container>
        </Grid>
        <Grid item xs={12} md={6} height={"100%"} border={0}>
          <Box
            my={8}
            mx={4}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"start"}
          >
            <Typography component="h2" variant="h5">
              New Bill
            </Typography>
            <Typography component="h3" variant="body1" my={2}>
              Vendor
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <strong>Vendor Name: </strong>
                      {data.vendorName ? data.vendorName : "\u00A0"}
                    </TableCell>
                    <TableCell>
                      <strong>Vendor Contact: </strong>
                      {data.vendorContact ? data.vendorContact : "\u00A0"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>Vendor Address: </strong>
                      {data.vendorAddress ? data.vendorAddress : "\u00A0"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography component="h3" variant="body1" mt={2} my={2}>
              Purpose
            </Typography>
            <TableContainer className="table-container">
              <Table aria-label="simple table">
                <TableBody>
                  {isMediumScreen ? (
                    <>
                      <TableRow>
                        <TableCell>
                          <strong>Invoice Number:</strong>{" "}
                          {data.invoiceNumber ? data.invoiceNumber : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Quickbooks Location:</strong>{" "}
                          {data.quickbooksLocation
                            ? data.quickbooksLocation
                            : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Date:</strong>{" "}
                          {data.date ? data.date : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Category:</strong>{" "}
                          {data.category ? data.category : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>VIN:</strong> {data.vin ? data.vin : "\u00A0"}
                        </TableCell>
                      </TableRow>
                    </>
                  ) : (
                    <>
                      <TableRow>
                        <TableCell>
                          <strong>Invoice Number:</strong>{" "}
                          {data.invoiceNumber ? data.invoiceNumber : "\u00A0"}
                        </TableCell>
                        <TableCell>
                          <strong>Quickbooks Location:</strong>{" "}
                          {data.quickbooksLocation
                            ? data.quickbooksLocation
                            : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <strong>Date:</strong>{" "}
                          {data.date ? data.date : "\u00A0"}
                        </TableCell>
                        <TableCell>
                          <strong>Category:</strong>{" "}
                          {data.category ? data.category : "\u00A0"}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
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
