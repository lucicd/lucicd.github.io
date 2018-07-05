(function(app) {
  'use strict';
  
  function populateBudgetingPeriodFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      var period = app.db.getBudgetingPeriod(id);
      el = document.getElementById('startDate');
      el.value = app.formatISODate(period.startDate);
      el = document.getElementById('endDate');
      el.value = app.formatISODate(period.endDate);
    }
  }

  app.showBudgetingPeriodFormView = function(id) {
    var url = './views/budgeting-periods/budgeting-period-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        populateBudgetingPeriodFormView(id);
      }
    });
  };

  app.processBudgetingPeriodForm = function() {
    var startDate = new Date(document.getElementById('startDate').value);
    var endDate = new Date(document.getElementById('endDate').value);
    var id = document.getElementById('id').value;;
    if (id >= 0) {
      console.log('Changing existing budgeting period.');
      app.route('budgetingPeriodsTable');
    } else {
      app.db.createBudgetingPeriod({startDate: startDate, endDate: endDate}, function() {
        app.route('budgetingPeriodsTable');
      });
    }
  }
})(frugalisApp);
