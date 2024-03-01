import axios from 'axios'
import './App.css';
import {useState} from "react";
import worldmap from "./assets/world_map.png"
import regionColorNames from "./helpers/regionColorHelper.js";
import sortPopulationHelper from "./helpers/sortPopulationHelper.js";

function App() {

    const [countries, setCountries] = useState("")

// countries.sort((a, b) => {
//     return a - b;
// })

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

    return (
        <>
            <main className="page-container">
                <img src={worldmap} alt="world-map"/>
                <button type="button" onClick={fetchAllCountries}>Zoek alle landen</button>
                <ul className="countries-container">
                    {countries && countries.map((country) => (
                        <li className="country-cards" key={country.cca2}>
                            <img className="country-flag-images"
                                src={country.flags.png}
                                alt={country.name.common}
                            />
                            <h1 className={regionColorNames(country.region)}>{country.name.common}</h1>
                            <p>Has a population of {country.population}</p>
                        </li>
                    ))}
                </ul>


                {countries &&
                    <div>
                        <p className={regionColorNames(countries[0].region)}>{countries[0].name.common}</p>
                        <p>Has a population of {countries[0].population}</p>
                        <img src={countries[0].flags.png} alt="flag"/>
                    </div>
                }
            </main>
        </>
    )
}

export default App
