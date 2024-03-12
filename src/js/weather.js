"use strict";

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var destination = document.getElementById("destination").value;
    getWeatherForecast(destination);
});

function getWeatherForecast(destination) {
    var apiKey = '1741ff0be3549e9c58cf88c63b2d789a'; 
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&appid=${apiKey}&lang=sv`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeatherForecast(data);
            document.getElementById("weatherInfo").style.display = "block";
            document.getElementById("travelPictures").querySelector("p").style.display = "block";
            // Hämta alla <picture>-element inom #travelPictures
            var pictures = document.getElementById("travelPictures").querySelectorAll("picture");
            // Loopa över varje <picture>-element och lägg till klassen visible
            pictures.forEach(function(picture) {
                picture.classList.add("visible");
            });
        })
        .catch(error => {
            console.log('Det uppstod ett fel:', error);
        });
}

function displayWeatherForecast(weatherData) {
    var weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = ""; // Rensa tidigare väderinformation

    var dailyForecasts = {};
    weatherData.list.forEach(function(forecast) {
        var date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    Object.values(dailyForecasts).forEach(function(dayForecast) {
        var forecastTime = new Date(dayForecast.dt * 1000); // Omvandla från sekunder till millisekunder och skapa ett datumobjekt
        var temperatureKelvin = dayForecast.main.temp;
        var temperatureCelsius = temperatureKelvin - 273.15; // Omvandla från Kelvin till Celsius
        var weatherDescription = dayForecast.weather[0].description;


    // Visa olika bilder beroende på väderbeskrivning på angiven plats
    var weatherIcon;
    // Visa olika bilder beroende på temperaturen på angiven plats
   var temperatureIcon;

    if (weatherDescription.includes("mulet") || weatherDescription.includes("molnigt") || weatherDescription.includes("lätt molnighet")) {
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

    var forecastHTML = "<p>";
    forecastHTML += "Dag: " + forecastTime.toLocaleDateString() + "<br>";
    forecastHTML += "Temperatur: " + temperatureCelsius.toFixed(1) + "°C<br>";
    forecastHTML += "Väderförhållanden: " + weatherDescription + "<br>";
    forecastHTML += "</p>";

    weatherInfo.innerHTML += forecastHTML;
});
}

// Skapar en autocomplete för inmatningsfältet
var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("destination")
);
