"use client";
import React from "react";
import Image from "next/image";
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
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const handleClose = () => {
  // Add your close functionality here
  console.log("Close button clicked");
};

function ScanUpload() {
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative" sx={{ backgroundColor: "#4E4B66" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit" noWrap>
            Scan and Upload Invoices
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose}>
            <Box
              sx={{
                alignSelf: "stretch",
                borderLeft: "0.5px solid",
                borderColor: "white",
                mr: 2,
                height: 32,
              }}
            />
            <CloseIcon fontSize="medium" />
          </IconButton>
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
          <Container
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#EFF5FF",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
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
              }}
            >
              <Image
                src="/upload-icon.svg"
                alt="Your Image Description"
                width={25} // Set the image width
                height={25} // Set the image height
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
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          component={Paper}
          sx={{ height: "100%" }}
        >
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
            <Box component="form" noValidate sx={{ mt: 4 }}>
              <Typography component="h3" variant="h6">
                Vendor
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                id="vendor"
                name="vendor"
                inputProps={{
                  style: {
                    height: "100px",
                  },
                }}
              />
              <Typography component="h3" variant="h6">
                Purpose
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="vendor"
                id="vendor"
                inputProps={{
                  style: {
                    height: "100px",
                  },
                }}
              />
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
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default ScanUpload;
