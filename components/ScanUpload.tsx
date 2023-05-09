"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  appBarStyles,
  containerStyles,
  uploadBoxStyles,
  tableContainerStyles,
} from "@/styles/ScanUpload.styles";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const handleClose = () => {
  // Add your close functionality here
  console.log("Close button clicked");
};

const handleSubmit = () => {
  // Add your close functionality here
  console.log("Submit button clicked");
};

const mockData = [
  {
    vendorName: "Name of Vendor",
    vendorContact: "+11 222-333-4444",
    vendorAddress: "3654 Mckee Road San Jose, CA 95127",
    invoiceNumber: "123",
    quickbooksLocation: "location1",
    date: "2023-05-08",
    category: "cat1",
    vin: "1ABCDEFGH23456789",
  },
];

function ScanUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" sx={{ ...appBarStyles }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit" noWrap>
            Scan and Upload Invoices
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                alignSelf: "stretch",
                borderLeft: "0.5px solid",
                borderColor: "white",
                mr: 1,
                height: 40,
              }}
            />
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="medium" />
            </IconButton>
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
        <Grid item xs={12} sm={6} md={6} sx={{ p: "10px", height: "100%" }}>
          <Container sx={{ ...containerStyles }}>
            <Box
              sx={{
                width: "380px",
                height: "119px",
                backgroundColor: "#F4F8FF",
                border: "1px dashed #000000",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
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
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#2A7CF8",
                }}
              >
                Drag or upload your invoice here
              </Typography>
            </Box>
          </Container>
        </Grid>
        <Grid item xs={12} sm={6} md={6} sx={{ height: "100%", border: 0 }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography component="h2" variant="h5">
              New Bill
            </Typography>
            <Box component="form" noValidate mt={2}>
              <Typography component="h3" variant="body1" my={2}>
                Vendor
              </Typography>
              <TableContainer sx={{ ...tableContainerStyles }}>
                <Table aria-label="simple table">
                  <TableBody>
                    {mockData.map((row) => {
                      return (
                        <>
                          <TableRow>
                            <TableCell>
                              <strong>Vendor Name: </strong>
                              {row.vendorName ? row.vendorName : "\u00A0"}
                            </TableCell>
                            <TableCell>
                              <strong>Vendor Contact: </strong>
                              {row.vendorContact ? row.vendorContact : "\u00A0"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={2}>
                              <strong>Vendor Address: </strong>
                              {row.vendorAddress ? row.vendorAddress : "\u00A0"}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Typography component="h3" variant="body1" mt={2} my={2}>
              Purpose
            </Typography>

            <TableContainer sx={{ ...tableContainerStyles }}>
              <Table aria-label="simple table">
                <TableBody>
                  {mockData.map((row) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            <strong>Invoice Number:</strong>{" "}
                            {row.invoiceNumber ? row.invoiceNumber : "\u00A0"}
                          </TableCell>
                          <TableCell>
                            <strong>Quickbooks Location:</strong>{" "}
                            {row.quickbooksLocation
                              ? row.quickbooksLocation
                              : "\u00A0"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Date:</strong>{" "}
                            {row.date ? row.date : "\u00A0"}
                          </TableCell>
                          <TableCell>
                            <strong>Category:</strong>{" "}
                            {row.category ? row.category : "\u00A0"}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>VIN:</strong> {row.vin ? row.vin : "\u00A0"}
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 3,
              mb: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "fit-content" }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ScanUpload;
