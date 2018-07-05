(function(app) {
  'use strict';
  
  app.route = function(routeName) {
    var primaryNav = document.getElementById('primaryNav');
    if (!primaryNav.classList.contains('hide')) {
      primaryNav.classList.toggle('hide');
    }

    if (routeName === 'budgetingPeriodsTable') {
      app.showBudgetingPeriodsTableView();
    } else if (routeName === 'budgetingPeriodsForm') {
      app.showBudgetingPeriodFormView();
    } else if (routeName === 'accountsTable') {
      app.showAccountsTableView();
    } else if (routeName === 'incomeTypesTable') {
      app.showIncomeTypesTableView();
    } else {
      app.showHomeView();
    }
  }
})(frugalisApp);