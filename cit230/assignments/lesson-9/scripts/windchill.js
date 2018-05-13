(function() {
  function chillFactor(t, s) {
    var pow = Math.pow(s, 0.16);
    var cf = 35.74 + 0.6215*t - 35.75*pow + 0.4275*t*pow;
    return Math.round(cf * 10) / 10;
  }

  var highTemp = 90;
  var lowTemp = 66;
  var precipitation = 0;
  var windSpeed = 5;
  var windDirection = 'SW';
  var avgTemp = (highTemp + lowTemp) / 2;
  var chillFactor = chillFactor(avgTemp, windSpeed);
  document.getElementById('high-temp').innerHTML = highTemp;
  document.getElementById('low-temp').innerHTML = lowTemp;
  document.getElementById('precipitation').innerHTML = precipitation;
  document.getElementById('wind-speed').innerHTML = windSpeed;
  document.getElementById('wind-direction').innerHTML = windDirection;
  document.getElementById('chill-factor').innerHTML = chillFactor;
})();