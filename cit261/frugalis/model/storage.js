(function(app) {
  'use strict';

  var frugalisDB = localStorage.getItem('frugalisDB');
  if (frugalisDB) {
    app.db.storage = JSON.parse(frugalisDB, function(key, value) {
      if (key === 'startDate' || key === 'endDate' 
      || key === 'referenceDate' || key === 'date') {
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

  app.getUserName = function() {
    return app.db.storage.userName || 'Drazen';
  };
    
  app.getActiveBudgetPeriod = function() {
    return app.db.storage.activePeriod;
  };

  app.getAccounts = function() {
    return app.db.storage.accounts;
  };

  app.getExpenseTypes = function() {
    return app.db.storage.expenseTypes;
  };

  app.getIncomeTypes = function() {
    return app.db.storage.incomeTypes;
  };

  app.setDefaultActivePeriod = function(callback) {
    var data = app.db.storage;
    if (!data.activePeriod) {
      if (data.budgetingPeriods.length > 0) {
        data.activePeriod = data.budgetingPeriods[0];
        data.budgetingPeriods.forEach(function(period) {
          if (period.startDate > data.activePeriod.startDate) {
            data.activePeriod = period;
          }
        });
        app.db.persist(callback);
        return;
      }
    }
    callback();
  };
})(frugalisApp);