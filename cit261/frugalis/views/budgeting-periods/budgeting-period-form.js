(function(app) {
  'use strict';
  
  function populateBudgetingPeriodFormView() {
    // var periods = app.db.getBudgetingPeriods();
    // var table = document.getElementById('budgetingPeriodsTable');
    // periods.forEach(function(period) {
    //   var row = document.createElement('tr');
    //   var col1 = document.createElement('td');
    //   var col2 = document.createElement('td');
    //   var col3 = document.createElement('td');
    //   col1.innerHTML = app.formatDate(period.startDate);
    //   col2.innerHTML = app.formatDate(period.endDate);
    //   col3.innerHTML = period.status ? 'Active' : 'Retired';
    //   row.appendChild(col1);
    //   row.appendChild(col2);
    //   row.appendChild(col3);
    //   table.appendChild(row);
    // });
  }

  app.showBudgetingPeriodFormView = function() {
    var url = './views/budgeting-periods/budgeting-period-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        populateBudgetingPeriodFormView();
      }
    });
  };
})(frugalisApp);
