"use strict";

var submit = document.getElementById("submit");
var destination = document.getElementById("destination");
var resultDiv = document.getElementById("result");
submit.addEventListener("click", () => {
    var countryName = destination.value; // Hämta landets namn från inputfältet
    var finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);
    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        // Kontrollera om API-svaret innehåller någon data
        if (data && data.length > 0) {
            // Hämta flaggans URL från API
            var flagURL = data[0].flags.svg;
            // Uppdatera HTML-elementet för att visa flaggan
            resultDiv.innerHTML = `<img src="${flagURL}" alt="Flagga för ${countryName}" class="flag-img">`;
        } else {
            // Om landet inte hittades, visa ett felmeddelande
            resultDiv.innerHTML = ""; // Visa ingen bild
            alert("Landet kunde inte hittas.");
        }
    })
    .catch((error) => {
        // Vid fel vid anropet till API:et
        resultDiv.innerHTML = ""; // Visa ingen bild
        console.error('Det uppstod ett fel:', error);
        alert("Ett fel uppstod vid hämtning av flaggan.");
    });
});
