(function(app) {
  'use strict';

  function verifyRec(params) {
    if (params.endDate < params.startDate) {
      return 'End date must be larger or equal to start date.';
    }
    if (params.referenceDate < params.startDate) {
      return 'Reference date must be larger or equal to start date.';
    }
    if (params.referenceDate > params.endDate) {
      return 'Reference date must be smaller or equal to end date.';
    }
    return null;
  }

   function checkOverlap(startDate, endDate) {
    return function(rec) {
      return startDate >= rec.startDate && startDate <= rec.endDate || endDate >= rec.startDate && endDate <= rec.endDate;
    };
  }

  app.db.createBudgetingPeriod = function(params, callback) {
    var data = app.db.storage.budgetingPeriods;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkOverlap(params.startDate, params.endDate));
      if (id >= 0) {
        err = 'Overlapping period exists.'
        callback(err, null);
      } else {
        var rec = {
          startDate: params.startDate,
          endDate: params.endDate,
          referenceDate: params.referenceDate,
          plannedIncomes: [],
          plannedExpenses: [],
          actualIncomes: [],
          actualExpenses: [],
          status: true,    
        };
        data.push(rec);
        app.db.storage.activePeriod = rec;
        app.db.persist(function() {
          callback(null, data.length - 1);
        });
      }
    }
  };

  app.db.updateBudgetingPeriod = function(params, callback) {
    var data = app.db.storage.budgetingPeriods;
    var err = verifyRec(params);
    if (err) {
      callback(err, null);
    } else {
      var id = data.findIndex(checkOverlap(params.startDate, params.endDate));
      if (id >= 0 && id != params.id) {
        err = 'Overlapping period exists.'
        callback(err, null);
      } else {
        var rec = data[params.id];
        rec.startDate = params.startDate;
        rec.endDate = params.endDate;
        app.db.persist(function() {
          callback(null, params.id);
        });
      }
    }
  };

  app.db.deleteBudgetingPeriod = function(params, callback) {
    var data = app.db.storage.budgetingPeriods;
    data.splice(params.id, 1);
    app.db.persist(function() {
      callback(null);
    });
  };

  app.db.getBudgetingPeriods = function() {
    return app.db.storage.budgetingPeriods;
  };

  app.db.getBudgetingPeriod = function(id) {
    return app.db.storage.budgetingPeriods[id];
  }
})(frugalisApp);