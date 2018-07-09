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
    return activePeriod.plannedExpenses;
  };

  app.db.getPlannedExpense = function(id) {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.plannedExpenses[id];
  }
})(frugalisApp);