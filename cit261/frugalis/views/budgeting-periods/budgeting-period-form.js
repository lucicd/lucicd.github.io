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
    var id = document.getElementById('id').value;
    var params = {
      startDate: startDate, 
      endDate: endDate,
      id: id,
    };
    if (id >= 0) {
      app.db.updateBudgetingPeriod(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('budgetingPeriodsTable');
        }
      });
    } else {
      app.db.createBudgetingPeriod(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('budgetingPeriodsTable');
        }
      });
    }
  }
})(frugalisApp);
