window.addEventListener('load', function () {
    const api = {
        key: 'd786f219a9c76054e04e0cb49c553140',
        baseurl: 'https://api.openweathermap.org/data/2.5/'
    }

    const searchBox = document.querySelector('#search-box');
    searchBox.addEventListener('keypress', setQuery);

    getResults('Kyiv');
    
    function setQuery(event) {
        if (event.keyCode === 13) {
            getResults(searchBox.value);
            searchBox.value = '';
        }
    }

    function getResults(query) {
        fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(weather => weather.json())
            .then(displayResults);
    }

    function displayResults(weather) {
        const img = document.getElementById('weather-img');
        img.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

        const city = document.querySelector('.location .city');
        city.textContent = `${weather.name}, ${weather.sys.country}`;

        const now = new Date();
        const date = document.querySelector('.location .date');
        date.textContent = dateBuilder(now);

        const temp = document.querySelector('.weather .temp');
        temp.textContent = `${Math.round(weather.main.temp)}`;

        const weather_el = document.querySelector('.forecast-details .weather');
        weather_el.innerText = weather.weather[0].main;

        const feels = document.querySelector('.forecast-details .feels');
        feels.textContent = `Feels like: ${Math.round(weather.main.feels_like)}°C`;

        const humidity = document.querySelector('.forecast-details .humidity');
        humidity.textContent = `Humidity: ${weather.main.humidity}%`;

        const hilow = document.querySelector('.hi-low');
        hilow.innerText = `Max/min: ${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    }

    function dateBuilder (d) {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

})

