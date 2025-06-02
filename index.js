const tempElement = document.getElementById("temp");
const conditionElement = document.getElementById("condition");

// Fetch Weather Data Based on City Name
function fetchWeatherByCity() {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Get latitude and longitude for the city
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        alert("City not found. Try another.");
        return;
      }

      const { latitude, longitude } = data.results[0];

      fetchWeatherData("temp", latitude, longitude); // Default to fetching temperature first
    })
    .catch((error) => console.error("Error fetching city coordinates:", error));
}

// Fetch Weather Data Based on Selected Endpoint
function fetchWeatherData(endpoint, latitude, longitude) {
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  )
    .then((response) => response.json())
    .then((data) => {
      const weatherData = data.current_weather;

      if (endpoint === "temp") {
        const tempFahrenheit = (weatherData.temperature * 9) / 5 + 32;
        tempElement.innerText = `${tempFahrenheit.toFixed(1)}°F`;
      } else {
        conditionElement.innerText = getWeatherCondition(
          weatherData.weathercode
        );
      }
    })
    .catch((error) => {
      document.getElementById(
        "weather"
      ).innerHTML = `<p style="color: red;">Failed to fetch weather data. Try again later.</p>`;
      console.error("Error fetching weather data:", error);
    });
}

// Show Temperature or Condition, Triggering a New API Call Each Time
function showWeatherData(type) {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        alert("City not found. Try another.");
        return;
      }

      const { latitude, longitude } = data.results[0];

      fetchWeatherData(type, latitude, longitude);
      document.getElementById("tempContainer").style.display =
        type === "temp" ? "block" : "none";
      document.getElementById("conditionContainer").style.display =
        type === "condition" ? "block" : "none";
    })
    .catch((error) => console.error("Error fetching city coordinates:", error));
}

// Convert Weather Codes to Readable Descriptions
function getWeatherCondition(code) {
  const conditions = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Dense Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Heavy Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    95: "Thunderstorms",
  };
  return conditions[code] || "Unknown Condition";
}
