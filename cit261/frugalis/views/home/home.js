(function(app) {
  'use strict';

  app.populateHomeView = function() {
    var el = document.getElementById('welcomeMsg');
    el.innerHTML = 'Welcome ' + app.getUserName() + '!';
    
    el = document.getElementById('activeBudgetPeriod');
    var period = app.getActiveBudgetPeriod();
    if (period) {
      el.innerHTML = 'Period: ' + 
        (period.startDate ? app.formatDate(period.startDate) : '-') + ' until ' + 
        (period.endDate ? app.formatDate(period.endDate) : '-');
    } else {
      el.innerHTML = 'Period: - until -'; 
    }

    el = document.getElementById('budgetOrb');
    var dailyBudget = app.getDailyBudget();
    var targetBudget = app.getTargetBudget();
    var backgroundColor;
    var warningMsg;
    if (dailyBudget>=targetBudget) {
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

    el = document.getElementById('targetBudgetMsg');
    el.innerHTML = 'Your target is ' + targetBudget.toFixed(2);

    el = document.getElementById('warningMsg');
    el.innerHTML = warningMsg;

    var warnings = app.getAlertsList();
    var el = document.getElementById('homeScreenAlerts');
    html = '<p>Alerts</p>';
    html += '<ul>';
    warnings.forEach(function(warning) {
      html += '<li>' + warning + '</li>';
    });
    html += '</ul>';
    el.innerHTML = html;
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