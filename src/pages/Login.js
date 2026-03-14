import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
import { LockOutlined, TravelExplore } from "@mui/icons-material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/login",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      const message = response.data.message;

      if (message === "OTP sent successfully") {
        // Store email for OTP verification
        localStorage.setItem("email", email);
        navigate("/otp");
      } else {
        setError(message);
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.message || "Login failed");
      } else {
        setError("Server error. Please try again.");
      }
    } finally {
      setLoading(false);
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
          Welcome to SmartPlan AI
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          Plan your perfect trip with AI-powered recommendations
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
              <LockOutlined />
            </Avatar>

            <Typography component="h2" variant="h5">
              Sign In
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
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
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 48 }}
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Sign In"}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary" sx={{ "&:hover": { textDecoration: "underline" } }}>
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;