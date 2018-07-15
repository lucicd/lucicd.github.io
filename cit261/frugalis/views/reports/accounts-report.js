(function(app) {
  'use strict';

  app.populateAccountsReportView = function() {

    function addRow(val1, val2, val3, val4) {
      var table = document.getElementById('accountsReportTable');
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var col4 = document.createElement('td');
      col1.innerHTML = val1
      col2.innerHTML = val2;
      col3.innerHTML = val3;
      col4.innerHTML = val4;
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    }

    function addError(err) {
      var table = document.getElementById('accountsReportTable');
      var html = '<tr><td colspan="4">' + err + '</td></tr>'
      table.innerHTML = html;
    }

    app.getSummaryPerAccount(function(err, summaryPerAccount) {
      if (err) {
        addError(err);
      } else {
        Object.keys(summaryPerAccount).forEach(function(accountName) {
          var accountSummary = summaryPerAccount[accountName];
          addRow(accountName, accountSummary.totalIncome.toFixed(2),
            accountSummary.totalExpense.toFixed(2), 
            (accountSummary.totalIncome - accountSummary.totalExpense).toFixed(2));
        });
      }
    });
  };

  app.showAccountsReport = function() {
    app.getViewHtml('./views/reports/accounts-report.html', function(err, response) {
      var target =  document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populateAccountsReportView();
      }
    });
  };

})(frugalisApp);