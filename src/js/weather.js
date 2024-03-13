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
            displayWeatherForecast(data, destination);
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

function displayWeatherForecast(weatherData, destination) {
    var weatherInfo = document.getElementById("weatherInfo");
    weatherInfo.innerHTML = ""; // Rensa tidigare väderinformation

    var heading = document.createElement("h2");
    heading.textContent = "Väder för " + destination;
    weatherInfo.appendChild(heading);

    // Filtrera ut den första prognosen för varje dag
    var dailyForecasts = {};
    weatherData.list.forEach(function(forecast) {
        var date = new Date(forecast.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(forecast);
    });

    Object.entries(dailyForecasts).forEach(function([date, forecasts]) {
        var table = document.createElement("table");
        var tableHeader = document.createElement("thead");
        var tableBody = document.createElement("tbody");

        var headerRow = tableHeader.insertRow();
        var dateHeader = document.createElement("th");
        dateHeader.textContent = date;
        headerRow.appendChild(dateHeader);

        forecasts.forEach(function(forecast) {
            var row = tableBody.insertRow();
            var timeCell = row.insertCell();
            var temperatureCell = row.insertCell();
            var weatherCell = row.insertCell();

        var forecastTime = new Date(forecast.dt * 1000); // Omvandla från sekunder till millisekunder och skapa ett datumobjekt
        timeCell.textContent = forecastTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        var temperatureKelvin = forecast.main.temp;
        var temperatureCelsius = temperatureKelvin - 273.15; // Omvandla från Kelvin till Celsius
        temperatureCell.textContent = temperatureCelsius.toFixed(1) + "°C";

        var weatherDescription = forecast.weather[0].description;
        weatherCell.textContent = weatherDescription;

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

        var iconHTML = "<img src='" + weatherIcon + "' alt='Vädersymbol' style='width: 70px; height: 70px;' class='weather-icon'>";
        iconHTML += "<img src='" + temperatureIcon + "' alt='Temperaturikon' style='width: 70px; height: 70px;' class='temperature-icon'>";

        var iconCell = row.insertCell();
        iconCell.innerHTML = iconHTML;
    });

    table.appendChild(tableHeader);
    table.appendChild(tableBody);
    weatherInfo.appendChild(table);
});
}

// Skapar en autocomplete för inmatningsfältet
var autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("destination")
);
