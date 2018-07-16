(function(app) {
  'use strict';

  function createStorage() {
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

  var frugalisDB = localStorage.getItem('frugalisDB');
  if (frugalisDB) {
    app.db.storage = JSON.parse(frugalisDB, function(key, value) {
      if (key === 'startDate' || key === 'endDate' 
      || key === 'referenceDate' || key === 'date' ||
      key === 'deadlineDate') {
        return new Date(value);
      } else {
        return value;
      }
    });
  } else {
    createStorage();
  }

  app.getUserName = function() {
    return app.db.storage.userName || '';
  };

  app.getReferenceDate = function() {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.referenceDate || new Date();
  }
    
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

  app.calcDaysInPeriod = function(callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    if (activePeriod) {
      var startDate = activePeriod.startDate;
      var endDate = activePeriod.endDate;
      var durationInDays = app.dateDiff(startDate, endDate);
      callback(null, durationInDays);
    } else {
      callback('No active period. Please choose active period.');
    }
  };

  app.remainingDaysInPeriod = function(callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var startDate = app.getReferenceDate();
    var endDate = activePeriod.endDate;
    var durationInDays = app.dateDiff(startDate, endDate);
    callback(null, durationInDays);
  };

  app.getTargetBudget = function(callback) {
    app.db.calcTotalPlannedIncome(function(err, totalPlannedIncome) {
      if (err) {
        callback(err);
      } else {
        app.db.calcTotalPlannedExpenses(function(err, totalPlannedExpenses) {
          if (err) {
            callback(err);
          } else {
            app.calcDaysInPeriod(function(err, daysInPeriod) {
              if (err) {
                callback(err);
              } else {
                if (daysInPeriod > 0) {
                  var targetBudget = totalPlannedIncome - totalPlannedExpenses;
                  targetBudget /= daysInPeriod;
                  callback(null, targetBudget);
                } else {
                  callback('Number of days is ' + daysInPeriod + ', which is out of range.');
                }
              }
            });
          }
        });
      }
    });
  };

  app.getActualDailyBudget = function(callback) {
    app.db.calcTotalActualIncome(function(err, actualIncome) {
      if (err) {
        callback(err);
      } else {
        app.db.calcPlannedExpensesBalance(function(err, plannedExpensesBalance) {
          if (err) {
            callback(err);
          } else {
            app.remainingDaysInPeriod(function(err, daysInPeriod) {
              if (err) {
                callback(err);
              } else {
                if (daysInPeriod > 0) {
                  var budget = actualIncome - plannedExpensesBalance;
                  budget /= daysInPeriod;
                  callback(null, budget);
                } else {
                  callback('Number of days is ' + daysInPeriod + ', which is out of range.');
                } 
              }
            });
          }
        });
      }
    });
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

  app.reset = function() {
    // localStorage.clear();
    // app.db.
    // app.db.bootstrap();
    createStorage();
  }


  app.activatePeriod = function(id, callback) {
    var periods = app.db.getBudgetingPeriods();
    app.db.storage.activePeriod = periods[id];
    // console.log(app.db.storage);
    app.db.persist(callback);
  }
})(frugalisApp);