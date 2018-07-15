(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.expenseType) {
      return 'Expense type must not be empty.';
    }
    if (!params.amount) {
      return 'Ammount must not be empty.';
    }
    if (!params.deadlineDate) {
      return 'Date must not be empty.';
    }
    return null;
  }

  function buildRec(params, rec, callback) {
    rec = rec || {};
    rec.expenseType = params.expenseType;
    rec.amount = params.amount;
    rec.deadlineDate = params.deadlineDate;
    rec.comments = params.comments;
    callback(null, rec);
  }

  app.db.createPlannedExpense = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.plannedExpenses;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      buildRec(params, null, function(err, rec) {
        if (err) {
          callback(err, null);
        } else {
          data.push(rec);
          app.db.persist(function() {
            callback(null, data.length - 1);
          });
        }
      });
    }
  };

  app.db.updatePlannedExpense = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.plannedExpenses;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      buildRec(params, data[params.id], function(err, rec) {
        if (err) {
          callback(err, null);
        } else {
          app.db.persist(function() {
            callback(null, params.id);
          });
        }
      });
    }
  };

  app.db.deletePlannedExpense = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.plannedExpenses;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getPlannedExpenses = function() {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod ? activePeriod.plannedExpenses : [];
  };

  app.db.getPlannedExpense = function(id) {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.plannedExpenses[id];
  };

  app.db.calcTotalPlannedExpenses = function(callback) {
    var plannedExpenses = app.db.getPlannedExpenses();
    var totalPlannedExpenses = plannedExpenses.reduce(function(total, expense) {
      return total + expense.amount;
    }, 0);
    callback(null, totalPlannedExpenses);
  };

  app.db.getPlannedExpensesByType = function(callback) {
    var plannedExpenses = app.db.getPlannedExpenses();
    var actualExpenses = app.db.getActualExpenses();
    var expenseByType = {};
    
    plannedExpenses.forEach(function(expense) {
      if (typeof expenseByType[expense.expenseType] === 'undefined') {
        expenseByType[expense.expenseType] = { planned: 0, actual: 0 };
      }
      expenseByType[expense.expenseType].planned += expense.amount;
    });

    actualExpenses.forEach(function(expense) {
      if (typeof expenseByType[expense.expenseType] === 'undefined') {
        expenseByType[expense.expenseType] = { planned: 0, actual: 0 };
      }
      expenseByType[expense.expenseType].actual += expense.amount;
    });

    callback(null, expenseByType);
  };

  app.db.calcPlannedExpensesBalance = function(callback) {
    app.db.getPlannedExpensesByType(function(err, expenseByType) {
      if (err) {
        callback(err);
      } else {
        var plannedExpensesBalance = Object.keys(expenseByType).reduce(function(total, expenseType) {
          var expense = expenseByType[expenseType];
          return total + expense.planned - expense.actual;
        }, 0);
        callback(null, plannedExpensesBalance);
      }
    });
  };
})(frugalisApp);