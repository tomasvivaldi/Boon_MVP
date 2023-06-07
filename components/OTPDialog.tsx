import React, { useState, useEffect } from "react";
import {
  Dialog,
  Button,
  Grid,
  Typography,
  Link,
  Box,
  TextField,
} from "@mui/material";

interface OTPDialogProps {
  open: boolean;
  handleClose: () => void;
}

const OTPDialog: React.FC<OTPDialogProps> = ({ open, handleClose }) => {
  const [otp, setOtp] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const resetCountdown = () => {
    setCountdown(10);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid
            container
            direction="column"
            spacing={2}
            style={{ padding: "2em" }}
          >
            <Grid item>
              <Typography variant="h5">
                Enter 6 digit OTP for verification
              </Typography>
              <Typography variant="subtitle2">
                One time password sent to +1 87654 21345
              </Typography>
            </Grid>
            <Grid item>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                  border={1}
                  borderColor={isFocused ? "primary.main" : "divider"}
                  p={1}
                  style={{ width: "250px" }}
                >
                  {Array(6)
                    .fill(
                      <div
                        style={{
                          width: "20px",
                          height: "3px",
                          backgroundColor: "black",
                          marginTop: 17,
                          marginBottom: 17,
                        }}
                      />
                    )
                    .map((char, index) => (
                      <span key={index} style={{ fontSize: "25px" }}>
                        {otp.length > index ? otp.charAt(index) : char}
                      </span>
                    ))}
                </Box>
                <TextField
                  type="tel"
                  inputProps={{ maxLength: 6, pattern: "[0-9]*" }}
                  style={{
                    position: "absolute",
                    opacity: 0,
                    zIndex: 1,
                  }}
                  autoFocus
                  value={otp}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) => {
                    if (e.target.validity.valid) setOtp(e.target.value);
                  }}
                />
              </Box>
            </Grid>
            <Grid container item justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">
                  Didn&apos;t receive the code?
                </Typography>
                <Typography variant="body2">
                  Resend in 00:{countdown < 10 ? `0${countdown}` : countdown}
                </Typography>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={resetCountdown}>
                  Resend OTP
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
};

export default OTPDialog;
