import React, { useState, useEffect } from "react";

async function GetWeatherData(city) {

    const apiKey = "edeae7d4cd472c82a100dcd1d5c5593b";
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fa`;

    const response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error('"شهر مورد نظر یافت نشد"');
    }
    return await response.json();
};

function WeatherApp() {

    const [cityInput, setCityInput] = useState("");
    const [weather, setWeather] = useState({
        city: null,
        temp: null,
        humidity: null,
        wind: null,
        emoji: null
    })
    const [status, setStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if(!cityInput) {
            setStatus("error")
            setErrorMessage('"لطفا یک شهر وارد کنید"')
        }else {
            setStatus("loading");

            try{
                const weatherData = await GetWeatherData(cityInput);
                handleWeatherData(weatherData);
                setStatus("success");
                console.log(weatherData);
            }
            catch(error) {
                setStatus("error");
                setErrorMessage('"شهر مورد نظر یافت نشد"');
            }
        }
    }

    function handleWeatherData(data) {
        const {
            name: city,
            main: { temp, humidity },
            weather: [{ description, id }],
            wind: { speed }
        } = data;

        setWeather({
            city: city,
            temp: temp,
            humidity: humidity,
            wind: speed,
        });

        switch(true) {
            case (id >= 200 && id < 300):
                setWeather(w => ({...w, emoji: "⛈️"}));
                break;
            case (id >= 300 && id < 400):
                setWeather(w => ({...w, emoji: "🌧️"}));
                break;
            case (id >= 500 && id < 600):
                setWeather(w => ({...w, emoji: "🌧️"}));
                break;
            case (id >= 600 && id < 700):
                setWeather(w => ({...w, emoji: "🌨️"}));
                break;
            case (id >= 700 && id < 800):
                setWeather(w => ({...w, emoji: "💨"}));
                break;
            case (id === 800):
                setWeather(w => ({...w, emoji: "☀️"}));
                break;
            case (id >= 801 && id < 810):
                setWeather(w => ({...w, emoji: "🌥️"}));
                break;
            default:
                setWeather(w => ({...w, emoji: "❓"}));
        }
    }

    return (
        <>
            <div className="Card">
                <div className="weather-box">
                    <button type="submit" onClick={handleSubmit}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <input type="text" value={cityInput} className="cityInput" placeholder="نام شهر را وارد کنید" dir="auto"
                            onChange={(e) => setCityInput(e.target.value)}/>
                </div>

                {status === "loading" && <div className="spinner"></div>}

                {status === "error" && <p className="errorDisplay">{errorMessage}</p>}

                {status === "success" &&
                    <>
                        <p className="weatherEmoji">{weather.emoji}</p>
                        <p className="tempDisplay">{weather.temp.toFixed(1)}°C</p>
                        <h1 className="cityDisplay">{weather.city}</h1>
                        <div className="flex-box">
                                <i class="fa-solid fa-water"></i>
                                <p className="humidityDisplay">{weather.humidity}%
                                    <br /><p>رطوبت</p>
                                </p>

                            <i class="fa-solid fa-wind"></i>
                            <p className="windDisplay">{weather.wind} km/h
                                <br /><p>سرعت باد</p>
                            </p>
                        </div>
                    </>}
            </div>
        </>
    )
}

export default WeatherApp