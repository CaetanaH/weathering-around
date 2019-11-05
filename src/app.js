let date = document.querySelector("#weather-date");
let days = document.querySelectorAll(".day__block");
let description = document.querySelector("#weather-description");
let icon = document.querySelector(".weather__icon--today");
let place = document.querySelector("#weather-location");
let precipitation = document.querySelector("#precipitation-probality");
let temperature = document.querySelector(".weather-temp--today");
let wind = document.querySelector("#wind-speed");
let updateButton = document.querySelector("#weather-current-location");
let form = document.querySelector("#weather__form");
let formLocation = form.querySelector("#weather__form-location");

let root = "https://api.openweathermap.org";
let apiKey = "cd0cb5334d1e8df4915375bc0f340575";

function dayOfWeek(dayNumber) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[dayNumber];
}

function minutesConsent(minutesNumber) {
    if (minutesNumber < 10) {
        return "0" + minutesNumber;
    } else {
        return minutesNumber;
    }
}

function updateTime(date) {
    let day = dayOfWeek(date.getDay());
    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = minutesConsent(date.getMinutes());

    return day + " " + hours + ":" + minutes;
}

function updateWeather(queryParams) {
    let apiParams = "appid=" + apiKey + "&units=metric";
    axios
        .get(root + "/data/2.5/weather?" + apiParams + "&" + queryParams)
        .then(function (response) {
            date.innerHTML = updateTime(new Date());
            place.innerHTML = response.data.name;
            description.innerHTML = response.data.weather[0].main;
            temperature.innerHTML = Math.round(response.data.main.temp);
            wind.innerHTML = Math.round(response.data.wind.speed) + "km/h";
            precipitation.innerHTML = Math.round(response.data.main.humidity) + "%";

            icon.setAttribute(
                "src",
                "http://openweathermap.org/img/w/" +
                response.data.weather[0].icon +
                ".png"
            );
        });
}

function convertCelsius() {
    let link = document.querySelector("#celsius");
    link.classList.add("active");
    let fahrenheitLink = document.querySelector("#fahrenheit");
    fahrenheitLink.classList.remove("active");
}

function convertFahrenheit() {
    let link = document.querySelector("#fahrenheit");
    link.classList.add("active");
    let celsiusLink = document.querySelector("#celsius");
    celsiusLink.classList.remove("active");
    temperature.innerHTML = temperature * 9 / 5 + 32;
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

form.addEventListener("submit", function (event) {
    updateWeather("q=" + form.querySelector("#weather__form-location").value);
    event.preventDefault();
});

updateButton.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        updateWeather(
            "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude
        );
    });
});
updateWeather("q=Lisbon");