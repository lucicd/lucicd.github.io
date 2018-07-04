frugalisApp.route = function(routeName) {

  var primaryNav = document.getElementById('primaryNav');
  if (!primaryNav.classList.contains('hide')) {
    primaryNav.classList.toggle('hide');
  }

  if (routeName === 'budgetingPeriodsTable') {
    frugalisApp.showBudgetingPeriodsTableView();
  } else if (routeName === 'accountsTable') {
    frugalisApp.showAccountsTableView();
  } else if (routeName === 'incomeTypesTable') {
    frugalisApp.showIncomeTypesTableView();
  } else {
    frugalisApp.showHomeView();
  }
}