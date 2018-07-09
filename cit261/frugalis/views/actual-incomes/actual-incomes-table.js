(function(app) {
  'use strict';
  
  app.populateActualIncomesTableView = function() {
    var actualIncomes = app.db.getActualIncomes();
    var table = document.getElementById('actualIncomesTable');
    actualIncomes.forEach(function(actualIncome, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var col4 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'actualIncomesForm\', ' + idx + ')">';
      html += actualIncome.amount.toFixed(2) + '</a>';
      col1.innerHTML = html
      col2.innerHTML = actualIncome.incomeType;
      col3.innerHTML = actualIncome.account;
      col4.innerHTML = app.formatDate(actualIncome.date);
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    });
  }

  app.showActualIncomesTableView = function() {
    var url = './views/actual-incomes/actual-incomes-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populateActualIncomesTableView();
      }
    });
  };
})(frugalisApp);
