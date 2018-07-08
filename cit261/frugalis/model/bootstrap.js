(function(app) {
  'use strict';

  var periods = [
    {
      startDate: new Date('2018-1-1'),
      endDate: new Date('2018-1-31'),
      referenceDate: new Date('2018-1-15'),
    },
    {
      startDate: new Date('2018-2-1'),
      endDate: new Date('2018-2-28'),
      referenceDate: new Date('2018-2-15'),
    },
    {
      startDate: new Date('2018-3-1'),
      endDate: new Date('2018-3-31'),
      referenceDate: new Date('2018-3-15'),
    },
    {
      startDate: new Date('2018-4-1'),
      endDate: new Date('2018-4-30'),
      referenceDate: new Date('2018-4-15'),
    },
    {
      startDate: new Date('2018-5-1'),
      endDate: new Date('2018-5-31'),
      referenceDate: new Date('2018-5-15'),
    },
    {
      startDate: new Date('2018-6-1'),
      endDate: new Date('2018-6-30'),
      referenceDate: new Date('2018-6-15'),
    },
    {
      startDate: new Date('2018-7-1'),
      endDate: new Date('2018-7-31'),
      referenceDate: new Date('2018-7-15'),
    },
  ];

  var incomeTypes = [
    {name: 'Salary'},
    {name: 'Starting Balance'},
  ];

  var expenseTypes = [
    {name: 'Tithing'},
    {name: 'Fast Offering'},
    {name: 'DEWA'},
    {name: 'Telecom'},
    {name: 'Rent'},
    {name: 'Family support'},
    {name: 'Savings'},
    {name: 'Misc'},
    {name: 'Credit card bill'},
  ];

  var accounts = [
    {name: 'Current'},
    {name: 'Cash'},
    {name: 'Credit Card'},
  ];

  app.db.bootstrap = function() {

    function bootstrapMe(records, creator, callback) {
      var tasks = records.map(function(rec) {
        return function(callback) {
          creator(rec, callback);
        }
      });
      app.performTasks(tasks, function() {
        callback();
      });
    }
    
    function bootstrapPeriods(callback) {
      bootstrapMe(periods, app.db.createBudgetingPeriod, function() {
        bootstrapIncomeTypes(callback);
      });
    }

    function bootstrapIncomeTypes(callback) {
      bootstrapMe(incomeTypes, app.db.createIncomeType, function() {
        bootstrapExpenseTypes(callback);
      });
    }

    function bootstrapExpenseTypes(callback) {
      bootstrapMe(expenseTypes, app.db.createExpenseType, function() {
        bootstrapAccounts(callback);
      });
    }

    function bootstrapAccounts(callback) {
      bootstrapMe(accounts, app.db.createAccount, function() {
        callback();
      });
    }

    bootstrapPeriods(function() {
      console.log(app.db.storage);
    });
  };
})(frugalisApp);