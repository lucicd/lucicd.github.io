(function(app) {
  'use strict';
  
  app.populatePlannedExpensesTableView = function() {
    var plannedExpenses = app.db.getPlannedExpenses();
    var table = document.getElementById('plannedExpensesTable');
    plannedExpenses.forEach(function(plannedExpense, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'plannedExpensesForm\', ' + idx + ')">';
      html += plannedExpense.amount.toFixed(2) + '</a>';
      col1.innerHTML = html
      col2.innerHTML = plannedExpense.expenseType;
      col3.innerHTML = app.formatDate(plannedExpense.deadlineDate);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      table.appendChild(row);
    });
  }

  app.showPlannedExpensesTableView = function() {
    var url = './views/planned-expenses/planned-expenses-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        app.populatePlannedExpensesTableView();
      }
    });
  };
})(frugalisApp);
