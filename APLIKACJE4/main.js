function getWeather() {
    let addressInput = document.getElementById('addressInput');
    let address = addressInput.value;

    if (address.trim() === "") {
        alert("Please type your adress before checking.");
        return;
    }

    let apiKey = '7ded80d91f2b280ec979100cc8bbba94';

    let request = new XMLHttpRequest();

    let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${apiKey}`;
    request.open('GET', currentWeatherUrl, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            let response = JSON.parse(request.responseText);
            displayCurrentWeatherInfo(response);
            console.log('Response from API Current Weather:', response);
        } else {
            alert("Could not download data from API. Try again.");
            console.log('No response from API');
        }
    };

    request.onerror = function () {
        alert("Error. Check if your network works.");
    };
    request.send();

    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${address}&appid=${apiKey}`;
    fetchWeatherData(forecastUrl, displayForecastInfo);

}
function fetchWeatherData(url, callback) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Could not download data from API. Try again..");
            }
            return response.json();
        })
        .then(data => {
            callback(data);
            console.log('Response from Fetch API:', data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayCurrentWeatherInfo(data) {
    let weatherInfo = document.getElementById('weatherInfo');

    let cityName = data.name;
    let temperature = data.main.temp;
    let description = data.weather[0].description;

    weatherInfo.innerHTML = `<h2>Weather in ${cityName}</h2>
                             <p>Temperature: ${temperature} K</p>
                             <p>Desc: ${description}</p>`;
}

function displayForecastInfo(data) {
    let forecastInfo = document.getElementById('forecastInfo');
    forecastInfo.innerHTML = '<h2>5-day forecast:</h2>';

    let forecastData = data.list;

    forecastData.forEach(item => {
        let date = new Date(item.dt * 1000);
        let temperature = item.main.temp;
        let description = item.weather[0].description;

        forecastInfo.innerHTML += `<p>${date.toDateString()} - Temperature: ${temperature} K, Desc: ${description}</p>`;
    });
}
