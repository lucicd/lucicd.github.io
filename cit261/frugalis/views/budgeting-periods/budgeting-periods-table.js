(function(app) {
  'use strict';
  
  app.populateBudgetingPeriodsTableView = function() {
    var periods = app.db.getBudgetingPeriods();
    var activePeriod = app.getActiveBudgetPeriod();
    var table = document.getElementById('budgetingPeriodsTable');
    periods.forEach(function(period, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'budgetingPeriodsForm\', ' + idx + ')">';
      html += app.formatDate(period.startDate) + '</a>';
      col1.innerHTML = html
      col2.innerHTML = app.formatDate(period.endDate);
      if (activePeriod && activePeriod.startDate.toString() === period.startDate.toString() &&
      activePeriod.endDate.toString() === period.endDate.toString()) {
        col3.innerHTML = 'Active';
      } else {
        col3.innerHTML = '&nbsp;';
      }
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    });
  }

  app.showBudgetingPeriodsTableView = function() {
    var url = './views/budgeting-periods/budgeting-periods-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        app.populateBudgetingPeriodsTableView();
      }
    });
  };
})(frugalisApp);
