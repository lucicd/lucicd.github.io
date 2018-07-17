(function(app) {
  'use strict';
  
  function populatePlannedExpenseFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      try {
        var plannedExpense = app.db.getPlannedExpense(id);
        el = document.getElementById('expenseType');
        el.value = plannedExpense.expenseType;
        el = document.getElementById('amount');
        el.value = plannedExpense.amount;
        el = document.getElementById('deadlineDate');
        el.value = app.formatISODate(plannedExpense.deadlineDate);
        el = document.getElementById('comments');
        el.value = plannedExpense.comments;
      } catch(e) {
        app.showMessage('Cannot find planned expense with id=' + id + '.', 'Error', 'plannedExpensesTable');
        return;
      }
    } else {
      el = document.getElementById('deadlineDate');
      el.value = app.formatISODate(new Date());
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
    app.populateExpenseTypes(document.getElementById('expenseTypes'));
  }

  app.showPlannedExpenseFormView = function(id) {
    var url = './views/planned-expenses/planned-expense-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        populatePlannedExpenseFormView(id);
      }
    });
  };

  app.processPlannedExpenseForm = function() {
    var expenseType = document.getElementById('expenseType').value;
    var amount = parseFloat(document.getElementById('amount').value);
    var deadlineDate = new Date(document.getElementById('deadlineDate').value);
    var comments = document.getElementById('comments').value;
    var id = document.getElementById('id').value;
    var params = {
      expenseType: expenseType,
      amount: amount,
      deadlineDate: deadlineDate,
      comments: comments,
      id: id,
    };
    if (id >= 0) {
      app.db.updatePlannedExpense(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('plannedExpensesTable');
        }
      });
    } else {
      app.db.createPlannedExpense(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('plannedExpensesTable');
        }
      });
    }
  }

  app.deletePlannedExpenseForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deletePlannedExpense(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('plannedExpensesTable');
        }
      });
    }
  }
})(frugalisApp);
