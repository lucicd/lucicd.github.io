(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.expenseType) {
      return 'Expense type must not be empty.';
    }
    if (!params.account) {
      return 'Account must not be empty.';
    }
    if (!params.amount) {
      return 'Ammount must not be empty.';
    }
    if (!params.date) {
      return 'Date must not be empty.';
    }
    return null;
  }

  function buildRec(params, rec, callback) {
    rec = rec || {};
    rec.expenseType = params.expenseType;
    rec.account = params.account;
    rec.amount = params.amount;
    rec.date = params.date;
    rec.comments = params.comments;
    callback(null, rec);
  }

  app.db.createActualExpense = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.actualExpenses;
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

  app.db.updateActualExpense = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.actualExpenses;
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

  app.db.deleteActualExpense = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.actualExpenses;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getActualExpenses = function() {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.actualExpenses;
  };

  app.db.getActualExpense = function(id) {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.actualExpenses[id];
  }
})(frugalisApp);