(function(app) {
  'use strict';

  var frugalisDB = localStorage.getItem('frugalisDB');
  if (frugalisDB) {
    app.db.storage = JSON.parse(frugalisDB, function(key, value) {
      if (key === 'startDate' || key === 'endDate' || key === 'referenceDate') {
        return new Date(value);
      } else {
        return value;
      }
    });
  } else {
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
    app.db.persist(function() {});
  }
})(frugalisApp);