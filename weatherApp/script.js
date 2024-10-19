const API_KEY = "98ec8000f11d447ea18192316241910"

// function showWeather(data) {
//     const temp = data.current.temp_c
    
// }

function getWeather(searchVal) {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchVal}`)
    .then((res) => res.json())
    .then((data) => {
        weatherData = data
        console.log(weatherData)
        setInfo(weatherData)
    })
    .catch((error) => console.log(error))
}

const setInfo = (weatherData) => {
    setWeatherIcon(weatherData.current.condition.icon)
    setTemperature(weatherData.current.temp_c)
    setLocation(weatherData.location.name)
    setHumidity(weatherData.current.humidity)
    setWind(weatherData.current.wind_kph)
}

let searchVal = "dehradun"
let weatherData = {}


const searchInput = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const weatherIcon = document.querySelector(".weather-icon")
const temperature = document.querySelector(".temperature")
const locationDiv = document.querySelector(".location")
const humidity = document.querySelector(".humidity")
const humidityIcon = document.querySelector(".humidity-icon")
const humidityVal = document.querySelector(".humidity-value")
const windVal = document.querySelector(".wind-value")

console.log(humidity)
console.log(humidityIcon)
console.log(humidityVal)


searchBtn.addEventListener("click", (e) => {
    console.log("clicked")
    searchVal = searchInput.value.trim()
    getWeather(searchVal)
})

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter')
        searchBtn.click()
})

const setWind = (wind) => {
    windVal.textContent = `${wind} km/h`
}

const setWeatherIcon = (icon) => {
    weatherIcon.src = "https://" + icon
}

const setTemperature = (temp) => {
    temperature.textContent = `${temp} °C`
}

const setLocation = (location) => {
    locationDiv.textContent = location
}

const setHumidity = (humidity) => {
    humidityVal.textContent = `${humidity} % Humidity`
}

console.log(weatherData.current.humidity)


