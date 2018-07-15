(function(app) {
  'use strict';

  var incomeTypes = [
    {name: 'Salary'},
    {name: 'Starting Balance'},
  ];

  var expenseTypes = [
    {name: 'Tithing'},
    {name: 'Fast Offering'},
    {name: 'Utilities'},
    {name: 'Phone'},
    {name: 'Internet'},
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
    
    // function bootstrapPeriods(callback) {
    //   bootstrapMe(periods, app.db.createBudgetingPeriod, function() {
    //     bootstrapIncomeTypes(callback);
    //   });
    // }

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
        // bootstrapActivePeriod(callback);
        callback();
      });
    }

    // function bootstrapActivePeriod(callback) {
    //   app.setDefaultActivePeriod(function() {
    //     callback();
    //   });
    // }

    bootstrapIncomeTypes(function() {
      // console.log(app.db.storage);
    });
  };
})(frugalisApp);