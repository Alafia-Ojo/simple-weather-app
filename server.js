import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const app = express();

// Set static folder
app.use(express.static("public"));
// Parse URL-encoded bodies (as sent by html forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Handle GET request for Weather

// let currentTemp = 20;

const apiKey = process.env.WEATHER_API_KEY;
const weatherApiEndpoint = "https://api.weatherapi.com/v1/current.json";

app.get("/get-temperature", async (req, res) => {
  try {
    // Make a request to the weather API
    const response = await axios.get(weatherApiEndpoint, {
      params: {
        key: apiKey,
        q: "Lagos", // Replace with the desired city or location
      },
    });

    // Extract the temperature from the API response
    const currentTemp = response.data.current.temp_c;
    const currentCondition = response.data.current.condition.text;
    const location = response.data.location.region;

    res.send(
      `${currentTemp.toFixed(1)}°C in ${location},is ${currentCondition}`
    );
  } catch (error) {
    console.error("Error fetching temperature:", error.message);
    res.status(500).send("Unable to fetch temperature data");
  }

  //   currentTemp += Math.random() * 2 - 1 //random temp change
  //   res.send(`${currentTemp.toFixed(1)}°C`);
});

// Start the server
app.listen(5000, () => {
  console.log("Server listening on port 5000");
});


module.exports = app;