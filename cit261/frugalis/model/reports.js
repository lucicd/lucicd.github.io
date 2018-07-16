(function(app) {
  'use strict';

  app.getSummaryPerAccount = function(callback) {
    var actualExpenses = app.db.getActualExpenses();
    var actualIncomes = app.db.getActualIncomes();
    var summaryPerAccount = {};

    actualIncomes.forEach(function(income) {
      if (typeof summaryPerAccount[income.account] === 'undefined') {
        summaryPerAccount[income.account] = { totalIncome: 0, totalExpense: 0 };
      }
      summaryPerAccount[income.account].totalIncome += income.amount;
    });

    actualExpenses.forEach(function(expense) {
      if (typeof summaryPerAccount[expense.account] === 'undefined') {
        summaryPerAccount[expense.account] = { totalIncome: 0, totalExpense: 0 };
      }
      summaryPerAccount[expense.account].totalExpense += expense.amount;
    });

    callback(null, summaryPerAccount);
  }

  function getPlannedIncomeByTypeAndDeadline(callback) {
    var plannedIncome = app.db.getPlannedIncomes();
    var actualIncome = app.db.getActualIncomes();
    var incomeByType = {};
    
    plannedIncome.forEach(function(income) {
      var type = income.incomeType;
      var deadline = app.formatISODate(income.deadlineDate);
      if (typeof incomeByType[type] === 'undefined') {
        incomeByType[type] = {};
      }
      if (typeof incomeByType[type][deadline] === 'undefined') {
        incomeByType[type][deadline] = { 
          planned: 0, 
          actual: 0,
        };
      }
      incomeByType[type][deadline].planned += income.amount;
    });

    var actualIncomeByType = {};
    actualIncome.forEach(function(income) {
      var type = income.incomeType;
      if (typeof actualIncomeByType[type] === 'undefined') {
        actualIncomeByType[type] = 0;
      }
      actualIncomeByType[type] += income.amount;
    });

    Object.keys(actualIncomeByType).forEach(function(type) {
      if (incomeByType[type]) {
        var total = actualIncomeByType[type];
        Object.keys(incomeByType[type]).forEach(function(deadline) {
          var income = incomeByType[type][deadline];
          var balance = income.planned - income.actual;
          if (total > 0 && balance > 0) {
            if (total > balance) {
              income.actual += balance;
              total -= balance;
            } else {
              income.actual += total;
              total = 0;
            }
          }
        });
      }
    });
    callback(null, incomeByType);
  }

  function getPlannedExpenseByTypeAndDeadline(callback) {
    var plannedExpense = app.db.getPlannedExpenses();
    var actualExpense = app.db.getActualExpenses();
    var expenseByType = {};
    
    plannedExpense.forEach(function(expense) {
      var type = expense.expenseType;
      var deadline = app.formatISODate(expense.deadlineDate);
      if (typeof expenseByType[type] === 'undefined') {
        expenseByType[type] = {};
      }
      if (typeof expenseByType[type][deadline] === 'undefined') {
        expenseByType[type][deadline] = { 
          planned: 0, 
          actual: 0,
        };
      }
      expenseByType[type][deadline].planned += expense.amount;
    });

    var actualExpenseByType = {};
    actualExpense.forEach(function(expense) {
      var type = expense.expenseType;
      if (typeof actualExpenseByType[type] === 'undefined') {
        actualExpenseByType[type] = 0;
      }
      actualExpenseByType[type] += expense.amount;
    });

    Object.keys(actualExpenseByType).forEach(function(type) {
      var total = actualExpenseByType[type];
      if (expenseByType[type]) {
        Object.keys(expenseByType[type]).forEach(function(deadline) {
          var expense = expenseByType[type][deadline];
          var balance = expense.planned - expense.actual;
          if (total > 0 && balance > 0) {
            if (total > balance) {
              expense.actual += balance;
              total -= balance;
            } else {
              expense.actual += total;
              total = 0;
            }
          }
        });
      }
    });
    callback(null, expenseByType);
  }

  function getDueMsg(diff) {
    var msg;
    if (diff === 0) {
      msg = ' is due today.';
    } else if (diff === 1) {
      msg = ' is due tomorrow.';
    } else if (diff > 1) {
      msg = ' is due in ' + diff + ' days.';
    } else if (diff === -1) {
      msg = ' was due yesterday.';
    } else {
      msg = ' was due ' + (-diff) + ' days ago.';
    }
    return msg;
  }

  app.getIncomeAlerts = function(numDays, callback) {
    var today = new Date()
    getPlannedIncomeByTypeAndDeadline(function(err, incomeByType) {
      if (err) {
        callback(err);
      } else {
        var incomeAlerts = [];
        Object.keys(incomeByType).forEach(function(type) {
          Object.keys(incomeByType[type]).forEach(function(deadline) {
            var income = incomeByType[type][deadline];
            var balance = income.planned - income.actual
            if (balance > 0) {
              var diff = app.dateDiff(today, new Date(deadline));
              if (diff <= numDays) {
                var msg = 'Collection of ' + type + getDueMsg(diff);
                msg += ' Balance: ' + balance.toFixed(2);
                incomeAlerts.push(msg);
              }
            }
          });
        });
        callback(null, incomeAlerts);
      }
    });
  }

  app.getExpensesAlerts = function(numDays, callback) {
    var today = new Date()
    getPlannedExpenseByTypeAndDeadline(function(err, expenseByType) {
      if (err) {
        callback(err);
      } else {
        var expenseAlerts = [];
        Object.keys(expenseByType).forEach(function(type) {
          Object.keys(expenseByType[type]).forEach(function(deadline) {
            var expense = expenseByType[type][deadline];
            var balance = expense.planned - expense.actual
            if (balance > 0) {
              var diff = app.dateDiff(today, new Date(deadline));
              if (diff <= numDays) {
                var msg = 'Payment of ' + type + getDueMsg(diff);
                msg += ' Balance: ' + balance.toFixed(2);
                expenseAlerts.push(msg);
              }
            }
          });
        });
        callback(null, expenseAlerts);
      }
    });
  }
})(frugalisApp);