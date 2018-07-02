frugalisApp.populateHomeView = function() {
  var el = document.getElementById('welcomeMsg');
  el.innerHTML = 'Welcome ' + frugalisApp.getUserName() + '!';
  
  el = document.getElementById('activeBudgetPeriod');
  var period = frugalisApp.getActiveBudgetPeriod();
  el.innerHTML = 'Budget period: ' + 
    frugalisApp.formatDate(period.from) + ' until ' + 
    frugalisApp.formatDate(period.until);
}
