function show(message) {
  if (message === undefined) {
    document.getElementById('consoleOutput').innerHTML += '\n';
  } else {
    var json;
    if (typeof message === 'string') {
      json = message;
    } else {
      json = JSON.stringify(message, undefined, 2);
    }
    document.getElementById('consoleOutput').innerHTML += json + '\n';    
  }
}

function clear() {
  document.getElementById('consoleOutput').innerHTML = '';
}