(function(app) {
  'use strict';
  
  app.populatePlannedIncomesTableView = function() {
    var plannedIncomes = app.db.getPlannedIncomes();
    var table = document.getElementById('plannedIncomesTable');
    plannedIncomes.forEach(function(plannedIncome, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'plannedIncomesForm\', ' + idx + ')">';
      html += plannedIncome.amount.toFixed(2) + '</a>';
      col1.innerHTML = html
      col2.innerHTML = plannedIncome.incomeType;
      col3.innerHTML = app.formatDate(plannedIncome.deadlineDate);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    });
  }

  app.showPlannedIncomesTableView = function() {
    var url = './views/planned-incomes/planned-incomes-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populatePlannedIncomesTableView();
      }
    });
  };
})(frugalisApp);
