/*
Geolocation API: retrieve user's location - map related apps
Skycons - Animate temperature 
*/

window.addEventListener('load', () => {
    let lat, long;

    // Required DOM objects
    const timezone = document.querySelector('.location-timezone');
    const icon = document.querySelector('.icon');
    const temperatureValue = document.querySelector('.temperature-value');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const temperatureUnit = document.querySelector('.temperature-unit');
    const temperatureDescription = document.querySelector('.temperature-description');

    // Parameters for API call
    let units = "metric";
    const exclude = ['minutely', 'hourly'];
    const apiKey = 'eb360c0146bbb5df5d3b61e6ece450e6';

    // Fetch location from browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            callAPI();
        });
    } else {
        alert('Please enable geolocation');
    }

    function callAPI() {

        // Fetch on API link
        // Set icon
        // Change between celcius to Fahrenheit on clicking

        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&appid=${apiKey}&units=${units}`;
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                let {
                    temp
                } = data.current;
                let description = data.current.weather[0].description;

                timezone.textContent = data.timezone;
                temperatureDegree.textContent = temp;
                updateTemperatureUnit("C");
                temperatureDescription.textContent = description;

                setIcon(icon, data.current.weather[0].icon);
                temperatureValue.addEventListener('click', function () {
                    if (temperatureUnit.textContent === "0C") {
                        temperatureDegree.textContent = Math.round(temperatureDegree.textContent * 1.8 + 32);
                        updateTemperatureUnit("F");
                    } else {
                        temperatureDegree.textContent = temp;
                        updateTemperatureUnit("C");
                    }
                });
            });
    }

    function updateTemperatureUnit(unit) {
        temperatureUnit.innerHTML = "<sup>0</sup>" + unit;
    }

    function setIcon(element, iconCode) {
        var skycons = new Skycons({
            "color": "white"
        });
        var skyconCode;

        // Mapping Skycode icon codes with openWeatherMap codes
        switch (iconCode) {
            case "01d":
                skyconCode = Skycons.CLEAR_DAY;
                break;
            case "01n":
                skyconCode = Skycons.CLEAR_NIGHT;
                break;
            case "02d":
                skyconCode = Skycons.PARTLY_CLOUDY_DAY;
                break;
            case "02n":
                skyconCode = Skycons.PARTLY_CLOUDY_NIGHT;
                break;
            case "03d":
                skyconCode = Skycons.CLOUDY;
                break;
            case "09d":
                skyconCode = Skycons.RAIN;
                break;
            case "13d":
                skyconCode = Skycons.SNOW;
                break;
            case "50d":
                skyconCode = Skycons.FOG;
                break;

            default:
        }
        skycons.add(element, skyconCode);
        skycons.play();
    }

});