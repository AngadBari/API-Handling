document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const getWeatherBtn = document.getElementById("getWeather");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("cityName");
  const temp = document.getElementById("temperature");
  const desc = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  const API_KEY = "d96c42cff764c8da5d7ad2c1f34e167c";

  getWeatherBtn.addEventListener("click", async function () {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData, city);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data, city) {
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    cityName.textContent = city;
    temp.textContent = `Teamperture :${data.main.temp} °C`;
    desc.textContent = `Weather :${data.weather[0].description}`;
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }
});
