"use client";
import React, { useState } from "react";
import Image from "next/image";
// import {
//   appBarStyles,
//   containerStyles,
//   uploadBoxStyles,
//   tableContainerStyles,
// } from "@/styles/globals.css";
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
import OTPDialog from "./OTPDialog";

function Onboarding() {
  const [isOTPDialogOpen, setOTPDialogOpen] = useState(false);

  const handleContinue = () => {
    setOTPDialogOpen(true);
    // Add your close functionality here
    console.log("Continue button clicked");
  };
  const handleClose = () => {
    // Add your close functionality here
    console.log("Close button clicked");
  };

  return (
    <div>
      <CssBaseline />
      <OTPDialog
        open={isOTPDialogOpen}
        handleClose={() => setOTPDialogOpen(false)}
      />
      <Box
        padding={6}
        sx={{
          height: "100vh",
        }}
      >
        <Grid
          container
          component="main"
          direction={"row"}
          borderRadius={8}
          sx={{ height: "100%" }}
        >
          <Container
            sx={{
              width: "50%",
              minWidth: "400px",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#916DF6",
              backgroundSize: "cover",
              backgroundPosition: "center",
              margin: "0",
            }}
          >
            <Grid item direction={"column"}>
              <Image
                src="/onboarding.svg"
                alt="Onboarding Image"
                width={400}
                height={300}
              />
              <Typography component="h2" variant="h5" sx={{ color: "white" }}>
                Get Boon Platform Introduction
              </Typography>
              <Typography
                component="h3"
                variant="h6"
                sx={{
                  fontFamily: "Roboto",
                  fontStyle: "regular",
                  fontSize: "15.19px",
                  lineHeight: "18.99px",
                  textAlign: "center",
                  verticalAlign: "top",
                  letterSpacing: "0.71px",
                  color: "white",
                }}
              >
                Take a 2 min tour of the application and see how easy it is to
                get started
              </Typography>
            </Grid>
          </Container>

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            sx={{ height: "100%", border: 0, backgroundColor: "#F7F7FC" }}
          >
            <Box
              sx={{
                my: 2,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography component="h2" variant="h5" mt={2}>
                New Bill
              </Typography>
              <Box component="form" noValidate>
                <Typography component="h3" variant="body1" mt={3} mb={2}>
                  Vendor
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <strong>First Name</strong>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <strong>Last Name</strong>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <strong>Email</strong>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <strong>Type of Business</strong>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <strong>Fleet Size</strong>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: 8 } }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <strong>Mobile Number</strong>
                    <TextField
                      fullWidth
                      inputProps={{ style: { height: 8 } }}
                    />
                  </Grid>
                </Grid>
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
                    type="button"
                    variant="contained"
                    sx={{ width: "fit-content" }}
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Onboarding;
