# william-solan-open-api
open api project (Open-Meteo - a weather api)

# Weather App
A simple weather application that fetches real-time temperature and condition data based on user input.

## Installation & Usage
### 1. Clone the Repository

### 2. Navigate to the Project Folder

### 3. Open the HTML File Locally
Simply open `index.html` in your browser.

## Features
- Allows users to enter a **city name** to retrieve weather data.
- **Navigation buttons** to toggle between temperature and condition views.
- **Two GET requests**: one for temperature, another for weather condition.
- **Error handling**: Alerts for invalid city input and failed API requests.
- **Stylized UI** with animated elements.

## Dependencies
No external dependencies are required. The application runs purely on **HTML, CSS, and JavaScript**.

## API Used
- **Open-Meteo API** ([Documentation](https://open-meteo.com))
  - `/v1/search` - Fetches city coordinates.
  - `/v1/forecast` - Fetches weather details.

## Error Handling
- If the city name is invalid, the user is alerted.
- If the API fails, an error message is displayed.

## Future Enhancements
- Improve error notifications for better visibility.
- Add more weather details like **humidity** and **wind speed**.
