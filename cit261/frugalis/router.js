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
    } else if (routeName === 'expenseTypesTable') {
      app.showExpenseTypesTableView();
    } else if (routeName === 'expenseTypesForm') {
      app.showExpenseTypeFormView(data);
    } else if (routeName === 'actualExpensesTable') {
      app.showActualExpensesTableView();
    } else if (routeName === 'actualExpensesForm') {
      app.showActualExpenseFormView(data);
    } else if (routeName === 'actualIncomesTable') {
      app.showActualIncomesTableView();
    } else if (routeName === 'actualIncomesForm') {
      app.showActualIncomeFormView(data);
    } else if (routeName === 'plannedExpensesTable') {
      app.showPlannedExpensesTableView();
    } else if (routeName === 'plannedExpensesForm') {
      app.showPlannedExpenseFormView(data);
    } else if (routeName === 'plannedIncomesTable') {
      app.showPlannedIncomesTableView();
    } else if (routeName === 'plannedIncomesForm') {
      app.showPlannedIncomeFormView(data);
    } else {
      app.showHomeView();
    }
  }
})(frugalisApp);