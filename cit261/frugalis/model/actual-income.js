(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.incomeType) {
      return 'Income type must not be empty.';
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
    rec.incomeType = params.incomeType;
    rec.account = params.account;
    rec.amount = params.amount;
    rec.date = params.date;
    rec.comments = params.comments;
    callback(null, rec);
  }

  app.db.createActualIncome = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.actualIncomes;
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

  app.db.updateActualIncome = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.actualIncomes;
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

  app.db.deleteActualIncome = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.actualIncomes;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getActualIncomes = function() {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod ? activePeriod.actualIncomes : [];
  };

  app.db.getActualIncome = function(id) {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.actualIncomes[id];
  }

  app.db.calcTotalActualIncome = function(callback) {
    var actualIncomes = app.db.getActualIncomes();
    var totalActualIncome = actualIncomes.reduce(function(total, income) {
      return total + income.amount;
    }, 0);
    callback(null, totalActualIncome);
  }
})(frugalisApp);