import axios from 'axios'
import './App.css';
import {useState} from "react";
import globe from "./assets/spinning-globe.jpg"
import worldmap from "./assets/world_map.png"
import regionColorNames from "./helpers/regionColorHelper.js";
import sortPopulationHelper from "./helpers/sortPopulationHelper.js";

function App() {

    const [countries, setCountries] = useState("")
    const [countryName, setCountryName] = useState("")
    const [countryData, setCountryData] = useState("")
    const [error, setError] = useState("")

    async function fetchAllCountries() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/all');
            console.log(result.data)
            const sortedCountries = sortPopulationHelper(result.data)
            setCountries(sortedCountries);
        } catch (e) {
            console.error(e);
        }
    }

    async function fetchCountry() {
        try {
            setError("")

            const result = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
            console.log(result.data)
            setCountryData(result.data)
            setCountryName("");
        } catch (e) {
            console.error(e)
            setError(`${countryName} bestaat niet. Probeer het opnieuw.`)
        }
    }

    return (
        <>
            <main className="page-container">
                <section className="all-countries-section">
                <span className="header-image-wrapper">
                    <img className="header-image" src={worldmap} alt="world-map"/>
                </span>
                        <button className="all-countries-button" type="button" onClick={fetchAllCountries}>Zoek alle landen</button>
                    <ul className="countries-container">
                        {countries && countries.map((country) => (
                            <li key={country.cca2}>
                                <section className="all-country-cards">
                                    <div className="country-information">
                                        <img className="country-flag-images"
                                             src={country.flags.png}
                                             alt={country.name.common}
                                        />
                                        <div className="country-title">
                                            <h1 className={regionColorNames(country.region)}>{country.name.common}</h1>
                                        </div>
                                    </div>
                                    <p className="country-population">Has a population of {country.population}</p>
                                </section>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="individual-country-section">
                    <h1>Search country information</h1>
                    <span className="globe-image-wrapper">
                        <img className="globe-image" src={globe} alt="globe"/>
                    </span>
                    <div className="country-search-bar">
                        <input
                            type="text"
                            className="single-country-input"
                            placeholder="Bijvoorbeeld Nederland of Peru"
                            value={countryName}
                            onChange={(event) => setCountryName(event.target.value)}
                        />
                        <button
                            type="button"
                            className="single-country-search-button"
                            onClick={fetchCountry}
                        >
                                ZOEK
                        </button>
                        {error && <span id="error-message">{error}</span>}
                    </div>
                    {Object.keys(countryData).length > 0 &&
                    <div className="single-country-card">
                        <span className="flag-title-container">
                            <img className="flag" src={countryData[0].flags.svg} alt="flag"/>
                            <h2 className={regionColorNames(countryData[0].region)}>{countryData[0].name.common}</h2>
                        </span>
                        <p>{countryData[0].name.common} is situated in {countryData[0].subregion} and the capital is {countryData[0].capital}</p>
                        <p>It has a population of {countryData[0].population} people {countryData[0].borders && countryData[0].borders.length > 0 ?
                            ` and it borders with ${countryData[0].borders.length} neighboring countries` :
                            ` and it does not share borders with other countries`}</p>
                        <p>Websites can be found on <code>{countryData[0].tld[0]}</code> domain's</p>
                    </div>}
                </section>
            </main>
        </>
    )
}

export default App
