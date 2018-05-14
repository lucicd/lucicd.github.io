function show(message) {
  var json = JSON.stringify(message);
  document.getElementById('consoleOutput').innerHTML += json + '\n';
}