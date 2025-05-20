const tempElement = document.getElementById("temp");
const conditionElement = document.getElementById("condition");

fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true")
  .then(response => response.json())
  .then(data => {
    console.log("Full API Response:", data);

    const weatherData = data.current_weather;

    tempElement.innerText = `${weatherData.temperature}°C`;
    conditionElement.innerText = getWeatherCondition(weatherData.weathercode);

    console.log("Temperature:", weatherData.temperature + "°C");
    console.log("Weather Condition:", getWeatherCondition(weatherData.weathercode));
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
  });

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
        95: "Thunderstorms"
    };

    return conditions[code] || "Unknown Condition";
}