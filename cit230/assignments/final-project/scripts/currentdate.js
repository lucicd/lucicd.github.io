var CurrentDate = (function() {
  function currentDate() {
    var d = new Date();
    var weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';
    
    var months = new Array(12);
    months[0] = 'January';
    months[1] = 'February';
    months[2] = 'March';
    months[3] = 'April';
    months[4] = 'May';
    months[5] = 'June';
    months[6] = 'July';
    months[7] = 'August';
    months[8] = 'September';
    months[9] = 'October';
    months[10] = 'November';
    months[11] = 'December';
    
    var n = weekday[d.getDay()] + ',&nbsp;' +
      d.getDate() + '&nbsp;' +
      months[d.getMonth()] + '&nbsp;' + 
      d.getFullYear();
    $('#currentdate').html(n);
  }

  return currentDate;

})();
