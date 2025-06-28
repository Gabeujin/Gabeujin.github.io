# Gabeujin.github.io

homePage
https://Gabeujin.github.io

## Weather API Configuration

The weather widget requires an OpenWeather API key. The application reads this
key from a global variable named `WEATHER_API_KEY`. You can provide the key in
two ways:

1. **Local development** – create a file
   `resources/js/config/weatherConfig.js` and define the key:

   ```javascript
   // resources/js/config/weatherConfig.js
   window.WEATHER_API_KEY = 'your-openweather-key';
   ```

   Ensure this file is loaded before `weather.js` in your HTML.

2. **Deployment** – set the environment variable `WEATHER_API_KEY` during your
   build or hosting process. The script falls back to this environment variable
   if the global variable is not defined.

If the key is missing, a warning is printed in the browser console and weather
information will not load.
