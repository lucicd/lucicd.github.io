(function(app) {
  'use strict';

  app.makePeriodActive = function(id) {
    console.log(id);
    app.activatePeriod(id, function() {
      app.route('selectActivePeriod');
    });
  }
  
  app.populateSelectActivePeriodTableView = function() {
    var periods = app.db.getBudgetingPeriods();
    var activePeriod = app.getActiveBudgetPeriod();
    var table = document.getElementById('selectActivePeriodsTable');
    periods.forEach(function(period, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var html;
      if (activePeriod && activePeriod.startDate.toString() === period.startDate.toString() &&
      activePeriod.endDate.toString() === period.endDate.toString()) {
        html = 'Active';
      } else {
        html = '<a href="javascript:frugalisApp.route(\'makePeriodActive\', ' + idx + ')">';
        html += 'Make&nbsp;active</a>';
      }
      col1.innerHTML = app.formatDate(period.startDate)
      col2.innerHTML = app.formatDate(period.endDate);
      col3.innerHTML = html
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    });
  }

  app.showSelectActivePeriodTableView = function() {
    var url = './views/budgeting-periods/select-active-period.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populateSelectActivePeriodTableView();
      }
    });
  };
})(frugalisApp);
