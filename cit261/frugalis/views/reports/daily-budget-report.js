(function(app) {
  'use strict';

  app.populateDailyBudgetReportView = function() {
    var period = app.getActiveBudgetPeriod();
    
    var el = document.getElementById('startDate');
    el.innerHTML = app.formatDate(period.startDate);
    
    var el = document.getElementById('endDate');
    el.innerHTML = app.formatDate(period.endDate);

    var periodDuration;
    app.calcDaysInPeriod(function(err, days) {
      var el = document.getElementById('periodDuration')
      if (err) {
        el.innerHTML = err;
      } else {
        el.innerHTML = days + '&nbsp;days';
        periodDuration = days;
      }
    });

    var el = document.getElementById('referenceDate');
    el.innerHTML = app.formatDate(app.getReferenceDate());

    var remainingDays;
    app.remainingDaysInPeriod(function(err, days) {
      var el = document.getElementById('remainingDays');
      if (err) {
        el.innerHTML = err;
      } else {
        remainingDays = days;
        el.innerHTML = days;
      }
    });

    function addRow(tableId, val1, val2, val3, val4) {
      var table = document.getElementById(tableId);
      var row = document.createElement('tr');
      var col1 = document.createElement('td');
      var col2 = document.createElement('td');
      var col3 = document.createElement('td');
      var col4 = document.createElement('td');
      col1.innerHTML = val1
      col2.innerHTML = val2;
      col3.innerHTML = val3;
      col4.innerHTML = val4;
      row.appendChild(col1);
      row.appendChild(col2);
      row.appendChild(col3);
      row.appendChild(col4);
      table.appendChild(row);
    }

    function addError(tableId, err) {
      var table = document.getElementById(tableId);
      var html = '<tr><td colspan="4">' + err + '</td></tr>'
      table.innerHTML = html;
    }

    var totalPlannedIncome;
    var totalActualIncome;

    function populateSummaryIncome(callback) {
      app.db.calcTotalPlannedIncome(function(err, amount) {
        if (err) {
          callbakc(err);
        } else {
          totalPlannedIncome = amount;
          app.db.calcTotalActualIncome(function(err, amount) {
            if (err) {
              callbakc(err);
            } else {
              totalActualIncome = amount;
              addRow('summaryReportTable', 'Income', totalPlannedIncome.toFixed(2), totalActualIncome.toFixed(2), 
                (totalPlannedIncome - totalActualIncome).toFixed(2));
              callback();
            }
          });
        }
      });
    }

    var totalPlannedExpenses;
    var totalActualExpenses;

    function populateSummaryExpenses(callback) {
      app.db.calcTotalPlannedExpenses(function(err, amount) {
        if (err) {
          callback(err);
        } else {
          totalPlannedExpenses = amount;
          app.db.calcTotalActualExpenses(function(err, amount) {
            if (err) {
              callback(err);
            } else {
              totalActualExpenses = amount;
              addRow('summaryReportTable', 'Expenses', totalPlannedExpenses.toFixed(2), totalActualExpenses.toFixed(2), 
                (totalPlannedExpenses - totalActualExpenses).toFixed(2));
              callback();
            }
          });
        }
      });
    }

    function populateSummary() {
      populateSummaryIncome(function(err) {
        if (err) {
          addError('summaryReportTable', err);
        } else {
          populateSummaryExpenses(function(err) {
            if (err) {
              addError('summaryReportTable', err);
            } else {
              var el = document.getElementById('plannedDailyBudget');
              if (periodDuration > 0) {
                var plannedDailyBudget = totalPlannedIncome - totalPlannedExpenses;
                plannedDailyBudget /= periodDuration;
                el.innerHTML = plannedDailyBudget.toFixed(2);
              } else {
                el.innerHTML = 'Number of days is ' + periodDuration + ', which is out of range.';
              }
              el = document.getElementById('actualDailyBudget');
              if (remainingDays > 0) {
                var actualDailyBudget = totalActualIncome - totalPlannedExpenses + totalActualExpenses;
                actualDailyBudget /= remainingDays;
                el.innerHTML = actualDailyBudget.toFixed(2);
              } else {
                el.innerHTML = 'Number of days is ' + remainingDays + ', which is out of range.';
              }
            }
          });
        }
      });
    }

    function populteExpensesSummary() {
      app.db.getPlannedExpensesByType(function(err, expenseByType) {
        if (err) {
          addError('summaryExpensesTable', err);
        } else {
          Object.keys(expenseByType).forEach(function(expenseType) {
            var expense = expenseByType[expenseType];
            addRow('summaryExpensesTable', expenseType, 
              expense.planned.toFixed(2), expense.actual.toFixed(2), 
              (expense.planned - expense.actual).toFixed(2));
          });
        }
      });
    }

    function populteIncomeSummary() {
      app.db.getPlannedIncomeByType(function(err, incomeByType) {
        if (err) {
          addError('summaryIncomeTable', err);
        } else {
          Object.keys(incomeByType).forEach(function(incomeType) {
            var income = incomeByType[incomeType];
            addRow('summaryIncomeTable', incomeType, 
              income.planned.toFixed(2), income.actual.toFixed(2), 
              (income.planned - income.actual).toFixed(2));
          });
        }
      });
    }

    populateSummary();
    populteIncomeSummary();
    populteExpensesSummary();
  };

  
  app.showDailyBudgetReport = function() {
    app.getViewHtml('./views/reports/daily-budget-report.html', function(err, response) {
      var target =  document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populateDailyBudgetReportView();
      }
    });
  };

})(frugalisApp);