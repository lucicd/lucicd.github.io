(function(app) {
  'use strict';
  
  function populatePlannedIncomeFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      try {
        var plannedIncome = app.db.getPlannedIncome(id);
        el = document.getElementById('incomeType');
        el.value = plannedIncome.incomeType;
        el = document.getElementById('amount');
        el.value = plannedIncome.amount;
        el = document.getElementById('deadlineDate');
        el.value = app.formatISODate(plannedIncome.deadlineDate);
        el = document.getElementById('comments');
        el.value = plannedIncome.comments;
      } catch(e) {
        app.showMessage('Cannot find planned income with id=' + id + '.', 'Error', 'plannedIncomesTable');
        return;
      }
    } else {
      el = document.getElementById('deadlineDate');
      el.value = app.formatISODate(new Date());
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
    app.populateIncomeTypes(document.getElementById('incomeTypes'));
  }

  app.showPlannedIncomeFormView = function(id) {
    var url = './views/planned-incomes/planned-income-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        populatePlannedIncomeFormView(id);
      }
    });
  };

  app.processPlannedIncomeForm = function() {
    var incomeType = document.getElementById('incomeType').value;
    var amount = parseFloat(document.getElementById('amount').value);
    var deadlineDate = new Date(document.getElementById('deadlineDate').value);
    var comments = document.getElementById('comments').value;
    var id = document.getElementById('id').value;
    var params = {
      incomeType: incomeType,
      amount: amount,
      deadlineDate: deadlineDate,
      comments: comments,
      id: id,
    };
    if (id >= 0) {
      app.db.updatePlannedIncome(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('plannedIncomesTable');
        }
      });
    } else {
      app.db.createPlannedIncome(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('plannedIncomesTable');
        }
      });
    }
  }

  app.deletePlannedIncomeForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deletePlannedIncome(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('plannedIncomesTable');
        }
      });
    }
  }
})(frugalisApp);
