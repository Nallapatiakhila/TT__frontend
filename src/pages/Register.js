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
import { PersonAddOutlined, TravelExplore } from "@mui/icons-material";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.phone.trim()) return "Phone number is required";
    if (formData.phone.length !== 10) return "Phone number must be 10 digits";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 6) return "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match";
    return null;
  };

  const handleRegister = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8090/api/auth/register",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          password: formData.password,
        }
      );

      setSuccess(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      if (error.response) {
        setError(error.response.data.message || "Registration failed");
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
          Join SmartPlan AI
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, textAlign: "center" }}>
          Create your account to start planning amazing trips
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
              <PersonAddOutlined />
            </Avatar>

            <Typography component="h2" variant="h5">
              Sign Up
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
                {success}
              </Alert>
            )}

            <Box component="form" sx={{ mt: 1, width: "100%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="tel"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
                inputProps={{ maxLength: 10 }}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                variant="outlined"
              />

              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, height: 48 }}
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Create Account"}
              </Button>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" color="primary" sx={{ "&:hover": { textDecoration: "underline" } }}>
                    Already have an account? Sign In
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

export default Register;