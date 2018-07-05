(function(app) {
  'use strict';

  var frugalisDB = localStorage.getItem('frugalisDB');
  if (frugalisDB === null) {
    app.db.storage = {
      budgetingPeriods: [],
      incomeTypes: [],
      expenseTypes: [],
      accounts: [],
      userName: null,
      activePeriod: null,
      showPlannedExpensesAlert: null,
      showPlannedIncomeAlert: null,
    };
    app.db.bootstrap();
    frugalisDB = JSON.stringify(app.db.storage);
    localStorage.setItem('frugalisDB', frugalisDB);
  } else {
    app.db.storage = JSON.parse(frugalisDB);
  }
})(frugalisApp);