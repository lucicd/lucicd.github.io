(function(app) {
  'use strict';
  
  app.populateIncomeTypesTableView = function() {
    var incomeTypes = app.db.getIncomeTypes();
    var table = document.getElementById('incomeTypesTable');
    incomeTypes.forEach(function(incomeType, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      // var col2 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'incomeTypesForm\', ' + idx + ')">';
      html += incomeType.name + '</a>';
      col1.innerHTML = html
      // col2.innerHTML = incomeType.status ? 'Active' : 'Retired';
      row.appendChild(col1);
      // row.appendChild(col2);
      table.appendChild(row);
    });
  }

  app.showIncomeTypesTableView = function() {
    var url = './views/income-types/income-types-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populateIncomeTypesTableView();
      }
    });
  };
})(frugalisApp);
