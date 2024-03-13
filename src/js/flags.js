"use strict";

// Skapar manuell översättning till svenska för 4 länder
var countryTranslations = {
    "Spanien": "Spain",
    "Frankrike": "France",
    "Kroatien": "Croatia",
    "Italien": "Italy"
};

function translateCountryName(countryName) {
    // Översätt landets namn
    return countryTranslations[countryName] || countryName;
}

var submit = document.getElementById("submit");
var destination = document.getElementById("destination");
var resultDiv = document.getElementById("result");

submit.addEventListener("click", () => {
    var countryName = destination.value; // Hämta landets namn från inputfältet
    var translatedCountryName = translateCountryName(countryName); // Översätt landets namn
    var finalURL = `https://restcountries.com/v3.1/name/${translatedCountryName}?fullText=true`;
    console.log(finalURL);

    fetch(finalURL)
    .then((response) => response.json())
    .then((data) => {
        // Kontrollera om API-svaret innehåller någon data
        if (data && data.length > 0) {
            // Hämta flaggans URL från API
            var flagURL = data[0].flags.svg;
            // Hämta antalet invånare från API
            var population = data[0].population;
            // Hämta landets huvudstad från API
            var capital = data[0].capital;

            // Uppdatera HTML-elementet för att visa flagga, invånare och huvudstad
            resultDiv.innerHTML = `
            <img src="${flagURL}" alt="Flagga för ${countryName}" class="flag-img">
            <p>Antal invånare: ${population}</p>
                <p>Huvudstad: ${capital}</p>
            `;
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
        alert("Ett fel uppstod vid hämtning av landet.");
    });
});
