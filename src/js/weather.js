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

    // Visa olika bilder beroende på väderbeskrivning på angiven plats
    var weatherIcon;
    // Visa olika bilder beroende på temperaturen på angiven plats
   var temperatureIcon;

    if (weatherDescription.includes("mulet") || weatherDescription.includes("molnigt")) {
    weatherIcon = new URL('./../images/cloudy.png', import.meta.url);
   } else if (weatherDescription.includes("soligt")) {
    weatherIcon = new URL('./../images/sunny.png', import.meta.url);
   } else if (weatherDescription.includes("klar himmel")) {
    weatherIcon = new URL('./../images/clear.png', import.meta.url);
   } else if (weatherDescription.includes("snö")) {
    weatherIcon = new URL('./../images/snow.png', import.meta.url);
   } else if (weatherDescription.includes("växlande molnighet")) {
    weatherIcon = new URL('./../images/mixedclouds.png', import.meta.url);
   } else if (weatherDescription.includes("lätt regn") || weatherDescription.includes("regn")) {
    weatherIcon = new URL('./../images/rain.png', import.meta.url);
   }

    // bild som visas om temperaturen är 20 grader eller högre
    if (temperatureCelsius >= 20) {
        temperatureIcon = new URL('./../images/hightemp.png', import.meta.url);
    } 
    // bild som visas om temperaturen är mellan 10 och 20 grader
    else if (temperatureCelsius >= 10 && temperatureCelsius < 20) {
        temperatureIcon = new URL('./../images/mediumtemp.png', import.meta.url);
    } 
    // bild som visas om temperaturen är mellan 0 och 10 grader
    else if (temperatureCelsius >= 0 && temperatureCelsius < 10) {
        temperatureIcon = new URL('./../images/lowertemp.png', import.meta.url);
    } 
    // bild som visas temperaturen är -1 grader eller lägre
    else if (temperatureCelsius < 0) {
        temperatureIcon = new URL('./../images/minustemp.png', import.meta.url);
    }

    var weatherHTML = "<h2>Väder för " + cityName + "</h2>";
    weatherHTML += "<p>Temperatur: " + temperatureCelsius.toFixed(1) + "°C</p>"; // Visa temperatur i Celsius
    weatherHTML += "<p>Väderförhållanden: " + weatherDescription + "</p>";
    weatherHTML += "<img src='" + weatherIcon + "' alt='Väderikon'>";
    weatherHTML += "<img src='" + temperatureIcon + "' alt='Temperaturikon'>";

    weatherInfo.innerHTML = weatherHTML;
}
