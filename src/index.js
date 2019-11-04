function search(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-city");
    if (searchInput.value.length) {
        let city = document.querySelector("#city-name");
        city.innerHTML = searchInput.value;
    }
}
let searchForm = document.querySelector("#change-h1");
searchForm.addEventListener("submit", search);

let apiKey = "cd0cb5334d1e8df4915375bc0f340575";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric";

axios.get(apiUrl).then(convertToCelsius);

function updateDateTime() {
    let dateContainer = document.querySelector("#current-date");
    let currentTime = new Date();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let hours = currentTime.getHours();
    if (hours < 10) hours = "0" + hours;
    let minutes = currentTime.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
    let day = days[currentTime.getDay()];

    dateContainer.innerHTML = `${day}, ${hours}:${minutes}`;
}

function convertToCelsius(response) {
    let temperature = document.querySelector("#realTemperature");
    let currentTemp = newFunction(response);
    let link = document.querySelector("#celsius");
    link.classList.add("active");
    let fahrenheitLink = document.querySelector("#fahrenheit");
    fahrenheitLink.classList.remove("active");
    temperature.innerHTML = `${currentTemp}`;
}


let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);

function newFunction(response) {
    return Math.round(response.data.main.temp);
}

function convertToFahrenheit() {
    let temperature = document.querySelector("#realTemperature");
    let link = document.querySelector("#fahrenheit");
    link.classList.add("active");
    let celsiusLink = document.querySelector("#celsius");
    celsiusLink.classList.remove("active");
    temperature.innerHTML = Math.round(((currentTemp) * 9) / 5 + 32);
}



let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);


convertToCelsius();
updateDateTime();