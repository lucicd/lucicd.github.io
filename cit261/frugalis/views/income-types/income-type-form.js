(function(app) {
  'use strict';
  
  function populateIncomeTypeFormView(id) {
    var el = document.getElementById('id');
    el.value = id;
    if (id >= 0) {
      try {
        var incomeType = app.db.getIncomeType(id);
        el = document.getElementById('name');
        el.value = incomeType.name;
      } catch(e) {
        app.showMessage('Cannot find income type with id=' + id + '.', 'Error', 'incomeTypesTable');
        return;
      }
    } else {
      el = document.querySelector('.buttonDelete');
      el.classList.add('hidden');
    }
  }

  app.showIncomeTypeFormView = function(id) {
    var url = './views/income-types/income-type-form.html';
    app.getViewHtml(url, function(err, response) {
      var target = document.getElementById('appView');
      if (err) {
        target.innerHTML = err;
      } else {
        target.innerHTML = response;
        app.zoomIn(target);
        populateIncomeTypeFormView(id);
      }
    });
  };

  app.processIncomeTypeForm = function() {
    var name = document.getElementById('name').value;
    var id = document.getElementById('id').value;
    var params = {
      name: name, 
      id: id,
    };
    if (id >= 0) {
      app.db.updateIncomeType(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('incomeTypesTable');
        }
      });
    } else {
      app.db.createIncomeType(params, function(err, id) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('incomeTypesTable');
        }
      });
    }
  }

  app.deleteIncomeTypeForm = function() {
    var id = document.getElementById('id').value;
    var params = {
      id: id,
    };
    if (id >= 0) {
      app.db.deleteIncomeType(params, function(err) {
        if (err) {
          app.showMessage(err, 'Error');
        } else {
          app.route('incomeTypesTable');
        }
      });
    }
  }
})(frugalisApp);
