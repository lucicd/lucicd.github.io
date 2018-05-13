(function() {
  var url = 'https://api.wunderground.com/api/87680c9fcd92f4f7/conditions/forecast/forecast10day/q/MN/Franklin.json';
  var weatherObject = new XMLHttpRequest();
  weatherObject.open('GET', url, true);
  weatherObject.send();
  weatherObject.onload = function() {
    var weatherInfo = JSON.parse(weatherObject.responseText);
    var forecast = weatherInfo.forecast.simpleforecast;
    var txtForecast = weatherInfo.forecast.txt_forecast;
    document.getElementById('current-temp').innerHTML = forecast.forecastday[0].high.fahrenheit;
    document.getElementById('forecast-desc').innerHTML = txtForecast.forecastday[0].fcttext;
    var iconUrl = forecast.forecastday[0].icon_url;
    document.querySelector('.weather-icon').src = iconUrl.replace('http:', 'https:');
    document.querySelector('.weather-desc').innerHTML = forecast.forecastday[0].conditions;

    var current = weatherInfo.current_observation
    document.querySelector('.main-title').innerHTML = current.display_location.full;
    document.getElementById('wind-speed').innerHTML = current.wind_mph;
    for (var i = 0; i < 10; i++) {
      var selector = 'tbody tr td:nth-child(' + (i + 1) + ')';
      var highTemp = forecast.forecastday[i].high.fahrenheit;
      var html = highTemp + '&deg;F';
      document.querySelector(selector).innerHTML = html;
    }
  };
})();

(function() {
  var requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
  var request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.onload = function() {
    var towns = request.response;
    showTown(towns, 'Franklin');
  }
  request.send();

  function showTown(jsonObj, townName) {
    var towns = jsonObj['towns'];
        
    for (var i = 0; i < towns.length; i++) {
      if (towns[i].name === townName) {  

        document.querySelector('#about-one h3').innerHTML = 'About ' + towns[i].name;
        document.querySelector('#about-one p').innerHTML = 'Moto: ' + towns[i].motto + "<br>" +
          'Year Founded: ' + towns[i].yearFounded + "<br>" +
          'Population: ' + towns[i].currentPopulation + "<br>" +
          'Average Rainfall: ' + towns[i].averageRainfall + "<br>" +
          'Events:<br>';
        
        var myList = document.querySelector('#about-one ul');
        var events = towns[i].events;
        for (var j = 0; j < events.length; j++) {
          var listItem = document.createElement('li');
          listItem.textContent = events[j];
          myList.appendChild(listItem);
        }
        break;
      }
    }
  }
})();