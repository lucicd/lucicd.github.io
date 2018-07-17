(function(app) {
  'use strict';
  
  app.populateAccountsTableView = function() {
    var accounts = app.db.getAccounts();
    var table = document.getElementById('accountsTable');
    accounts.forEach(function(account, idx) {
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      // var col2 = document.createElement('td');
      var html = '<a href="javascript:frugalisApp.route(\'accountsForm\', ' + idx + ')">';
      html += account.name + '</a>';
      col1.innerHTML = html
      // col2.innerHTML = account.status ? 'Active' : 'Retired';
      row.appendChild(col1);
      // row.appendChild(col2);
      table.appendChild(row);
    });
  }

  app.showAccountsTableView = function() {
    var url = './views/accounts/accounts-table.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        app.populateAccountsTableView();
      }
    });
  };
})(frugalisApp);
