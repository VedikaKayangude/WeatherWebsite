document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const search = document.querySelector('.searchbox button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetail = document.querySelector('.weather-details');
  
    search.addEventListener('click', () => {
      const APIkey = 'abc5f957eb094d1344a3fdbd45c684b3';
      const cityInput = document.querySelector('.searchbox input');
      const city= cityInput.value;
  
      console.log("API Key:", APIkey);
      console.log("City:", city);
  
      if (city === '') {
        console.error("City is empty");
        return;
      }
  
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(json => {
          console.log("Weather Data:", json);
          const image = document.querySelector('.weather-box img');
          const temperature = document.querySelector('.weather-box .temperature');
          const description = document.querySelector('.weather-box .description');
          const humidity = document.querySelector('.weather-details .humidity span');
          const wind = document.querySelector('.weather-details .wind span');
  
          if (!image || !temperature || !description || !humidity || !wind) {
            console.error("One or more elements are missing in the DOM");
            return;
          }
  
          // Update elements with API data
          temperature.innerHTML = `${Math.round(json.main.temp - 273.15)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
  
          // Set image based on weather condition
          switch (json.weather[0].main) {
            case 'Clear':
              image.src = 'clear-sky_3222807.png';
              break;
            case 'Rain':
              image.src = 'storm_14838448.png';
              break;
            case 'Snow':
              image.src = 'snow.png';
              break;
            case 'Clouds':
              image.src = 'sky_16227902.png';
              break;
            case 'Mist':
              image.src = 'blowing_8841398.png';
              break;
            default:
              image.src = 'cloud-sun_10497829.png';
              break;
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    });
  });