import { useState } from 'react';
import fetchWether from './api/http'
import './App.css'

const App = () => {
    const BaseImageUrl = "https://openweathermap.org/img/wn";
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const onChangeHandler = e => setQuery(e.target.value);
    const search = async (e) => {
        // debugger
        if (e.key === "Enter") {
            const data = await fetchWether(query);
            // console.log(data);
            setWeather(data);
            setQuery('');
        }
    }

    return (
        <div className="main-container">
            <input
                type="text"
                className="search"
                placeholder=" search your city"
                value={query}
                onChange={onChangeHandler}
                onKeyPress={search}
            />


            {weather.main && (
                <div className="city-card">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg; C</sup>
                    </div>
                    <div className="city-info">
                        <img className="city-icon"
                            src={`${BaseImageUrl}/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                        />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;