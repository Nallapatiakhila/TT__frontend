// import React, { useState } from "react";
// import axios from "axios";

// function Dashboard() {

//   const [mood, setMood] = useState("");
//   const [destination, setDestination] = useState("");
//   const [from, setFrom] = useState("");
//   const [to, setTo] = useState("");
//   const [budget, setBudget] = useState("Low Budget");

//   const [plan, setPlan] = useState([]);
//   const [aiExplanation, setAiExplanation] = useState("");
//   const [totalCost, setTotalCost] = useState(0);

//   const [chatOpen, setChatOpen] = useState(false);
//   const [chatInput, setChatInput] = useState("");
//   const [messages, setMessages] = useState([]);

//   // ⚠️ Replace with your Google Places API key
//   const GOOGLE_API_KEY = "AIzaSyCi0_OOqaa74dAWZ7W8K481hAuJDS9x9VA";

//   const generatePlan = async () => {

//     try {

//       const response = await axios.post("http://localhost:8080/api/trip/generate", {
//         mood,
//         destination,
//         from,
//         to,
//         budget
//       });

//       setPlan(response.data.plan || []);
//       setAiExplanation(
//         response.data.aiExplanation ||
//         "• Explore the recommended places shown above.\n• Enjoy the restaurants and attractions.\n• This itinerary is based on your mood and travel dates."
//       );
//       setTotalCost(response.data.totalCost || 0);

//     } catch (error) {

//       console.error(error);

//       setAiExplanation(
//         "• Explore the recommended places above.\n• Visit scenic attractions and enjoy local food.\n• This trip is designed based on your preferences."
//       );

//     }

//   };

//   const sendChat = async () => {

//     if (!chatInput.trim()) return;

//     const userMessage = { type: "user", text: chatInput };
//     setMessages(prev => [...prev, userMessage]);

//     try {

//       const res = await axios.post(
//         "http://localhost:8080/api/ai/destination",
//         { mood: chatInput }
//       );

//       const botMessage = {
//         type: "bot",
//         text: res.data.suggestion || "Try Goa, Kerala or Manali!"
//       };

//       setMessages(prev => [...prev, botMessage]);

//     } catch (error) {

//       setMessages(prev => [
//         ...prev,
//         { type: "bot", text: "AI failed. Try Goa, Kerala or Manali." }
//       ]);

//     }

//     setChatInput("");

//   };

//   return (

//     <div style={{ padding: "40px", textAlign: "center" }}>

//       <h1 style={{ color: "#6c63ff" }}>SmartPlan AI</h1>
//       <h2>SmartPlan AI Dashboard</h2>

//       <h3>Plan Your Trip</h3>

//       {/* Mood */}

//       <input
//         placeholder="Enter Mood"
//         value={mood}
//         onChange={(e) => setMood(e.target.value)}
//       />

//       <br /><br />

//       {/* Destination Dropdown */}

//       <select
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//       >
//         <option value="">Select Destination</option>
//         <option value="Kerala">Kerala</option>
//         <option value="Goa">Goa</option>
//         <option value="Manali">Manali</option>
//         <option value="Ooty">Ooty</option>
//         <option value="Coorg">Coorg</option>
//         <option value="Hyderabad">Hyderabad</option>
//       </select>

//       <br /><br />

//       {/* Dates */}

//       <label>From </label>
//       <input type="date" onChange={(e) => setFrom(e.target.value)} />

//       <br /><br />

//       <label>To </label>
//       <input type="date" onChange={(e) => setTo(e.target.value)} />

//       <br /><br />

//       {/* Budget */}

//       <select onChange={(e) => setBudget(e.target.value)}>
//         <option>Low Budget</option>
//         <option>Medium Budget</option>
//         <option>High Budget</option>
//       </select>

//       <br /><br />

//       <button onClick={generatePlan}>Generate Smart Plan</button>

//       <h2 style={{ marginTop: "40px" }}>Your Trip Plan</h2>

//       {/* Trip Cards */}

//       <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

//         {plan.map((day, index) => (

//           <div
//             key={index}
//             style={{
//               width: "250px",
//               margin: "15px",
//               padding: "20px",
//               borderRadius: "10px",
//               background: "#dcdbe6"
//             }}
//           >

//             <img
//               src={
//                 day.photoReference
//                   ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${day.photoReference}&key=${GOOGLE_API_KEY}`
//                   : "https://via.placeholder.com/250"
//               }
//               alt="place"
//               style={{ width: "100%", borderRadius: "10px" }}
//             />

//             <h3>{day.day}</h3>

//             <p><b>Weather:</b> {day.weather}</p>
//             <p><b>Place:</b> {day.place}</p>
//             <p><b>Restaurant:</b> {day.restaurant}</p>

//             <p><b>Place Cost:</b> ₹{day.placeCost}</p>
//             <p><b>Food Cost:</b> ₹{day.foodCost}</p>
//             <p><b>Daily Cost:</b> ₹{day.dailyCost}</p>

//             <button
//               onClick={() =>
//                 window.open(`https://www.google.com/maps/search/${day.place}`)
//               }
//             >
//               Open in Google Maps
//             </button>

//           </div>

//         ))}

//       </div>

//       {/* AI Recommendation */}

//       <h3 style={{ marginTop: "30px" }}>🤖 SmartPlan AI Recommendation</h3>

//       <div
//         style={{
//           background: "#dcdbe6",
//           padding: "20px",
//           borderRadius: "10px",
//           marginTop: "10px"
//         }}
//       >

//         <pre style={{ whiteSpace: "pre-wrap" }}>
//           {aiExplanation}
//         </pre>

//       </div>

//       <h2 style={{ marginTop: "20px" }}>Total Trip Cost: ₹{totalCost}</h2>

//       {/* Chatbot */}

//       <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>

//         {chatOpen && (

//           <div
//             style={{
//               width: "260px",
//               height: "360px",
//               background: "white",
//               borderRadius: "10px",
//               boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
//               display: "flex",
//               flexDirection: "column"
//             }}
//           >

//             <div
//               style={{
//                 background: "#6c63ff",
//                 color: "white",
//                 padding: "10px"
//               }}
//             >
//               SmartPlan AI Assistant
//             </div>

//             <div
//               style={{
//                 flex: 1,
//                 padding: "10px",
//                 overflowY: "auto"
//               }}
//             >

//               {messages.map((msg, i) => (

//                 <div
//                   key={i}
//                   style={{
//                     textAlign: msg.type === "user" ? "right" : "left",
//                     margin: "6px"
//                   }}
//                 >

//                   <span
//                     style={{
//                       padding: "8px",
//                       borderRadius: "8px",
//                       background: msg.type === "user" ? "#6c63ff" : "#eee",
//                       color: msg.type === "user" ? "white" : "black"
//                     }}
//                   >
//                     {msg.text}
//                   </span>

//                 </div>

//               ))}

//             </div>

//             <div style={{ display: "flex" }}>

//               <input
//                 style={{ flex: 1 }}
//                 placeholder="Ask travel advice..."
//                 value={chatInput}
//                 onChange={(e) => setChatInput(e.target.value)}
//               />

//               <button onClick={sendChat}>Send</button>

//             </div>

//           </div>

//         )}

//         <button
//           onClick={() => setChatOpen(!chatOpen)}
//           style={{
//             borderRadius: "50%",
//             width: "55px",
//             height: "55px",
//             background: "#6c63ff",
//             color: "white",
//             fontSize: "20px",
//             border: "none"
//           }}
//         >
//           🤖
//         </button>

//       </div>

//     </div>

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Alert,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Fab,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Map,
  RestaurantMenu,
  Save,
  TravelExplore,
  MonetizationOn,
  ChatBubbleOutline,
  Close,
} from "@mui/icons-material";

function Dashboard() {
  const [destination, setDestination] = useState("");
  const [fromLocation, setFromLocation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [budget, setBudget] = useState("Low Budget");

  const [plan, setPlan] = useState([]);
  const [aiExplanation, setAiExplanation] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [flightCost, setFlightCost] = useState(0);
  const [flightDetails, setFlightDetails] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [savedDialogOpen, setSavedDialogOpen] = useState(false);
  const [savedTrips, setSavedTrips] = useState([]);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [flightDetailsOpen, setFlightDetailsOpen] = useState(false);

  const BACKEND_URL = "https://tt-backend-wld3.onrender.com";

  const getPlacePhotoUrl = (day) => {
    if (day.photoUrl) return day.photoUrl;
    if (day.photoReference) {
      return `${BACKEND_URL}/api/trip/photo?photoReference=${encodeURIComponent(day.photoReference)}`;
    }
    if (day.place) {
      return `${BACKEND_URL}/api/trip/photo?name=${encodeURIComponent(day.place)}`;
    }
    return `https://picsum.photos/400/250?random=${Math.floor(Math.random() * 1000)}`;
  };

  useEffect(() => {
    const stored = localStorage.getItem("smartplan_last");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setDestination(parsed.destination || "");
        setFromLocation(parsed.fromLocation || "");
        setFrom(parsed.from || "");
        setTo(parsed.to || "");
        setBudget(parsed.budget || "Low Budget");
        setPlan(parsed.plan || []);
        setAiExplanation(parsed.aiExplanation || "");
        setTotalCost(parsed.totalCost || 0);
        setFlightCost(parsed.flightCost || 0);
        setFlightDetails(parsed.flightDetails || "");
      } catch {
        // ignore invalid data
      }
    }
  }, []);

  const generatePlan = async () => {
    if (!destination.trim()) {
      setError("Please enter a destination city");
      return;
    }

    setLoading(true);
    setError("");
    setPlan([]);
    setAiExplanation("");
    setTotalCost(0);
    setFlightCost(0);
    setFlightDetails("");
    setSaved(false);

    try {
      const res = await axios.post("https://tt-backend-wld3.onrender.com/api/trip/generate", {
        destination: destination.trim(),
        fromLocation: fromLocation.trim(),
        from,
        to,
        budget,
      });

      const resolvedPlan = (res.data.plan || []).map((day) => ({
        ...day,
        photoUrl:
          day.photoUrl ||
          (day.photoReference
            ? `${BACKEND_URL}/api/trip/photo?photoReference=${encodeURIComponent(day.photoReference)}`
            : day.place
            ? `${BACKEND_URL}/api/trip/photo?name=${encodeURIComponent(day.place)}`
            : undefined),
      }));

      setPlan(resolvedPlan);
      setAiExplanation(res.data.aiExplanation || "");
      setTotalCost(res.data.totalCost || 0);
      setFlightCost(res.data.flightCost || 0);
      setFlightDetails(res.data.flightDetails || "");

      // Save last plan locally so it persists across refresh
      localStorage.setItem(
        "smartplan_last",
        JSON.stringify({
          destination: destination.trim(),
          fromLocation: fromLocation.trim(),
          from,
          to,
          budget,
          plan: res.data.plan || [],
          aiExplanation: res.data.aiExplanation || "",
          totalCost: res.data.totalCost || 0,
          flightCost: res.data.flightCost || 0,
          flightDetails: res.data.flightDetails || "",
        })
      );
    } catch (e) {
      console.error(e);
      const message =
        e?.response?.data?.message ||
        e?.response?.statusText ||
        e?.message ||
        "Failed to generate trip plan. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = async () => {
    if (plan.length === 0) {
      setError("No trip plan to save");
      return;
    }

    try {
      await axios.post("https://tt-backend-wld3.onrender.com/api/trip/save", {
        destination,
        fromLocation,
        from,
        to,
        plan,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      console.error(e);
      setError("Failed to save trip");
    }
  };

  const loadSavedTrips = async () => {
    try {
      const res = await axios.get("https://tt-backend-wld3.onrender.com/api/trip/saved");
      setSavedTrips(res.data || []);
      setSavedDialogOpen(true);
    } catch (e) {
      console.error(e);
      setError("Failed to load saved trips");
    }
  };

  const loadTrip = (trip) => {
    setDestination(trip.destination || "");
    setFromLocation(trip.fromLocation || "");
    setFrom(trip.fromDate || "");
    setTo(trip.toDate || "");

    const loadedPlan = Array.isArray(trip.plan) ? trip.plan : [];
    const resolvedPlan = loadedPlan.map((day) => ({
      ...day,
      photoUrl:
        day.photoUrl ||
        (day.photoReference
          ? `${BACKEND_URL}/api/trip/photo?photoReference=${encodeURIComponent(day.photoReference)}`
          : day.place
          ? `${BACKEND_URL}/api/trip/photo?name=${encodeURIComponent(day.place)}`
          : undefined),
    }));
    setPlan(resolvedPlan);
    setTotalCost(
      resolvedPlan.reduce((sum, day) => sum + (day.dailyCost || 0), 0)
    );
    setAiExplanation(trip.aiExplanation || "");
    setFlightCost(trip.flightCost || 0);
    setFlightDetails(trip.flightDetails || "");
    setSavedDialogOpen(false);
  };

  const openInMaps = (place) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place
      )}`,
      "_blank"
    );
  };

  const sendChat = async () => {
    if (!chatInput.trim()) return;

    const userMessage = { type: "user", text: chatInput.trim() };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("https://tt-backend-wld3.onrender.com/api/ai/destination", {
        mood: chatInput.trim(),
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: res.data.tripPlan || res.data.suggestion || "Try asking something like 'suggest places in Goa'",
        },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Sorry, I couldn't reach the AI service. Please try again later.",
        },
      ]);
    }

    setChatInput("");
  };

  const viewMenu = (restaurant) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        restaurant + " menu"
      )}`,
      "_blank"
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{ color: "primary.main", fontWeight: "bold", mb: 4 }}
      >
        <TravelExplore sx={{ mr: 2, fontSize: "2rem" }} />
        Plan Your Dream Trip
      </Typography>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
          Trip Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="From Location (Departure City)"
              placeholder="e.g., Mumbai, Delhi, Bangalore"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Destination City"
              placeholder="e.g., Paris, Tokyo, Bali"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="From Date"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="To Date"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Budget Category"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              variant="outlined"
              SelectProps={{ native: true }}
            >
              <option value="Low Budget">Low Budget</option>
              <option value="Medium Budget">Medium Budget</option>
              <option value="High Budget">High Budget</option>
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={generatePlan}
              disabled={loading}
              sx={{ height: 56 }}
            >
              {loading ? <CircularProgress size={24} /> : "Generate Smart Plan"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {saved && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Trip saved successfully!
        </Alert>
      )}

      {plan.length > 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Typography variant="h4" component="h2">
              Your Trip Itinerary
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Save />}
              onClick={saveTrip}
              sx={{ mr: 2 }}
            >
              Save Trip
            </Button>
            <Button
              variant="outlined"
              onClick={loadSavedTrips}
              sx={{ mr: 2 }}
            >
              View Saved Trips
            </Button>
          </Box>

          <Grid container spacing={3}>
            {plan.map((day, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={getPlacePhotoUrl(day)}
                    alt={day.place || "Trip image"}
                    sx={{ objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x250?text=Image+Not+Available";
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {day.day}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Destination:</strong> {day.place}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Hotel:</strong> {day.hotel || "N/A"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Restaurant:</strong> {day.restaurant}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                      <Chip
                        icon={<MonetizationOn />}
                        label={`Place: ₹${day.placeCost}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        icon={<RestaurantMenu />}
                        label={`Food: ₹${day.foodCost}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                      <Chip
                        icon={<MonetizationOn />}
                        label={`Hotel: ₹${day.hotelCost ?? 0}`}
                        size="small"
                        color="info"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                      <strong>Daily Total: ₹{day.dailyCost}</strong>
                    </Typography>
                  </CardContent>

                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<Map />}
                      onClick={() => openInMaps(day.place)}
                      sx={{ mr: 1 }}
                    >
                      Place
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Map />}
                      onClick={() => openInMaps(day.hotel || day.place)}
                      sx={{ mr: 1 }}
                    >
                      Hotel
                    </Button>
                    <Button
                      size="small"
                      startIcon={<RestaurantMenu />}
                      onClick={() => viewMenu(day.restaurant)}
                    >
                      Menu
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Paper elevation={2} sx={{ p: 3, mt: 4, backgroundColor: "#f8f9ff" }}>
            <Typography variant="h5" gutterBottom sx={{ color: "primary.main" }}>
              🤖 SmartPlan AI Recommendation
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
                fontFamily: "monospace",
              }}
            >
              {aiExplanation}
            </Typography>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
            <Typography variant="h5" sx={{ color: "primary.main", fontWeight: "bold" }}>
              ✈️ Flight Estimate
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {flightDetails || "Flight estimate based on your budget."}
            </Typography>
            <Typography variant="h6" sx={{ mt: 1, color: "text.secondary" }}>
              Estimated Flight Cost: ₹{flightCost}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => setFlightDetailsOpen(true)}
              disabled={!flightDetails}
            >
              View Flight Details
            </Button>
          </Paper>

          <Paper elevation={3} sx={{ p: 3, mt: 3, textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold" }}>
              Total Trip Cost: ₹{totalCost}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              This includes flight, hotels, place visits, and food expenses.
            </Typography>
          </Paper>

          <Dialog open={flightDetailsOpen} onClose={() => setFlightDetailsOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Flight Details</DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {flightDetails || "No flight details available."}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setFlightDetailsOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={savedDialogOpen} onClose={() => setSavedDialogOpen(false)} fullWidth maxWidth="sm">
            <DialogTitle>Saved Trips</DialogTitle>
            <DialogContent dividers>
              {savedTrips.length === 0 ? (
                <Typography>No saved trips found.</Typography>
              ) : (
                <List>
                  {savedTrips.map((trip) => (
                    <ListItem
                      key={trip.id}
                      secondaryAction={
                        <Button size="small" onClick={() => loadTrip(trip)}>
                          Load
                        </Button>
                      }
                    >
                      <ListItemText
                        primary={`${trip.destination} (${trip.fromDate} → ${trip.toDate})`}
                        secondary={
                          trip.plan && trip.plan.length > 0
                            ? `${trip.plan.length} day(s) itinerary`
                            : "No plan details"
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSavedDialogOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>

        </>
      )}

      <Slide direction="up" in={chatOpen} mountOnEnter unmountOnExit>
        <Paper
          elevation={6}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 320,
            maxHeight: 420,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Travel Assistant
            </Typography>
            <Button size="small" onClick={() => setChatOpen(false)}>
              <Close />
            </Button>
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              mb: 1,
              px: 1,
            }}
          >
            {messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    maxWidth: "80%",
                    p: 1,
                    borderRadius: 2,
                    bgcolor: msg.type === "user" ? "primary.main" : "grey.200",
                    color: msg.type === "user" ? "common.white" : "text.primary",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Ask travel advice..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendChat();
                }
              }}
            />
            <Button variant="contained" onClick={sendChat} disabled={!chatInput.trim()}>
              Send
            </Button>
          </Box>
        </Paper>
      </Slide>

      <Fab
        color="primary"
        aria-label="chat"
        onClick={() => setChatOpen((open) => !open)}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        {chatOpen ? <Close /> : <ChatBubbleOutline />}
      </Fab>
    </Container>
  );
}

export default Dashboard;
