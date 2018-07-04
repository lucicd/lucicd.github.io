(function() {
  frugalisApp.populateHomeView = function() {
    var el = document.getElementById('welcomeMsg');
    el.innerHTML = 'Welcome ' + frugalisApp.getUserName() + '!';
    
    el = document.getElementById('activeBudgetPeriod');
    var period = frugalisApp.getActiveBudgetPeriod();
    el.innerHTML = 'Period: ' + 
      frugalisApp.formatDate(period.from) + ' until ' + 
      frugalisApp.formatDate(period.until);

    el = document.getElementById('budgetOrb');
    var dailyBudget = frugalisApp.getDailyBudget();
    var targetBudget = frugalisApp.getTargetBudget();
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

    var warnings = frugalisApp.getAlertsList();
    var el = document.getElementById('homeScreenAlerts');
    html = '<p>Alerts</p>';
    html += '<ul>';
    warnings.forEach(function(warning) {
      html += '<li>' + warning + '</li>';
    });
    html += '</ul>';
    el.innerHTML = html;
  }

  frugalisApp.showHomeView = function() {
    frugalisApp.getViewHtml('./views/home/home.html', function(err, response) {
      var target =  document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        frugalisApp.populateHomeView();
      }
    });
  };
})();


