(function(app) {
  'use strict';
  
  function populateActualIncomeFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      var actualIncome = app.db.getActualIncome(id);
      el = document.getElementById('incomeType');
      el.value = actualIncome.incomeType;
      el = document.getElementById('account');
      el.value = actualIncome.account;
      el = document.getElementById('amount');
      el.value = actualIncome.amount;
      el = document.getElementById('date');
      el.value = app.formatISODate(actualIncome.date);
      el = document.getElementById('comments');
      el.value = actualIncome.comments;
    } else {
      el = document.getElementById('date');
      el.value = app.formatISODate(new Date());
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
    app.populateIncomeTypes(document.getElementById('incomeTypes'));
    app.populateAccounts(document.getElementById('accounts'));
  }

  app.showActualIncomeFormView = function(id) {
    var url = './views/actual-incomes/actual-income-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        populateActualIncomeFormView(id);
      }
    });
  };

  app.processActualIncomeForm = function() {
    var incomeType = document.getElementById('incomeType').value;
    var account = document.getElementById('account').value;
    var amount = parseFloat(document.getElementById('amount').value);
    var date = new Date(document.getElementById('date').value);
    var comments = document.getElementById('comments').value;
    var id = document.getElementById('id').value;
    var params = {
      incomeType: incomeType,
      account: account,
      amount: amount,
      date: date,
      comments: comments,
      id: id,
    };
    if (id >= 0) {
      app.db.updateActualIncome(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('actualIncomesTable');
        }
      });
    } else {
      app.db.createActualIncome(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('actualIncomesTable');
        }
      });
    }
  }

  app.deleteActualIncomeForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deleteActualIncome(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('actualIncomesTable');
        }
      });
    }
  }
})(frugalisApp);
