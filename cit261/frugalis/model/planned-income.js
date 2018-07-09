(function(app) {
  'use strict';

  function verifyRec(params) {
    if (!params.incomeType) {
      return 'Income type must not be empty.';
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
    rec.incomeType = params.incomeType;
    rec.amount = params.amount;
    rec.deadlineDate = params.deadlineDate;
    rec.comments = params.comments;
    callback(null, rec);
  }

  app.db.createPlannedIncome = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.plannedIncomes;
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

  app.db.updatePlannedIncome = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.plannedIncomes;
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

  app.db.deletePlannedIncome = function(params, callback) {
    var activePeriod = app.getActiveBudgetPeriod();
    var data = activePeriod.plannedIncomes;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getPlannedIncomes = function() {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.plannedIncomes;
  };

  app.db.getPlannedIncome = function(id) {
    var activePeriod = app.getActiveBudgetPeriod();
    return activePeriod.plannedIncomes[id];
  }
})(frugalisApp);