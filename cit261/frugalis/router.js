(function(app) {
  'use strict';
  
  app.route = function(routeName, data) {
    var primaryNav = document.getElementById('primaryNav');
    if (!primaryNav.classList.contains('hide')) {
      primaryNav.classList.toggle('hide');
    }

    // console.log(routeName);

    if (routeName === 'budgetingPeriodsTable') {
      app.showBudgetingPeriodsTableView();
    } else if (routeName === 'budgetingPeriodsForm') {
      app.showBudgetingPeriodFormView(data);
    } else if (routeName === 'accountsTable') {
      app.showAccountsTableView();
    } else if (routeName === 'accountsForm') {
      app.showAccountFormView(data);
    } else if (routeName === 'incomeTypesTable') {
      app.showIncomeTypesTableView();
    } else if (routeName === 'incomeTypesForm') {
      app.showIncomeTypeFormView(data);
    } else {
      app.showHomeView();
    }
  }
})(frugalisApp);