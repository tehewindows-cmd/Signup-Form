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
        desc: null,
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
            weather: [{ description, id }]
        } = data;

        setWeather({
            city: city,
            temp: temp,
            humidity: humidity,
            desc: description,
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
            <form className="weatherForm" onSubmit={handleSubmit}>
                <button type="submit">دریافت آب و هوا</button>
                <input type="text" value={cityInput} className="cityInput" placeholder="نام شهر را وارد کنید" dir="auto" 
                       onChange={(e) => setCityInput(e.target.value)}/>
            </form>

            {status === "loading" && <div className="spinner"></div>}

            {status === "error" && <div className="Card"><p className="errorDisplay">{errorMessage}</p></div>}
            {status === "success" && 
            <div className="Card">
                <h1 className="cityDisplay">{weather.city}</h1>
                <p className="tempDisplay">{weather.temp.toFixed(1)}°C</p>
                <p className="humidityDisplay">رطوبت: %{weather.humidity}</p>
                <p className="descDisplay">{weather.desc}</p>
                <p className="weatherEmoji">{weather.emoji}</p>
            </div>}
        </>
    )
}

export default WeatherApp