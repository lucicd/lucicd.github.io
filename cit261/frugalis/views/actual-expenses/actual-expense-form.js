(function(app) {
  'use strict';
  
  function populateActualExpenseFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      var actualExpense = app.db.getActualExpense(id);
      el = document.getElementById('expenseType');
      el.value = actualExpense.expenseType;
      el = document.getElementById('account');
      el.value = actualExpense.account;
      el = document.getElementById('amount');
      el.value = actualExpense.amount;
      el = document.getElementById('date');
      el.value = app.formatISODate(actualExpense.date);
      el = document.getElementById('comments');
      el.value = actualExpense.comments;
    } else {
      el = document.getElementById('date');
      el.value = app.formatISODate(new Date());
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
    app.populateExpenseTypes(document.getElementById('expenseTypes'));
    app.populateAccounts(document.getElementById('accounts'));
  }

  app.showActualExpenseFormView = function(id) {
    var url = './views/actual-expenses/actual-expense-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        populateActualExpenseFormView(id);
      }
    });
  };

  app.processActualExpenseForm = function() {
    var expenseType = document.getElementById('expenseType').value;
    var account = document.getElementById('account').value;
    var amount = parseFloat(document.getElementById('amount').value);
    var date = new Date(document.getElementById('date').value);
    var comments = document.getElementById('comments').value;
    var id = document.getElementById('id').value;
    var params = {
      expenseType: expenseType,
      account: account,
      amount: amount,
      date: date,
      comments: comments,
      id: id,
    };
    if (id >= 0) {
      app.db.updateActualExpense(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('actualExpensesTable');
        }
      });
    } else {
      app.db.createActualExpense(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('actualExpensesTable');
        }
      });
    }
  }

  app.deleteActualExpenseForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deleteActualExpense(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('actualExpensesTable');
        }
      });
    }
  }
})(frugalisApp);
