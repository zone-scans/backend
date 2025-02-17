const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

console.log("API Key:", process.env.API_KEY);

//Middleware
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL || "https://frontend-theta-sooty-15.vercel.app",
  })
);
app.use(express.json());

//Routen
app.get("/api/satellite", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/?&apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    console.log("Error fetching satellite data:", error.message);
    res.status(500).json({
      error: "Failed to fetch satellite data",
      details: error.message,
    });
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something broke!",
    details: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
