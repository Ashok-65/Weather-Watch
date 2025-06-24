
        async function getWeather() {
            const apiKey = 'e3a26b0dff7ffbe56e6313c9923d475d'; 
            const city = document.getElementById('cityInput').value.trim();
            const weatherResult = document.getElementById('weatherResult');
            const errorMsg = document.getElementById('errorMsg');
            weatherResult.innerHTML = '';
            errorMsg.innerHTML = '';

            if (!city) {
                errorMsg.textContent = 'Please enter a city name.';
                return;
            }

            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
                );
                const data = await response.json();

                if (data.cod !== 200) {
                    errorMsg.textContent = 'City not found. Please try again.';
                    return;
                }

                const temp = data.main.temp;
                const humidity = data.main.humidity;
                const description = data.weather[0].description;
                const icon = data.weather[0].icon;

                weatherResult.innerHTML = `
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}" style="vertical-align:middle;">
                    <div><strong>Temperature:</strong> ${temp}°C</div>
                    <div><strong>Humidity:</strong> ${humidity}%</div>
                    <div><strong>Forecast:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</div>
                `;
            } catch (error) {
                errorMsg.textContent = 'Error fetching weather data. Please try again later.';
            } 
        } 
    