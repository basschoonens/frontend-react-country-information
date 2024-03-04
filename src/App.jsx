import axios from 'axios'
import './App.css';
import {useState} from "react";
import worldmap from "./assets/world_map.png"
import regionColorNames from "./helpers/regionColorHelper.js";
import sortPopulationHelper from "./helpers/sortPopulationHelper.js";

function App() {

    const [countries, setCountries] = useState("")
    const [country, setCountry] = useState("")

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

    async function fetchNetherlands() {
        try {
            const result = await axios.get('https://restcountries.com/v3.1/name/netherlands');
            console.log(result.data)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <>
            <main className="page-container">
                <section className="all-countries-section">
                <span className="header-image-wrapper">
                    <img className="header-image" src={worldmap} alt="world-map"/>
                </span>
                    <section className="button-section">
                        <button type="button" onClick={fetchAllCountries}>Zoek alle landen</button>
                        <button type="button" onClick={fetchNetherlands}>Zoek gegevens Nederland</button>
                    </section>
                    <ul className="countries-container">
                        {countries && countries.map((country) => (
                            <li key={country.cca2}>
                                <section className="country-cards">
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
              {/*  {countries &&
                    <div>
                        <p className={regionColorNames(countries[0].region)}>{countries[0].name.common}</p>
                        <p>Has a population of {countries[0].population}</p>
                        <img src={countries[0].flags.png} alt="flag"/>
                    </div>
                }*/}
                <section className="individual-country-section">
                    <h1>Search country information</h1>
                    <span>
                        <img alt="globe"/>
                    </span>
                    <input placeholder="Bijvoorbeeld Nederland of Peru"/><button>ZOEK</button>
                    <div>
                        <img alt="flag"/>
                        <h2>Country name</h2>
                        <p>descriptions</p>
                    </div>
                </section>
            </main>
        </>
    )
}

export default App
