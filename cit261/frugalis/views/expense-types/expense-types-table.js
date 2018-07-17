(function(app) {
  'use strict';
  
  app.populateExpenseTypesTableView = function() {
    var expenseTypes = app.db.getExpenseTypes();
    var table = document.getElementById('expenseTypesTable');
    expenseTypes.forEach(function(expenseType, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      // var col2 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'expenseTypesForm\', ' + idx + ')">';
      html += expenseType.name + '</a>';
      col1.innerHTML = html
      // col2.innerHTML = expenseType.status ? 'Active' : 'Retired';
      row.appendChild(col1);
      // row.appendChild(col2);
      table.appendChild(row);
    });
  }

  app.showExpenseTypesTableView = function() {
    var url = './views/expense-types/expense-types-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        app.populateExpenseTypesTableView();
      }
    });
  };
})(frugalisApp);
