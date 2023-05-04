"use client";
import React from "react";
import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";

function ScanUpload() {
  return (
    <div>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Scan and Upload Invoices
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ScanUpload;
