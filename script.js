const apiKey = "d08526e96d3890b8debcea594f5afcc8";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + `q=${city}&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else if (response.ok) {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

            // Assign appropriate weather icon
            const weatherCondition = data.weather[0].main.toLowerCase();
            const iconMap = {
                clouds: "clouds.png",
                clear: "clear.png",
                rain: "rain.png",
                drizzle: "drizzle.png",
                mist: "mist.png",
            };
            weatherIcon.src = `assets/${iconMap[weatherCondition] || "default.png"}`;

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        } else {
            console.error("API Error:", data.message);
            alert("An error occurred. Please try again later.");
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Unable to fetch data. Please check your connection.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

// Check default city's weather on page load
checkWeather("New York");
