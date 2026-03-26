import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { VpnKeyOutlined, TravelExplore } from "@mui/icons-material";

function OTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Auto-fill email from localStorage
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const verifyOtp = async () => {
    if (!email.trim() || !otp.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://tt-backend-wld3.onrender.com/api/auth/verify-otp",
        {
          email: email.trim(),
          otp: otp.trim(),
        }
      );

      const message = res.data.message;

      if (message === "OTP verified successfully") {
        // Clear stored email and redirect to dashboard
        localStorage.removeItem("email");
        navigate("/dashboard");
      } else {
        setError(message);
      }
    } catch (err) {
      console.error(err);
      setError("Verification failed. Please check your OTP and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 60, height: 60 }}>
          <TravelExplore sx={{ fontSize: 30 }} />
        </Avatar>

        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Verify Your Account
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          We've sent a 6-digit OTP to your email. Please enter it below to complete your login.
        </Typography>

        <Paper elevation={3} sx={{ p: 4, width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <VpnKeyOutlined />
            </Avatar>

            <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
              Enter OTP
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box component="form" sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                disabled={!!localStorage.getItem("email")}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="otp"
                label="6-Digit OTP"
                name="otp"
                autoComplete="one-time-code"
                value={otp}
                onChange={handleOtpChange}
                variant="outlined"
                inputProps={{
                  maxLength: 6,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
                autoFocus
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 48 }}
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
              >
                {loading ? <CircularProgress size={24} /> : "Verify OTP"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default OTP;
