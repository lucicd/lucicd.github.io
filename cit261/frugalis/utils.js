frugalisApp.formatDate = function(d) {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var day = d.getDate();
  var month = months[d.getMonth()];
  var year = 2000 - d.getFullYear();
  return day + '-' + month + '-' + year;
}