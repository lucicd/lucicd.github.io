(function(app) {
  'use strict';
  
  function populateExpenseTypeFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      try {
        var expenseType = app.db.getExpenseType(id);
        el = document.getElementById('name');
        el.value = expenseType.name;
      } catch(e) {
        app.showMessage('Cannot find expense type with id=' + id + '.', 'Error', 'expenseTypesTable');
        return;
      }
    } else {
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
  }

  app.showExpenseTypeFormView = function(id) {
    var url = './views/expense-types/expense-type-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        populateExpenseTypeFormView(id);
      }
    });
  };

  app.processExpenseTypeForm = function() {
    var name = document.getElementById('name').value;
    var id = document.getElementById('id').value;
    var params = {
      name: name, 
      id: id,
    };
    if (id >= 0) {
      app.db.updateExpenseType(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('expenseTypesTable');
        }
      });
    } else {
      app.db.createExpenseType(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('expenseTypesTable');
        }
      });
    }
  }

  app.deleteExpenseTypeForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deleteExpenseType(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('expenseTypesTable');
        }
      });
    }
  }
})(frugalisApp);
