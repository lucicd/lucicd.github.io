(function(app) {
  'use strict';

  app.populateHomeView = function() {
    var el = document.getElementById('welcomeMsg');
    var user = app.getUserName();
    el.innerHTML = 'Welcome' + (user ? ' ' + user : '') + '!';
    
    el = document.getElementById('activeBudgetPeriod');
    var period = app.getActiveBudgetPeriod();
    if (period) {
      el.innerHTML = 'Period: ' + 
        (period.startDate ? app.formatDate(period.startDate) : '-') + ' until ' + 
        (period.endDate ? app.formatDate(period.endDate) : '-');
    } else {
      el.innerHTML = 'Period: - until -'; 
    }

    app.getTargetBudget(function(err, targetBudget) {
      var el = document.getElementById('targetBudgetMsg');
      if (err) {
        el.innerHTML = err;
      } else {
        el.innerHTML = 'Your target is ' + targetBudget.toFixed(2);
        app.getActualDailyBudget(function(err, dailyBudget) {
          var el = document.getElementById('budgetOrb');
          if (err) {
            el.innerHTML = err;
          } else {
            var backgroundColor;
            var warningMsg;
            if (dailyBudget >= targetBudget) {
              backgroundColor = '#05550D';
              warningMsg = 'Congratulations, you are on target!';
            } else {
              backgroundColor = '#FF7308';
              warningMsg = 'Be careful, you are overspending!';
            }
            var html = '<p class="dailyBudgetMsg">Daily budget</p>';
            html += '<p class="dailyBudgetAmt">' + dailyBudget.toFixed(2) + '</p>'
            el.innerHTML = html;
            el.style.backgroundColor = backgroundColor;
            el = document.getElementById('warningMsg');
            el.innerHTML = warningMsg;
          }
        });
      }
    });

    app.getIncomeAlerts(3, function(err, incomeAlerts) {
      var el = document.getElementById('homeScreenAlerts');
      if (err) {
        el.innerHTML = err;
      } else {
        app.getExpensesAlerts(3, function(err, expensesAlerts) {
          if (err) {
            el.innerHTML = err;
          } else {
            var alerts = incomeAlerts.concat(expensesAlerts);
            if (alerts.length > 0) {
              var html = '<p>Alerts</p>';
              html += '<ul>';
              alerts.forEach(function(msg) {
                html += '<li>' + msg + '</li>';
              });
              html += '</ul>';
              el.innerHTML = html;
            } else {
              el.innerHTML = 'No alerts';
            }
          }
        });
      }
    });

    var el = document.getElementById('enterIncomeBtn');
    el.addEventListener('click', function() {
      app.route('actualIncomesForm', -1);
    });

    el = document.getElementById('enterExpenseBtn');
    el.addEventListener('click', function() {
      app.route('actualExpensesForm', -1);
    });

    el = document.getElementById('planIncomeBtn');
    el.addEventListener('click', function() {
      app.route('plannedIncomesTable');
    });

    el = document.getElementById('planExpensesBtn');
    el.addEventListener('click', function() {
      app.route('plannedExpensesTable');
    });

    el = document.getElementById('budgetReportBtn');
    el.addEventListener('click', function() {
      app.route('budgetReport');
    });

  }

  app.showHomeView = function() {
    app.getViewHtml('./views/home/home.html', function(err, response) {
      var target =  document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.populateHomeView();
      }
    });
  };
})(frugalisApp);