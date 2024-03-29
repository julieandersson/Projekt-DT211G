// Gemensam jskod för samtliga 4 länder (Spanien, Italien, Frankrike, Kroatien)

"use strict";

// Hämta data om länder från API
async function getCountriesData() {
    const response = await fetch("https://restcountries.com/v2/all")
    const countriesData = await response.json()
    return countriesData;
}

// Visa ländernas information i en tabell
async function displayCountriesTable(countriesOfInterest) {
    const countriesData = await getCountriesData();

    const countries = countriesData.filter(country => countriesOfInterest.includes(country.name));

    const countriesTableBody = document.getElementById('country-table')
    countriesTableBody.innerHTML = ''

// Loopa igenom länderna och skapa en rad för varje land
    for(let country of countries) {
        const row = document.createElement('tr')
        
        // Landets namn
        const nameCell = document.createElement('td')
        nameCell.textContent = country.name
        row.appendChild(nameCell)

        // Landets flagga
        const flagCell = document.createElement('td')
        const flagImg = document.createElement('img')
        flagImg.src = country.flag
        flagCell.appendChild(flagImg)
        row.appendChild(flagCell)

        // Landets befolkning
        const populationCell = document.createElement('td')
        populationCell.textContent = (country.population / 1000000).toFixed(2) + " million"
        row.appendChild(populationCell)

        // Landets yta
        const areaCell = document.createElement('td')
        areaCell.textContent = country.area + " km²"
        row.appendChild(areaCell)

        // Landets landskod
        const callingCodeCell = document.createElement('td')
        callingCodeCell.textContent = '+' + country.callingCodes[0]
        row.appendChild(callingCodeCell)

        // Landets huvudstad
        const capitalCell = document.createElement('td')
        capitalCell.textContent = country.capital
        row.appendChild(capitalCell)

        // Landets språk
        const languagesCell = document.createElement('td')
        const languagesList = country.languages.map(language => language.name)
        languagesCell.textContent = languagesList.join(', ')
        row.appendChild(languagesCell)

        countriesTableBody.appendChild(row)
    }
}

export { displayCountriesTable };
