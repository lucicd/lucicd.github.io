frugalisApp.formatDate = function(d) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var day = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear() - 2000;
  return day + '-' + month + '-' + year;
}

frugalisApp.getViewHtml = function(url, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(null, xhttp.responseText);
    } else {
      callback('Error loading ' + url + '. status=' + this.status);
    }
  }
  xhttp.open('GET', url, true);
  xhttp.send();
};