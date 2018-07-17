(function(app) {
  'use strict';
  
  app.populateActualExpensesTableView = function() {
    var actualExpenses = app.db.getActualExpenses();
    var table = document.getElementById('actualExpensesTable');
    actualExpenses.forEach(function(actualExpense, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var col4 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'actualExpensesForm\', ' + idx + ')">';
      html += actualExpense.amount.toFixed(2) + '</a>';
      col1.innerHTML = html
      col2.innerHTML = actualExpense.expenseType;
      col3.innerHTML = actualExpense.account;
      col4.innerHTML = app.formatDate(actualExpense.date);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    });
  }

  app.showActualExpensesTableView = function() {
    var url = './views/actual-expenses/actual-expenses-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        app.populateActualExpensesTableView();
      }
    });
  };
})(frugalisApp);
