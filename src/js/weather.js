"use strict";

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var destination = document.getElementById("destination").value;
    getWeather(destination);
});

function getWeather(destination) {
    var apiKey = '1741ff0be3549e9c58cf88c63b2d789a'; 
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${destination}&appid=${apiKey}&lang=sv`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            document.getElementById("weatherInfo").classList.add("visible");
        })
        .catch(error => {
            console.log('Det uppstod ett fel:', error);
        });
}

function displayWeather(weatherData) {
    var weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = ""; // Rensa tidigare väderinformation

    var cityName = weatherData.name;
    var temperatureKelvin = weatherData.main.temp;
    var temperatureCelsius = temperatureKelvin - 273.15; // Omvandla från Kelvin till Celsius
    var weatherDescription = weatherData.weather[0].description;

    var weatherIcon;
    if (weatherDescription.includes("mulet")) {
        weatherIcon = "src/images/cloudy.png";
    } else if (weatherDescription.includes("soligt")) {
        weatherIcon = "src/images/sunny.png";
    }

    var weatherHTML = "<h2>Väder för " + cityName + "</h2>";
    weatherHTML += "<p>Temperatur: " + temperatureCelsius.toFixed(1) + "°C</p>"; // Visa temperatur i Celsius
    weatherHTML += "<p>Väderförhållanden: " + weatherDescription + "</p>";

    if (weatherIcon) {
        weatherHTML += "<img src='" + weatherIcon + "' alt='" + weatherDescription + "'>";
    }

    weatherInfo.innerHTML = weatherHTML;
}
