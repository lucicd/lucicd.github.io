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

  app.db.getPlannedIncomeByType = function(callback) {
    var plannedIncome = app.db.getPlannedIncomes();
    var actualIncome = app.db.getActualIncomes();
    var incomeByType = {};
    
    plannedIncome.forEach(function(income) {
      if (typeof incomeByType[income.incomeType] === 'undefined') {
        incomeByType[income.incomeType] = { 
          planned: 0, 
          actual: 0,
        };
      }
      incomeByType[income.incomeType].planned += income.amount;
    });

    actualIncome.forEach(function(income) {
      if (typeof incomeByType[income.incomeType] === 'undefined') {
        incomeByType[income.incomeType] = { planned: 0, actual: 0 };
      }
      incomeByType[income.incomeType].actual += income.amount;
    });

    callback(null, incomeByType);
  };

  app.db.calcTotalPlannedIncome = function(callback) {
    var plannedIncomes = app.db.getPlannedIncomes();
    var totalPlannedIncome = plannedIncomes.reduce(function(total, income) {
      return total + income.amount;
    }, 0);
    callback(null, totalPlannedIncome);
  }
})(frugalisApp);