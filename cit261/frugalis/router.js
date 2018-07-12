(function(app) {
  'use strict';

  app.routeUrl = function(routeName, data) {
    var href = window.location.href;
    var stem = href.split('#')[0] || '';
    // console.log(stem);
    var newHref = stem + '#' + routeName;
    if (data != undefined) {
      newHref += '?data='+encodeURIComponent(data);
    }
    history.pushState({}, routeName, newHref);
    // console.log(newHref);
    // console.log(data);
  }
  
  app.route = function(routeName, data, url) {
    if (document.getElementById('mySideNav').style.width != '0') {
      document.getElementById('mySideNav').style.width = '0';
    }

    if (routeName) {
      app.routeUrl(routeName, data);
    }

    if (url) {
      var urlObj = new URL(url);
      // console.log(urlObj);
      var queryString = window.location.href.split('?')[1];
      if (queryString === undefined) {
        routeName = urlObj.hash.substring(1);
      } else {
        var params = queryString.split('=');
        params = params.map(function(param) {
          return decodeURIComponent(param);
        });
        data = params[1];
        routeName = window.location.href.split('?')[0].split('#')[1];
      }
    }

    // console.log('Route name is ' + routeName);

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
    } else if (routeName === 'selectActivePeriod') {
      app.showSelectActivePeriodTableView();
    } else if (routeName === 'makePeriodActive') {
      app.makePeriodActive(data);
    } else if (routeName === 'reset') {
      app.db.reset();
      app.showHomeView();
    } else {
      app.showHomeView();
    }
  }
})(frugalisApp);