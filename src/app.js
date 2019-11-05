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
            temperatureDegrees = response.data.main.temp;
            temperature.innerHTML = Math.round(temperatureDegrees);
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


function getTemperature(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let apiKey = "cd0cb5334d1e8df4915375bc0f340575";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function convertFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector(".weather-temp--today");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let temperatureFahrenheit = (temperatureDegrees * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(temperatureFahrenheit);
}

function convertCelsius(event) {
    event.preventDefault();

    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

    let temperatureElement = document.querySelector(".weather-temp--today");
    temperatureElement.innerHTML = Math.round(temperatureDegrees);

}

let temperatureDegrees = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);



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